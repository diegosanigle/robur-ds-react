// Genera figma/code-connect/<Componente>.figma.js: un fichero de Code Connect por componente de Figma.
// Lee el contrato (qué props hay y cómo se traducen a Figma) y figma/library.json (el nodo de cada
// componente). Los ficheros son generados: no se editan a mano.
// Uso: node scripts/build-code-connect.mjs
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { root } from './lib/tokens.mjs'

const library = JSON.parse(readFileSync(join(root, 'figma', 'library.json'), 'utf8'))
const out = join(root, 'figma', 'code-connect')
const PACKAGE = 'robur-ds'

/** Un objeto de JS con un valor de código por cada valor de Figma: { primary: 'primary' }. */
const map = (values, cast = (v) => `'${v}'`) => `{ ${values.map((v) => `'${v}': ${cast(v)}`).join(', ')} }`

function template(name, figma) {
  const contract = JSON.parse(readFileSync(join(root, 'src', 'components', name, `${name}.contract.json`), 'utf8'))
  const rules = contract.figma?.props ?? {}
  const reads = [] // líneas que leen la instancia de Figma
  const attrs = [] // trozos del snippet, en el orden de las props del contrato
  let inner = '' // el contenido entre la etiqueta de apertura y la de cierre
  const inners = {} // instancias interiores, leídas una sola vez

  for (const prop of contract.props) {
    const rule = rules[prop.name]
    const id = prop.name
    if (rule?.omit) {
      // No existe en Figma. Si es obligatoria, el snippet la deja como hueco para quien lo copia.
      if (prop.required && prop.name !== 'children') attrs.push(`' ${id}={${id}}'`)
      continue
    }
    if (prop.name === 'children') {
      if (rule === 'TEXT') {
        reads.push(`const children = instance.getString('children')`)
        inner = '${children}'
      } else if (rule === 'SLOT') {
        reads.push(`const children = instance.getSlot('children')`)
        inner = '\n  ${children}\n'
      }
      continue
    }
    if (rule?.via) {
      const [component, innerProp] = rule.via.split('.')
      const handle = component.toLowerCase()
      if (!inners[handle]) {
        inners[handle] = true
        reads.push(`const ${handle} = instance.findInstance('${component}')`)
      }
      reads.push(`const ${id} = ${handle}.getString('${innerProp}')`)
    } else if (rule?.values) {
      // En Figma es una variante con otros valores: un número en código (sessions) o una función presente o no (onSelect).
      reads.push(`const ${id} = instance.getEnum('${id}', ${map(rule.values, (v) => v)})`)
    } else if (prop.type === 'enum') {
      reads.push(`const ${id} = instance.getEnum('${id}', ${map(prop.values)})`)
    } else if (prop.type === 'boolean') {
      reads.push(`const ${id} = instance.getEnum('${id}', ${map(['false', 'true'], (v) => v)})`)
    } else if (prop.type === 'string') {
      reads.push(`const ${id} = instance.getString('${id}')`)
    } else continue

    // Cómo aparece la prop en el snippet: se omite cuando vale lo que vale por defecto.
    if (prop.type === 'number') attrs.push(`' ${id}={' + ${id} + '}'`)
    else if (prop.type === 'function') attrs.push(`(${id} ? ' ${id}={${id}}' : '')`)
    else if (prop.type === 'boolean' && prop.required) attrs.push(`' ${id}={' + ${id} + '}'`)
    else if (prop.type === 'boolean') attrs.push(`(${id} ? ' ${id}' : '')`)
    else if (prop.type === 'enum' && prop.default !== undefined) attrs.push(`(${id} !== '${prop.default}' ? ' ${id}="' + ${id} + '"' : '')`)
    else if (prop.required) attrs.push(`' ${id}="' + ${id} + '"'`)
    else attrs.push(`(${id} ? ' ${id}="' + ${id} + '"' : '')`)
  }

  // Lo que solo existe en Figma: el estado dibujado y atributos nativos como placeholder.
  for (const extra of contract.figma?.extra ?? []) {
    if (extra.name === 'state') {
      reads.push(`const state = instance.getEnum('state', ${map(extra.values)})`)
      for (const native of ['checked', 'disabled'].filter((v) => extra.values.includes(v))) {
        attrs.push(`(state === '${native}' ? ' ${native}' : '')`)
      }
    } else if (extra.type === 'TEXT') {
      reads.push(`const ${extra.name} = instance.getString('${extra.name}')`)
      attrs.push(`(${extra.name} ? ' ${extra.name}="' + ${extra.name} + '"' : '')`)
    }
  }

  const url = `${library.fileUrl}?node-id=${figma.id.replace(':', '-')}`
  const open = attrs.length ? `<${name}\${${attrs.join(' + ')}}` : `<${name}`
  const example = inner ? `${open}>${inner}</${name}>` : `${open} />`
  return `// url=${url}
// source=src/components/${name}/${name}.tsx
// component=${name}
// Generado por scripts/build-code-connect.mjs desde el contrato y figma/library.json. No se edita a mano.
import figma from 'figma'
${reads.length ? `\nconst instance = figma.selectedInstance\n${reads.join('\n')}\n` : ''}
export default {
  example: figma.code\`${example}\`,
  imports: ['import { ${name} } from "${PACKAGE}"'],
  id: '${name}',
  metadata: { nestable: true },
}
`
}

rmSync(out, { recursive: true, force: true })
mkdirSync(out, { recursive: true })
const names = Object.keys(library.components).sort()
for (const name of names) writeFileSync(join(out, `${name}.figma.js`), template(name, library.components[name]))
console.log(`Code Connect: ${names.length} ficheros en figma/code-connect/.`)
