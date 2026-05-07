# 🤖 Tutor IA de Francés - Configuración

## ¿Qué se implementó?

Se agregó un **panel dedicado "Tutor IA"** en la aplicación Le Français v3.0 que:

✅ Aparece en el sidebar del alumno (después de "Mi progreso")  
✅ Permite chat interactivo con el tutor  
✅ Implementa las 5 reglas del tutor de francés  
✅ **Integrado con Google Gemini API**  
✅ Funciona con respuestas mock mientras configuras la API  

---

## 📋 Reglas Implementadas del Tutor

### 1. **Personalidad y Estilo**
- Amable, paciente y motivador
- 70% francés + 30% español (con traducciones)
- Se adapta al nivel del alumno

### 2. **Corrección de Errores**
- Sección "💡 Le Petit Conseil" al inicio
- Correcciones amables con explicaciones
- Educativo pero sin ser condescendiente

### 3. **Pronunciación**
- Fonética visual entre corchetes: `[Bon-zhur]`
- Explicación de reglas (vocales nasales, "e" muda, etc.)
- Ejemplos de uso

### 4. **Traducción Inteligente**
- No solo la palabra, sino contexto
- Ejemplo de uso en oraciones
- Indicación si es formal o informal

### 5. **Estructura de Respuesta**
```
1. Corrección (si hay error)
2. Respuesta en francés (+ traducción)
3. Dato Cultural o Tip
4. Pregunta para seguir practicando
```

---

## 🔧 Configurar Google Gemini (Listo para usar)

### Opción A: Sin API (Recomendado para empezar)
El tutor funciona con respuestas predefinidas inteligentes. **No requiere configuración.**

### Opción B: Con Google Gemini API (Recomendado para producción)

#### Paso 1: Obtener API Key
1. Ve a https://ai.google.dev/
2. Haz clic en "Get API Key"
3. Crea una nueva API Key (es gratis)
4. Cópiala

#### Paso 2: Configurar en el código
En `frontend/js/tutor-ia.js`, línea ~13:

```javascript
const TUTOR_CONFIG = {
  GEMINI_API_KEY: 'AIzaSy...', // ← Pega tu clave aquí
  GEMINI_MODEL: 'gemini-1.5-pro',
  SYSTEM_PROMPT: `...`
};
```

#### Paso 3: Prueba
1. Abre la app en http://localhost
2. Inicia sesión como alumno
3. Ve al panel "Tutor IA" (en el sidebar)
4. Escribe un mensaje
5. ¡Debería funcionar! 🎉

---

### ✨ Ventajas de Gemini vs OpenAI:
| Característica | Gemini | OpenAI |
|---|---|---|
| **Precio** | 💰 Gratis en tier básico | 💸 Pago desde el inicio |
| **Latencia** | ⚡ Muy rápido | ⚡ Rápido |
| **Calidad** | 🎯 Excelente para educación | 🎯 Muy buena |
| **Límites** | 📊 Generoso | 📊 Generoso |
| **Soporte multilíngüe** | ✅ Excelente | ✅ Muy bueno |

---

## 📁 Archivos Agregados/Modificados

### Nuevos:
- **`frontend/js/tutor-ia.js`** - Lógica completa del tutor IA

### Modificados:
- **`frontend/html/index.html`** - Panel del tutor + script incluido
- **`frontend/css/style.css`** - Estilos del chat
- **`frontend/js/script.js`** - Integración en `showPanel()`

---

## 💬 Cómo Usar

### Como Alumno:
1. Haz clic en "Tutor IA" en el sidebar
2. Escribe tu pregunta o texto para corregir
3. El tutor responde con:
   - Correcciones si hay errores
   - Pronunciación (con fonética)
   - Explicaciones en francés + español
   - Tips culturales
   - Una pregunta para practicar

### Ejemplos de preguntas:
```
"¿Cómo se pronuncia château?"
"Corrígeme: Je va à la école"
"¿Cuál es la diferencia entre 'tu' y 'vous'?"
"Dame un tip sobre la pronunciación francesa"
"Explica el passé composé"
```

---

## 🧠 Sistema de Mock Responses

El archivo `tutor-ia.js` incluye respuestas inteligentes predefinidas para:

- Errores comunes (Je va → Je vais)
- Pronunciación (Bonjour, Château, etc.)
- Saludos y cortesía
- Respuestas generales

Estas se usan automáticamente si no tienes OpenAI configurado.

---

## 🔌 Cambiar a otra API (OpenAI, Claudia, etc.)

Si quieres usar **OpenAI** en lugar de Gemini:

### Para OpenAI:
```javascript
// Reemplaza en tutor-ia.js:
const TUTOR_CONFIG = {
  OPENAI_API_KEY: 'sk-...',
  OPENAI_MODEL: 'gpt-4-turbo',
  SYSTEM_PROMPT: `...`
};

// Y reemplaza la función callTutorAPI():
async function callTutorAPI(userMessage) {
  if (TUTOR_CONFIG.OPENAI_API_KEY) {
    return await callOpenAIAPI(userMessage);  // Usar OpenAI
  }
  return generateMockTutorResponse(userMessage);
}
```

### Para Backend REST propio:
Modifica la función `callTutorAPI()` en `tutor-ia.js`:

```javascript
async function callTutorAPI(userMessage) {
  const response = await fetch('/api/tutor/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: userMessage,
      history: TUTOR_STATE.conversationHistory
    })
  });
  
  const data = await response.json();
  return data.response;
}
```

---

## 🎨 Personalizaciones Disponibles

### Cambiar System Prompt
En `tutor-ia.js`, línea ~25:
```javascript
SYSTEM_PROMPT: `Tu propio prompt aquí...`
```

### Cambiar el avatar del tutor
En `tutor-ia.js`, función `addTutorMessage()`:
```javascript
const avatar = sender === 'bot' ? '👨‍🏫' : '👤'; // Cambia el emoji
```

### Agregar más respuestas mock
En función `generateMockTutorResponse()`, agrega más `if` statements:
```javascript
if (msg.includes('palabra clave')) {
  return `Tu respuesta aquí...`;
}
```

---

## ✨ Características Futuras

- [ ] Exportar historial de chat
- [ ] Guardar conversaciones favoritas
- [ ] Análisis de progreso (qué errores repites)
- [ ] Recomendaciones personalizadas
- [ ] Voice input/output (pronunciación)
- [ ] Contextualización automática de ejercicios

---

## 📞 Soporte

¿Problemas? Revisa:
1. Consola del navegador (F12) para errores
2. Que la API key de Gemini sea válida
3. Que tengas cuota disponible en Google AI Studio
4. Que los archivos estén en la ruta correcta
5. En caso de error CORS, consulta https://ai.google.dev/gemini-api/docs

---

## 📝 Notes

- El chat se borra al cerrar sesión (localStorage no está habilitado)
- Máximo 500 tokens por respuesta de Gemini
- Sistema de prompts basado en mejores prácticas de educación
- Compatible con todos los niveles de francés (A1-B2)
- **Gemini es más económico y rápido que OpenAI para este caso de uso**

¡Feliz aprendizaje! 🇫🇷 🚀
