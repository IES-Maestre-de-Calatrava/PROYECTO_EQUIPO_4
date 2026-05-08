/* ═══════════════════════════════════════════════════════════════
   TUTOR IA — Système d'Apprentissage Interactif du Français
   
   Funcionalidades:
   ✓ Corrección de errores (Le Petit Conseil)
   ✓ Pronunciación con fonética visual
   ✓ Tips culturales
   ✓ Preguntas de seguimiento
   ✓ Integrado con Claude API
═══════════════════════════════════════════════════════════════ */

const TUTOR_CONFIG = {
  CLAUDE_API_KEY: '', // Pega aqui tu API key de Claude. Dejalo vacio para usar respuestas mock (funciona sin API)
  CLAUDE_MODEL: 'claude-sonnet-4-5',
  CLAUDE_API_VERSION: '2023-06-01',
  MAX_TOKENS: 700,
  SYSTEM_PROMPT: `Eres Claudia, un tutor de francés amable, paciente y motivador. Debes seguir estas reglas SIEMPRE:

1. IDIOMA: Habla 70% en francés y 30% en español (con traducciones entre paréntesis). Adapta según el nivel del alumno.

2. CORRECCIÓN DE ERRORES: Si el usuario comete un error, corrígelo al inicio de tu respuesta con una sección "💡 Le Petit Conseil". Sé amable y explica por qué.

3. PRONUNCIACIÓN: Escribe la pronunciación figurada entre corchetes [así]. Explica reglas como las vocales nasales o la "e" muda.

4. TRADUCCIÓN INTELIGENTE: No solo des la palabra, sino un ejemplo de uso y si es formal o informal.

5. ESTRUCTURA DE RESPUESTA:
   • Corrección: Si hay error
   • Respuesta: En francés (con traducción si es complejo)
   • Dato Cultural o Tip: Algo breve sobre Francia
   • Pregunta: Termina con una pregunta en francés para continuar practicando

6. EMOJIS: Usa emojis para hacer la experiencia más amigable.

Responde siempre en un tono motivador y amable. ¡Eres un tutor extraordinario!`
};

let TUTOR_STATE = {
  conversationHistory: [],
  lastUserMessage: '',
  currentExercise: null,
};

/* ─────────────────────────────────
   FUNCIÓN PRINCIPAL: Enviar mensaje
───────────────────────────────────── */
async function sendTutorMessage() {
  const input = document.getElementById('tutor-message-input');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Agregar mensaje del usuario al chat
  addTutorMessage(message, 'user');
  input.value = '';
  
  // Actualizar estado
  TUTOR_STATE.lastUserMessage = message;
  TUTOR_STATE.conversationHistory.push({
    role: 'user',
    content: message
  });
  
  // Mostrar indicador de escritura
  showTutorLoading();
  
  try {
    // Llamar a la API del tutor (Claude o fallback)
    const response = await callTutorAPI(message);
    
    // Remover indicador de escritura
    removeTutorLoading();
    
    // Agregar respuesta del tutor
    addTutorMessage(response, 'bot');
    
    // Guardar en historial
    TUTOR_STATE.conversationHistory.push({
      role: 'assistant',
      content: response
    });
    
  } catch (error) {
    removeTutorLoading();
    addTutorMessage('Disculpa, hubo un error conectando con el tutor. Intenta de nuevo.', 'bot');
    console.error('Error en Tutor IA:', error);
  }
  
  // Scroll al final del chat
  scrollTutorChatToBottom();
}

/* ─────────────────────────────────
   API CALL: Conectar con Claude API
───────────────────────────────────── */
async function callTutorAPI(userMessage) {
  // SI TIENES CLAUDE_API_KEY configurada, usa esto:
  if (TUTOR_CONFIG.CLAUDE_API_KEY) {
    return await callClaudeAPI();
  }
  
  // FALLBACK: Respuestas inteligentes mock (SIN API)
  return generateMockTutorResponse(userMessage);
}

async function callClaudeAPI() {
  const messages = TUTOR_STATE.conversationHistory.slice(-12).map(msg => ({
    role: msg.role === 'assistant' ? 'assistant' : 'user',
    content: String(msg.content)
  }));

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': TUTOR_CONFIG.CLAUDE_API_KEY,
      'anthropic-version': TUTOR_CONFIG.CLAUDE_API_VERSION
    },
    body: JSON.stringify({
      model: TUTOR_CONFIG.CLAUDE_MODEL,
      max_tokens: TUTOR_CONFIG.MAX_TOKENS,
      system: TUTOR_CONFIG.SYSTEM_PROMPT,
      messages
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Claude API error: ${error.error?.message || response.statusText}`);
  }
  
  const data = await response.json();
  
  if (Array.isArray(data.content)) {
    const text = data.content
      .filter(block => block.type === 'text' && block.text)
      .map(block => block.text)
      .join('\n')
      .trim();

    if (text) return text;
  }
  
  throw new Error('Respuesta inesperada de Claude API');
}

/* ─────────────────────────────────
   MOCK: Respuestas sin API
───────────────────────────────────── */
function generateMockTutorResponse(userMessage) {
  const msg = userMessage.toLowerCase();
  
  // Detección de errores comunes
  if (msg.includes('je va') && msg.includes('école')) {
    return `💡 **Le Petit Conseil**
Dijiste: "Je va à la école"
Lo correcto es: "Je **vais** à l'**école**"

Explicación:
• "Aller" (ir) conjugado en presente: je **vais** [shu vé]
• Se usa "l'école" (no "la école") porque "école" comienza con vocal.
• La regla: el + vocal = l' (contracción)

Respuesta:
Muy bien por intentarlo! 👏 C'est un erreur très commune! [Sé un erreur très commune - Es un error muy común]

**Dato Cultural:**
En Francia, los niños van a la école maternelle (preescolar) a los 3 años, ¡muy temprano!

**Pregunta para ti:**
¿Y tú, à quel âge tu es allé(e) à l'école? [¿Y tú, a qué edad fuiste a la escuela?]`;
  }
  
  if (msg.includes('pronuncia') || msg.includes('pronunciation') || msg.includes('cómo se') && msg.includes('onjour')) {
    return `**Bonjour** [Bon-zhur] 👋

Desglose:
• **Bon-** [bon] = bueno (como en "bonito")
• **-jour** [zhur] = día (suena como "zhur", la "r" francesa es suave)

Truco: La "r" francesa se pronuncia desde la garganta, no como la "r" española.

Ejemplo de uso:
• Formal: "Bonjour Madame" [Bon-zhur Madame]
• Informal: "Salut!" [Sa-lü] (entre amigos)

**Tip Cultural:**
Los franceses saludan con "Bonjour" o "Bonsoir" (buenas tardes), ¡incluso a desconocidos en la tienda! Es de buena educación.

**Pregunta:**
¿Cuál es la diferencia entre "Bonjour" y "Bonsoir"? 🤔`;
  }
  
  if (msg.includes('hola') || msg.includes('salud') || msg.includes('hi ')) {
    return `Bonjour! Salut! 👋

Me alegra verte aquí. Estoy listo para:
• Corregir tus errores de forma amable
• Enseñarte pronunciación con [fonética visual]
• Explicar reglas gramaticales
• Contarte datos sobre la cultura francesa
• Ayudarte con los ejercicios

**¿Qué necesitas hoy?**
Puedes:
1. Preguntarme sobre una palabra o frase
2. Pedirme que corrija algo en francés
3. Preguntar sobre pronunciación
4. Pedir un tip de gramática
5. Contar sobre tu ejercicio

Por ejemplo: "Corrígeme: Je suis un estudiante" o "¿Cómo se pronuncia château?"`;
  }
  
  if (msg.includes('merci') || msg.includes('gracias') || msg.includes('thanks')) {
    return `¡De nada! 😊

Recuerda que en francés:
• **Merci** [mèr-sí] = Gracias
• **Merci beaucoup** [mèr-sí bó-kú] = Muchas gracias (formal)
• **Merci bien** = Gracias mucho (entre amigos)

**Respuesta en francés:**
De rien! [Duh rien] = ¡De nada!

Ou:

Avec plaisir! [A-vèk plé-zír] = ¡Con placer!

**Tip Cultural:**
Los franceses aprecian mucho cuando dices "Bonjour" y "Merci". Es considerado muy educado.

**Pregunta:**
¿Ya conoces otras frases de cortesía? 🤔`;
  }
  
  // Respuesta por defecto
  return `Très bien! [Très bien = Muy bien] 👏

Gracias por tu pregunta o comentario. 

En el futuro, esta respuesta vendrá de un modelo de IA real (Claude), pero por ahora estamos usando respuestas pre-configuradas.

Para conectar con Claude:
1. Obtén tu clave API en https://console.anthropic.com/
2. Configura TUTOR_CONFIG.CLAUDE_API_KEY en este archivo
3. ¡El tutor IA real estará listo!

**Pregunta:**
¿Hay algo específico en francés que quieras practicar? 🎓`;
}

/* ─────────────────────────────────
   UI HELPERS
───────────────────────────────────── */
function addTutorMessage(text, sender) {
  const chatBox = document.getElementById('tutor-chat-box');
  const msgDiv = document.createElement('div');
  msgDiv.className = `tutor-message tutor-message-${sender}`;
  
  const avatar = sender === 'bot' ? '🤖' : '👤';
  
  msgDiv.innerHTML = `
    <div class="tutor-msg-avatar">${avatar}</div>
    <div class="tutor-msg-content">${parseMarkdown(text)}</div>
  `;
  
  chatBox.appendChild(msgDiv);
}

function showTutorLoading() {
  const chatBox = document.getElementById('tutor-chat-box');
  const loadDiv = document.createElement('div');
  loadDiv.id = 'tutor-loading';
  loadDiv.className = 'tutor-message tutor-message-bot';
  loadDiv.innerHTML = `
    <div class="tutor-msg-avatar">🤖</div>
    <div class="tutor-msg-content tutor-loading">
      <span></span><span></span><span></span>
    </div>
  `;
  chatBox.appendChild(loadDiv);
}

function removeTutorLoading() {
  const loading = document.getElementById('tutor-loading');
  if (loading) loading.remove();
}

function scrollTutorChatToBottom() {
  const chatBox = document.getElementById('tutor-chat-box');
  setTimeout(() => {
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 100);
}

function parseMarkdown(text) {
  // Asegurar que el texto sea una cadena válida
  if (text === null || text === undefined) {
    return '';
  }
  if (typeof text !== 'string') {
    if (typeof text === 'object' && text.content !== undefined) {
      text = String(text.content);
    } else {
      text = String(text);
    }
  }

  // Convertir markdown simple a HTML
  text = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
  
  // Crear secciones para reglas especiales
  if (text.includes('Le Petit Conseil')) {
    text = text.replace(
      /💡 \*\*Le Petit Conseil\*\*(.*?)(?=<br><br>|$)/s,
      '<div class="tutor-msg-correction"><strong>💡 Le Petit Conseil</strong>$1</div>'
    );
  }
  
  if (text.includes('[') && text.includes(']')) {
    text = text.replace(
      /\[(.*?)\]/g,
      '<span style="background:var(--gold-light);padding:0.1rem 0.3rem;border-radius:3px;font-family:monospace;">[$1]</span>'
    );
  }
  
  return text;
}

/* ─────────────────────────────────
   INTEGRACIÓN CON CONTEXTO DEL EJERCICIO
───────────────────────────────────── */
function setTutorExerciseContext(activityId, exerciseIndex, exercise) {
  TUTOR_STATE.currentExercise = {
    activityId,
    exerciseIndex,
    exercise,
    type: exercise.type,
    question: exercise.question
  };
  
  // Opcional: mostrar un hint para pedir ayuda
  console.log('Contexto del ejercicio establecido para el tutor:', TUTOR_STATE.currentExercise);
}

function getTutorHintForCurrentExercise() {
  if (!TUTOR_STATE.currentExercise) return 'No hay contexto de ejercicio.';
  
  const ex = TUTOR_STATE.currentExercise.exercise;
  
  let hint = `Estás en el ejercicio: "${ex.question}"\n`;
  hint += `Tipo: ${ex.type === 'test' ? 'Opción múltiple' : ex.type === 'fill' ? 'Rellena el espacio' : ex.type === 'match' ? 'Emparejar' : 'Imagen'}\n`;
  
  if (ex.hint) hint += `Pista: ${ex.hint}`;
  
  return hint;
}
