# Tutor IA de Frances - Configuracion con Claude

## Que se implemento

El panel "Tutor IA" permite chatear con Lumi, un tutor de frances que:

- Corrige errores de forma amable.
- Explica pronunciacion con fonetica visual.
- Da tips culturales.
- Responde siguiendo el prompt educativo del proyecto.
- Usa Claude si configuras una API key.
- Usa respuestas mock si no hay API key configurada.

## Configurar Claude

### Opcion A: Sin API

No necesitas hacer nada. Si `CLAUDE_API_KEY` esta vacia, el tutor usa respuestas predefinidas.

### Opcion B: Con Claude API

1. Crea una API key en https://console.anthropic.com/
2. Abre `frontend/js/tutor/tutor-ia.js`.
3. Configura la clave en `TUTOR_CONFIG`:

```javascript
const TUTOR_CONFIG = {
  CLAUDE_API_KEY: 'sk-ant-...',
  CLAUDE_MODEL: 'claude-sonnet-4-5',
  CLAUDE_API_VERSION: '2023-06-01',
  MAX_TOKENS: 700,
  SYSTEM_PROMPT: `...`
};
```

4. Abre la app, entra como alumno y ve a "Tutor IA".

## Importante sobre seguridad

Este proyecto llama a Claude desde el frontend. Eso funciona para pruebas locales, pero no es seguro para produccion porque cualquier usuario puede ver la API key en el navegador.

Para produccion, lo recomendable es crear un endpoint backend, por ejemplo `/api/tutor/chat`, guardar la clave en una variable de entorno del servidor y hacer que el frontend llame a ese backend.

## Como funciona la llamada

El archivo `frontend/js/tutor/tutor-ia.js` usa la API Messages de Anthropic:

- Endpoint: `https://api.anthropic.com/v1/messages`
- Header `x-api-key`: tu clave de Claude.
- Header `anthropic-version`: `2023-06-01`.
- Body con `model`, `max_tokens`, `system` y `messages`.

La respuesta de Claude se lee desde `data.content[]`, juntando los bloques de tipo `text`.

## Respuestas mock

Las respuestas mock se usan automaticamente cuando `CLAUDE_API_KEY` esta vacia. Sirven para probar el chat sin gastar tokens ni depender de conexion externa.

Puedes agregar mas casos en la funcion `generateMockTutorResponse()` dentro de `frontend/js/tutor/tutor-ia.js`.

## Troubleshooting

- Revisa la consola del navegador con F12.
- Comprueba que `CLAUDE_API_KEY` no este vacia.
- Comprueba que la clave sea valida y tenga cuota.
- Si aparece un error de CORS o de seguridad en navegador, mueve la llamada a un backend.
- Si Claude responde pero no aparece texto, revisa el formato de `data.content` en consola.

