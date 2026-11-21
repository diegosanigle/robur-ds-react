# Robur DS

Design System agéntico de Robur.

```bash
npm install
npm run storybook
```

Storybook: https://diegosanigle.github.io/robur-ds-react/
Documentación: https://diegosanigle.github.io/robur-ds-react/docs/
Figma: https://www.figma.com/design/lTMwgNScwy7MEq8CaafRGC

Estado: tokens en dos temas, 11 componentes y 3 patrones con contrato, reglas y skills
para agentes, documentación generada, y comprobaciones de
contraste, contratos, paridad con Figma y accesibilidad en `npm test`.

## Usar el sistema desde otro proyecto

Añade el MCP a la configuración de tu agente (en Claude Code, un fichero `.mcp.json` en la raíz del proyecto):

```json
{
  "mcpServers": {
    "robur-ds": { "command": "npx", "args": ["-y", "github:diegosanigle/robur-ds-react"] }
  }
}
```

El agente tendrá cinco herramientas: `get_catalog`, `get_component`, `get_tokens`, `get_text_on` y `validate_code`.

## Usar el sistema por URL

El mismo MCP está publicado en Vercel, sin instalar nada: `https://robur-ds-react.vercel.app/mcp`.

En Claude Code:

```bash
claude mcp add --transport http robur-ds https://robur-ds-react.vercel.app/mcp
```

O en `.mcp.json`:

```json
{
  "mcpServers": {
    "robur-ds": { "type": "http", "url": "https://robur-ds-react.vercel.app/mcp" }
  }
}
```

Es público y tiene un límite de peticiones por IP. La función está en `api/mcp.mjs`: si el proyecto de Vercel tiene la variable `MCP_TOKEN`, exige la cabecera `Authorization: Bearer <token>`. `npm run mcp:remote` comprueba las dos formas sin desplegar.
