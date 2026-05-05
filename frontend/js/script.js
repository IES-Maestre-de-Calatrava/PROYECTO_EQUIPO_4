/* =========================================================
   ██████╗  █████╗ ████████╗ █████╗
   ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗
   ██║  ██║███████║   ██║   ███████║
   ██║  ██║██╔══██║   ██║   ██╔══██║
   ██████╔╝██║  ██║   ██║   ██║  ██║
   ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
   Le Français v2.0 — app.js (inline)
========================================================= */

/* ─────────────────────────────────────────────
   DATA STRUCTURES
───────────────────────────────────────────── */
const LEVELS = [
  { id:'basico',     label:'Básico',     min:0,    max:2000,    icon:'🔵', class:'',          desc:'Empezando tu aventura en francés' },
  { id:'intermedio', label:'Intermedio', min:2000, max:8000,    icon:'🟢', class:'intermedio', desc:'Construyendo bases sólidas' },
  { id:'avanzado',   label:'Avanzado',   min:8000, max:Infinity,icon:'🏆', class:'avanzado',   desc:'¡Maestro del francés!' },
];

const MOTIVATIONAL_MSGS = [
  { icon:'🎯', msg:'¡Vas genial! Sigue así 🔥' },
  { icon:'💪', msg:'Cada ejercicio te acerca a la fluidez' },
  { icon:'🌟', msg:'¡Increíble progreso! No pares ahora' },
  { icon:'🚀', msg:'¡Nivel desbloqueado... casi ahí! 👀' },
  { icon:'🎉', msg:'¡Eres una máquina del francés!' },
  { icon:'⚡', msg:'¡Racha perfecta! Mantén el ritmo' },
];

/* USERS */
const MOCK_USERS = [
  { email:'alumno@test.com',   password:'1234', name:'Alumno Demo',   role:'alumno' },
  { email:'profesor@test.com', password:'1234', name:'Profesor Demo', role:'profesor' },
];

/* STUDENTS (for teacher view) */
const MOCK_STUDENTS = [
  { name:'Ana García',      initials:'AG', color:'#0055A4', points:3400, level:'intermedio', exercises:28, lastSeen:'Hace 2h',   time:'4h 30m', course:'A2' },
  { name:'Carlos López',    initials:'CL', color:'#059669', points:890,  level:'basico',     exercises:12, lastSeen:'Hace 1 día', time:'1h 15m', course:'A1' },
  { name:'Marta Ruiz',      initials:'MR', color:'#d97706', points:9200, level:'avanzado',   exercises:76, lastSeen:'Hace 30min', time:'12h',    course:'B1' },
  { name:'Luis Fernández',  initials:'LF', color:'#7c3aed', points:1750, level:'basico',     exercises:19, lastSeen:'Hace 3 días',time:'2h 45m', course:'A1' },
  { name:'Sofía Jiménez',   initials:'SJ', color:'#EF4135', points:5100, level:'intermedio', exercises:41, lastSeen:'Ayer',       time:'7h 20m', course:'A2' },
];

/* COURSES — mutable so teacher can create */
let COURSES = [
  {
    id:'a1', title:'Francés A1 Básico', level:'A1', badge:'badge-a1',
    desc:'Vocabulario esencial, saludos y presentaciones',
    activities: [
      {
        id:'a1-act1', title:'Saludos y presentaciones', icon:'bi-hand-wave-fill',
        subtitle:'Aprende a saludar y presentarte en francés', deadline:'', maxTime:0,
        exercises: [
          { type:'test', question:'¿Cómo se dice "Buenos días" en francés?', options:['Bonjour','Bonsoir','Bonne nuit','Au revoir'], correct:0 },
          { type:'fill', question:'Completa: Je m\'appelle _____ (Yo me llamo María)', hint:'prénom féminin', correct:'Maria' },
          { type:'test', question:'¿Qué significa "Comment t\'appelles-tu ?"', options:['¿Cómo estás?','¿Cuántos años tienes?','¿Cómo te llamas?','¿De dónde eres?'], correct:2 },
          { type:'fill', question:'Traduce al francés: "Encantado de conocerte" → _____ de te rencontrer', hint:'', correct:'Enchanté' },
        ]
      },
      {
        id:'a1-act2', title:'Los números del 1 al 20', icon:'bi-123',
        subtitle:'Domina los primeros números en francés', deadline:'', maxTime:0,
        exercises: [
          { type:'test', question:'¿Cómo se dice "5" en francés?', options:['Quatre','Cinq','Six','Sept'], correct:1 },
          { type:'fill', question:'Escribe en francés el número 12: _____', hint:'', correct:'Douze' },
          { type:'test', question:'¿Cuánto es "dix + sept" en español?', options:['15','16','17','18'], correct:2 },
        ]
      },
      {
        id:'a1-act3', title:'Los colores', icon:'bi-palette-fill',
        subtitle:'Aprende los colores básicos en francés', deadline:'', maxTime:0,
        exercises: [
          { type:'test', question:'¿Cómo se dice "rojo" en francés?', options:['Bleu','Vert','Rouge','Jaune'], correct:2 },
          { type:'fill', question:'Traduce "azul" al francés: _____', hint:'couleur du ciel', correct:'Bleu' },
          { type:'test', question:'"Le chat est _____ (negro)" — ¿qué palabra falta?', options:['Blanc','Noir','Gris','Marron'], correct:1 },
        ]
      },
    ]
  },
  {
    id:'a2', title:'Francés A2 Elemental', level:'A2', badge:'badge-a2',
    desc:'Conversación básica, verbos y rutinas diarias',
    activities: [
      {
        id:'a2-act1', title:'Verbos esenciales: être y avoir', icon:'bi-lightning-fill',
        subtitle:'Los dos verbos más importantes del francés', deadline:'', maxTime:10,
        exercises: [
          { type:'test', question:'"Je _____ étudiant" — ¿qué verbo usar?', options:['ai','suis','est','sont'], correct:1 },
          { type:'fill', question:'Completa: Nous _____ deux chiens (Tenemos dos perros)', hint:'forme de avoir', correct:'avons' },
          { type:'test', question:'¿Cuál es la traducción de "Ils sont français"?', options:['Ellos tienen francés','Ellos son franceses','Ellas están en Francia','Nosotros somos franceses'], correct:1 },
        ]
      },
      {
        id:'a2-act2', title:'La vida cotidiana', icon:'bi-house-fill',
        subtitle:'Vocabulario de actividades diarias', deadline:'', maxTime:0,
        exercises: [
          { type:'test', question:'¿Qué significa "Je mange à midi"?', options:['Como a medianoche','Ceno a las doce','Como al mediodía','Desayuno a las doce'], correct:2 },
          { type:'fill', question:'Traduce: "Voy al trabajo" → Je vais au _____', hint:'lieu de travail', correct:'travail' },
          { type:'test', question:'"Il se lève à sept heures" significa:', options:['Se acuesta a las siete','Se levanta a las siete','Trabaja siete horas','Duerme siete horas'], correct:1 },
        ]
      },
    ]
  },
  {
    id:'b1', title:'Francés B1 Intermedio', level:'B1', badge:'badge-b1',
    desc:'Expresión oral, cultura francesa y gramática avanzada',
    activities: [
      {
        id:'b1-act1', title:'El pasado: Passé Composé', icon:'bi-clock-history',
        subtitle:'Habla de eventos pasados con fluidez', deadline:'', maxTime:15,
        exercises: [
          { type:'test', question:'"J\'ai mangé une pomme" está en:', options:['Presente','Futuro','Passé composé','Imparfait'], correct:2 },
          { type:'fill', question:'Forma el passé composé de parler (yo): J\'_____ parlé', hint:'auxiliaire avoir', correct:'ai' },
          { type:'test', question:'¿Cuál es el participio pasado de "finir"?', options:['finissant','fini','finira','finissais'], correct:1 },
        ]
      },
    ]
  },
];

/* ─────────────────────────────────────────────
   STATE
───────────────────────────────────────────── */
const state = {
  // auth
  currentUser: null,
  selectedRole: 'alumno',
  isImpersonating: false,
  savedProfePanel: null,

  // scoring
  score: 0,
  exercisesDone: 0,
  activitiesDone: 0,
  correctAnswers: 0,
  totalAnswers: 0,
  currentLevel: 'basico',

  // navigation
  currentCourseId: null,
  currentActivityId: null,
  currentExerciseIndex: 0,
  exerciseSessionScore: 0,
  exerciseAnswered: false,
  completedActivities: new Set(),

  // activity timer
  activityTimer: null,
  activityTimeLeft: 0,

  // session timer
  sessionStart: null,
  sessionTimerInterval: null,

  // editor context
  editorActivityId: null,
  editorCourseId: null,
  editingCourseId: null,
  editingActivityId: null,
  editingExerciseIndex: null,

  // notes per course
  courseNotes: {},
};

/* ─────────────────────────────────────────────
   AUTH LOGIC
───────────────────────────────────────────── */
function selectRole(role) {
  state.selectedRole = role;
  document.getElementById('role-alumno').classList.toggle('active', role === 'alumno');
  document.getElementById('role-profesor').classList.toggle('active', role === 'profesor');
}

function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-password').value.trim();
  if (!email || !pass) { showLoginError('Por favor completa todos los campos.'); return; }

  let user = MOCK_USERS.find(u => u.email === email && u.password === pass);
  if (!user) {
    if (email.includes('@') && pass.length >= 4) {
      user = { email, password: pass, name: email.split('@')[0], role: state.selectedRole };
    } else {
      showLoginError('Credenciales incorrectas. Prueba alumno@test.com / 1234');
      return;
    }
  }
  user = { ...user, role: state.selectedRole };
  state.currentUser = user;

  // localStorage persistence
  if (document.getElementById('remember-me').checked) {
    try { localStorage.setItem('lf_session', JSON.stringify({ email, role: state.selectedRole })); } catch(e) {}
  }

  document.getElementById('login-error').classList.add('d-none');
  enterApp();
}

function doRegister() {
  const email = document.getElementById('login-email').value.trim() || 'nuevo@usuario.com';
  state.currentUser = { email, name: email.split('@')[0], role: state.selectedRole };
  enterApp();
}

function doLogout() {
  clearActivityTimer();
  clearInterval(state.sessionTimerInterval);
  try { localStorage.removeItem('lf_session'); } catch(e) {}
  Object.assign(state, {
    currentUser:null, score:0, exercisesDone:0, activitiesDone:0,
    correctAnswers:0, totalAnswers:0, completedActivities: new Set(),
    isImpersonating:false, courseNotes:{}
  });
  showScreen('screen-login');
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
}

function enterApp() {
  const user = state.currentUser;
  document.getElementById('nav-avatar').textContent = user.name.substring(0,2).toUpperCase();
  document.getElementById('nav-username').textContent = user.name;
  const pill = document.getElementById('nav-role-pill');
  pill.textContent = user.role === 'profesor' ? 'Profesor' : 'Alumno';
  pill.className   = 'user-role-pill' + (user.role === 'profesor' ? ' profesor' : '');

  document.getElementById('sidebar-alumno').style.display   = user.role === 'alumno'   ? '' : 'none';
  document.getElementById('sidebar-profesor').style.display = user.role === 'profesor' ? '' : 'none';

  if (user.role === 'alumno') {
    buildCourses();
    updateDashboard();
    showPanel('dashboard');
    startSessionTimer();
  } else {
    buildProfeDashboard();
    buildStudents();
    buildProfeCourses();
    buildProfeLeaderboard();
    populateEditorFilter();
    renderActivityEditor();
    showPanel('profe-dashboard');
  }
  seedChat();
  showScreen('screen-app');
}

/* ─────────────────────────────────────────────
   IMPERSONATION
───────────────────────────────────────────── */
function startImpersonation() {
  state.isImpersonating = true;
  state.savedProfePanel = 'profe-dashboard';
  const banner = document.getElementById('teacher-impersonation-mode');
  banner.classList.add('visible');
  document.getElementById('sidebar-profesor').style.display = 'none';
  document.getElementById('sidebar-alumno').style.display   = '';
  document.getElementById('nav-role-pill').textContent = 'Vista Alumno';
  document.getElementById('nav-role-pill').className   = 'user-role-pill';
  buildCourses();
  updateDashboard();
  showPanel('dashboard');
}

function exitImpersonation() {
  state.isImpersonating = false;
  document.getElementById('teacher-impersonation-mode').classList.remove('visible');
  document.getElementById('sidebar-alumno').style.display   = 'none';
  document.getElementById('sidebar-profesor').style.display = '';
  document.getElementById('nav-role-pill').textContent = 'Profesor';
  document.getElementById('nav-role-pill').className   = 'user-role-pill profesor';
  showPanel('profe-dashboard');
}

/* ─────────────────────────────────────────────
   SCREEN / PANEL NAVIGATION
───────────────────────────────────────────── */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function showPanel(id) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  // Sync sidebar active
  document.querySelectorAll('.sidebar-item').forEach(b => b.classList.remove('active'));
  const panelToText = {
    'dashboard':'Inicio', 'courses':'Cursos', 'leaderboard':'Leaderboard',
    'progress':'Mi progreso', 'messages':'Mensajes',
    'profe-dashboard':'Inicio', 'profe-students':'Alumnos',
    'profe-leaderboard':'Leaderboard', 'profe-courses':'Cursos',
    'activity-editor':'Editor actividades',
  };
  const label = panelToText[id];
  if (label) {
    document.querySelectorAll('.sidebar-item').forEach(b => {
      if (b.textContent.trim().startsWith(label)) b.classList.add('active');
    });
  }

  // Refresh content when panels open
  if (id === 'leaderboard') buildLeaderboard('leaderboard-content');
  if (id === 'profe-leaderboard') buildLeaderboard('profe-leaderboard-content');
}

/* ─────────────────────────────────────────────
   SESSION TIMER
───────────────────────────────────────────── */
function startSessionTimer() {
  state.sessionStart = Date.now();
  clearInterval(state.sessionTimerInterval);
  state.sessionTimerInterval = setInterval(() => {
    const mins = Math.floor((Date.now() - state.sessionStart) / 60000);
    const el = document.getElementById('prog-session-time');
    if (el) el.textContent = mins < 1 ? 'Menos de 1 min' : `${mins} min`;
  }, 10000);
}

/* ─────────────────────────────────────────────
   ACTIVITY TIMER
───────────────────────────────────────────── */
function startActivityTimer(minutes) {
  clearActivityTimer();
  if (!minutes || minutes <= 0) return;
  state.activityTimeLeft = minutes * 60;
  const display = document.getElementById('global-timer');
  const valEl   = document.getElementById('timer-val');
  display.classList.add('visible');
  state.activityTimer = setInterval(() => {
    state.activityTimeLeft--;
    const m = String(Math.floor(state.activityTimeLeft / 60)).padStart(2,'0');
    const s = String(state.activityTimeLeft % 60).padStart(2,'0');
    valEl.textContent = `${m}:${s}`;
    if (state.activityTimeLeft <= 30) display.classList.add('urgent');
    if (state.activityTimeLeft <= 0) {
      clearActivityTimer();
      showToastAlert('⏰ ¡Tiempo agotado! La actividad se ha cerrado.', 'warning');
      setTimeout(() => showPanel('activity-container'), 2000);
    }
  }, 1000);
}

function clearActivityTimer() {
  clearInterval(state.activityTimer);
  const display = document.getElementById('global-timer');
  display.classList.remove('visible', 'urgent');
  document.getElementById('timer-val').textContent = '00:00';
}

function showToastAlert(msg, type) {
  const t = document.getElementById('feedback-toast');
  t.querySelector('#toast-icon').textContent = type === 'warning' ? '⏰' : 'ℹ️';
  t.querySelector('#toast-msg').textContent  = msg;
  t.querySelector('#toast-points').textContent = '';
  t.className = 'feedback-toast show';
  setTimeout(() => t.classList.remove('show'), 3500);
}

/* ─────────────────────────────────────────────
   DASHBOARD
───────────────────────────────────────────── */
function updateDashboard() {
  document.getElementById('user-score').textContent          = state.score.toLocaleString();
  document.getElementById('dash-exercises-done').textContent = state.exercisesDone;
  document.getElementById('dash-activities-done').textContent= state.activitiesDone;
  document.getElementById('prog-score').textContent          = state.score.toLocaleString();

  const acc = state.totalAnswers > 0
    ? Math.round((state.correctAnswers / state.totalAnswers) * 100) + '%' : '—';
  document.getElementById('dash-accuracy').textContent = acc;

  const lvl = getLevelData();
  state.currentLevel = lvl.id;
  document.getElementById('level-indicator').textContent = lvl.label;
  document.getElementById('prog-level').textContent      = lvl.label;
  document.getElementById('level-desc').textContent      = lvl.desc;
  document.getElementById('level-icon').textContent      = lvl.icon;
  document.getElementById('level-card').className        = 'level-card mb-4 ' + lvl.class;

  const range = lvl.max === Infinity ? state.score - lvl.min : lvl.max - lvl.min;
  const done  = lvl.max === Infinity ? range : state.score - lvl.min;
  const pct   = Math.min(100, Math.round((done / range) * 100));
  document.getElementById('level-progress-fill').style.width = pct + '%';

  const nextLvl = LEVELS.find(l => l.min > lvl.min);
  if (nextLvl) {
    const rem = nextLvl.min - state.score;
    document.getElementById('level-progress-label').textContent = `Progreso hacia ${nextLvl.label}`;
    document.getElementById('level-next').textContent = `Te faltan ${rem.toLocaleString()} puntos para ${nextLvl.label}`;
  } else {
    document.getElementById('level-progress-label').textContent = '¡Nivel máximo alcanzado! 🏆';
    document.getElementById('level-next').textContent = 'Eres un maestro del francés';
  }

  const m = MOTIVATIONAL_MSGS[Math.floor(Math.random() * MOTIVATIONAL_MSGS.length)];
  document.getElementById('motivational-banner').querySelector('.msg-icon').textContent = m.icon;
  document.getElementById('motivational-msg').textContent = m.msg;
  document.getElementById('dash-name').textContent = state.currentUser.name.split(' ')[0];

  buildQuickCourses();
  buildProgressCourseList();
}

function getLevelData() {
  return LEVELS.slice().reverse().find(l => state.score >= l.min) || LEVELS[0];
}

function buildQuickCourses() {
  document.getElementById('quick-courses').innerHTML =
    COURSES.slice(0,3).map(c => `<div class="col-md-4 col-sm-6">${courseCardHTML(c)}</div>`).join('');
}

/* ─────────────────────────────────────────────
   COURSE LOGIC
───────────────────────────────────────────── */
function buildCourses() {
  document.getElementById('courses-container').innerHTML =
    COURSES.map(c => `<div class="col-md-4 col-sm-6">${courseCardHTML(c)}</div>`).join('');
}

function courseCardHTML(c) {
  const total = c.activities.reduce((s,a) => s + a.exercises.length, 0);
  const done  = c.activities.filter(a => state.completedActivities.has(a.id)).length;
  const pct   = Math.round((done / Math.max(1, c.activities.length)) * 100);
  return `<div class="course-card">
    <span class="course-level-badge ${c.badge}">${c.level}</span>
    <div class="course-title">${c.title}</div>
    <div class="course-meta">${c.desc}</div>
    <div class="course-meta mt-1">${c.activities.length} actividades · ${total} ejercicios</div>
    <div class="course-progress-bar"><div class="course-progress-fill" style="width:${pct}%"></div></div>
    <div class="course-progress-text">${done}/${c.activities.length} actividades completadas</div>
    <button class="btn-course" onclick="openCourse('${c.id}')">
      ${done === 0 ? 'Empezar' : done < c.activities.length ? 'Continuar' : 'Revisar'} →
    </button>
  </div>`;
}

function openCourse(courseId) {
  const course = COURSES.find(c => c.id === courseId);
  if (!course) return;
  state.currentCourseId = courseId;
  document.getElementById('activity-course-title').textContent = course.title;

  // Notes
  const notesWrap = document.getElementById('activity-notes-wrap');
  const notesTA   = document.getElementById('activity-notes');
  notesWrap.style.display = '';
  notesTA.value = state.courseNotes[courseId] || '';

  buildActivityList(course);
  showPanel('activity-container');
}

function saveNotes() {
  if (state.currentCourseId) {
    state.courseNotes[state.currentCourseId] = document.getElementById('activity-notes').value;
    try { localStorage.setItem('lf_notes', JSON.stringify(state.courseNotes)); } catch(e) {}
  }
}

/* ─────────────────────────────────────────────
   ACTIVITY LOGIC
───────────────────────────────────────────── */
function buildActivityList(course) {
  const isTeacher = state.currentUser.role === 'profesor' && !state.isImpersonating;
  document.getElementById('activity-list').innerHTML = course.activities.map((act, i) => {
    const done       = state.completedActivities.has(act.id);
    const statusCls  = done ? 'status-done' : 'status-pending';
    const statusTxt  = done ? '✓ Completada' : 'Pendiente';
    const deadline   = act.deadline ? `<span class="activity-deadline"><i class="bi bi-calendar3 me-1"></i>Límite: ${act.deadline}</span>` : '';
    const timerBadge = act.maxTime  ? `<span class="activity-timer-badge"><i class="bi bi-stopwatch me-1"></i>${act.maxTime} min</span>` : '';
    const teacherBtns = isTeacher ? `
      <div class="activity-teacher-actions ms-2">
        <button class="btn btn-sm btn-outline-primary" style="border-radius:6px;font-size:.75rem;" onclick="event.stopPropagation();editActivity('${course.id}','${act.id}')">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="btn-danger-custom" style="padding:.3rem .55rem;font-size:.72rem;" onclick="event.stopPropagation();deleteActivity('${course.id}','${act.id}')">
          <i class="bi bi-trash"></i>
        </button>
      </div>` : '';
    return `<div class="activity-item ${isTeacher ? 'teacher-item' : ''}" onclick="${isTeacher ? '' : `openActivity('${course.id}','${act.id}')`}">
      <div class="activity-icon"><i class="bi ${act.icon || 'bi-book'}"></i></div>
      <div class="activity-info">
        <div class="activity-title">${i+1}. ${act.title}</div>
        <div class="activity-subtitle">${act.subtitle} · ${act.exercises.length} ejercicios</div>
        <div class="activity-meta-row">${deadline}${timerBadge}</div>
      </div>
      <span class="activity-status ${statusCls}">${statusTxt}</span>
      ${teacherBtns}
    </div>`;
  }).join('');
}

function openActivity(courseId, activityId) {
  const course   = COURSES.find(c => c.id === courseId);
  const activity = course.activities.find(a => a.id === activityId);
  state.currentCourseId   = courseId;
  state.currentActivityId = activityId;
  state.exerciseSessionScore = 0;
  state.currentExerciseIndex = 0;

  // Start timer if set
  if (activity.maxTime > 0) startActivityTimer(activity.maxTime);

  document.getElementById('exercise-back-btn').onclick = () => {
    clearActivityTimer();
    showPanel('activity-container');
  };
  loadExercise(activity, 0);
  showPanel('exercise-panel');
}

/* ─────────────────────────────────────────────
   SCORING SYSTEM
───────────────────────────────────────────── */
function applyPoints(pts, isCorrect) {
  const prevLevel = getLevelData().id;
  state.score += pts;
  state.exerciseSessionScore += pts;
  state.exercisesDone++;
  document.getElementById('ex-points-live').textContent = state.exerciseSessionScore;

  // Floating point pop
  const pop = document.createElement('div');
  pop.className = 'points-pop';
  pop.textContent = `+${pts}`;
  pop.style.cssText = `top:${Math.random()*30+35}%;left:${Math.random()*30+35}%;`;
  document.body.appendChild(pop);
  setTimeout(() => pop.remove(), 1000);

  const newLevel = getLevelData().id;
  if (newLevel !== prevLevel) setTimeout(() => showLevelUp(newLevel), 700);
  updateDashboard();
}

/* ─────────────────────────────────────────────
   EXERCISE ENGINE
───────────────────────────────────────────── */
function loadExercise(activity, index) {
  state.exerciseAnswered = false;
  const ex    = activity.exercises[index];
  const total = activity.exercises.length;
  const pct   = Math.round((index / total) * 100);

  document.getElementById('ex-counter').textContent         = `Ejercicio ${index+1}/${total}`;
  document.getElementById('ex-progress-fill').style.width   = pct + '%';

  const card    = document.getElementById('exercise-list');
  const typeTxt = ex.type === 'test' ? 'Opción múltiple' : 'Rellena el hueco';
  const letters = ['A','B','C','D'];

  if (ex.type === 'test') {
    const opts = ex.options.map((o, i) => `
      <button class="option-btn" onclick="checkTest(${i}, ${ex.correct}, '${activity.id}', ${index})">
        <span class="option-letter">${letters[i]}</span>${o}
      </button>`).join('');
    card.innerHTML = `
      <span class="exercise-type-badge">${typeTxt}</span>
      <div class="exercise-question">${ex.question}</div>
      <div>${opts}</div>
      <div id="ex-feedback" class="mt-3"></div>`;
  } else {
    card.innerHTML = `
      <span class="exercise-type-badge">${typeTxt}</span>
      <div class="exercise-question">${ex.question}</div>
      <div class="fill-blank-wrap mt-2">
        <input class="fill-input" id="fill-input" type="text" placeholder="${ex.hint || 'Tu respuesta…'}" autocomplete="off"/>
        <button class="btn-check" id="fill-btn" onclick="checkFill('${ex.correct}','${activity.id}',${index})">Comprobar →</button>
      </div>
      <div id="ex-feedback" class="mt-3"></div>`;
    document.getElementById('fill-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') document.getElementById('fill-btn').click();
    });
  }
}

function checkTest(chosen, correct, actId, exIndex) {
  if (state.exerciseAnswered) return;
  state.exerciseAnswered = true;
  state.totalAnswers++;
  const btns = document.querySelectorAll('.option-btn');
  btns.forEach(b => b.disabled = true);
  const isCorrect = chosen === correct;
  const pts = isCorrect ? 100 : 20;
  btns[chosen].classList.add(isCorrect ? 'correct' : 'wrong');
  if (!isCorrect) btns[correct].classList.add('correct');
  if (isCorrect) state.correctAnswers++;
  applyPoints(pts, isCorrect);
  showFeedback(isCorrect, pts);
  scheduleNextExercise(actId, exIndex);
}

function checkFill(correct, actId, exIndex) {
  if (state.exerciseAnswered) return;
  const input = document.getElementById('fill-input');
  const val   = input.value.trim();
  if (!val) return;
  state.exerciseAnswered = true;
  state.totalAnswers++;
  const isCorrect = val.toLowerCase() === correct.toLowerCase();
  const pts = isCorrect ? 100 : 20;
  input.disabled = true;
  document.getElementById('fill-btn').disabled = true;
  input.classList.add(isCorrect ? 'correct' : 'wrong');
  if (!isCorrect) {
    const hint = document.createElement('div');
    hint.style.cssText = 'font-size:.82rem;color:#059669;margin-top:.4rem;font-weight:500;';
    hint.textContent = `Respuesta correcta: ${correct}`;
    input.parentElement.appendChild(hint);
  }
  if (isCorrect) state.correctAnswers++;
  applyPoints(pts, isCorrect);
  showFeedback(isCorrect, pts);
  scheduleNextExercise(actId, exIndex);
}

function showFeedback(isCorrect, pts) {
  const t = document.getElementById('feedback-toast');
  const msgs = isCorrect
    ? ['¡Perfecto! 🔥','¡Excelente! ⭐','¡Correcto! 💪','¡Brillante! ✨']
    : ['¡Casi! Sigue intentándolo 💪','¡Muy cerca! No te rindas 🎯','¡Buen intento! 📚'];
  t.querySelector('#toast-msg').textContent    = msgs[Math.floor(Math.random()*msgs.length)];
  t.querySelector('#toast-points').textContent = `+${pts} pts`;
  t.querySelector('#toast-icon').textContent   = isCorrect ? '🎉' : '💡';
  t.className = `feedback-toast show ${isCorrect ? 'toast-correct' : 'toast-wrong'}`;
  setTimeout(() => t.classList.remove('show'), 2500);
}

function scheduleNextExercise(actId, exIndex) {
  const course   = COURSES.find(c => c.id === state.currentCourseId);
  const activity = course.activities.find(a => a.id === actId);
  const nextIdx  = exIndex + 1;
  setTimeout(() => {
    if (nextIdx < activity.exercises.length) {
      loadExercise(activity, nextIdx);
      state.currentExerciseIndex = nextIdx;
    } else {
      finishActivity(activity);
    }
  }, 1600);
}

function finishActivity(activity) {
  clearActivityTimer();
  state.completedActivities.add(activity.id);
  state.activitiesDone++;
  updateDashboard();
  document.getElementById('complete-icon').textContent  = '🎉';
  document.getElementById('complete-points').textContent= `+${state.exerciseSessionScore} puntos`;
  document.getElementById('complete-sub').textContent   = `Has completado "${activity.title}" con ${state.exerciseSessionScore} puntos 🏆`;
  showPanel('activity-complete-panel');
}

/* ─────────────────────────────────────────────
   LEVEL UP
───────────────────────────────────────────── */
function showLevelUp(levelId) {
  const lvl = LEVELS.find(l => l.id === levelId);
  document.getElementById('levelup-icon').textContent  = lvl.icon;
  document.getElementById('levelup-title').textContent = `¡Nivel ${lvl.label} desbloqueado!`;
  document.getElementById('levelup-sub').textContent   = lvl.desc;
  document.getElementById('levelup-overlay').style.display = 'flex';
}
function closeLevelUp() { document.getElementById('levelup-overlay').style.display = 'none'; }

/* ─────────────────────────────────────────────
   PROGRESS
───────────────────────────────────────────── */
function buildProgressCourseList() {
  const el = document.getElementById('progress-course-list');
  if (!el) return;
  el.innerHTML = COURSES.map(c => {
    const done = c.activities.filter(a => state.completedActivities.has(a.id)).length;
    const pct  = Math.round((done / Math.max(1, c.activities.length)) * 100);
    return `<div class="mb-3">
      <div class="d-flex justify-content-between mb-1">
        <span style="font-weight:600;font-size:.9rem;">${c.title}</span>
        <span style="font-size:.82rem;color:var(--text-muted);">${done}/${c.activities.length} actividades</span>
      </div>
      <div class="prog-bar-wrap"><div class="prog-bar-fill" style="width:${pct}%"></div></div>
    </div>`;
  }).join('');
}

/* ─────────────────────────────────────────────
   LEADERBOARD
───────────────────────────────────────────── */
function buildLeaderboard(containerId) {
  const sorted = [...MOCK_STUDENTS].sort((a,b) => b.points - a.points);
  const levelLabels = { basico:'Básico', intermedio:'Intermedio', avanzado:'Avanzado' };
  const levelBgCls  = { basico:'lb-level-basico', intermedio:'lb-level-intermedio', avanzado:'lb-level-avanzado' };

  const topHtml = sorted.slice(0,3).map((s, i) => {
    const rank = i + 1;
    const rankClass = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : 'rank-3';
    const rowClass  = rank === 1 ? 'top-1'  : rank === 2 ? 'top-2'  : 'top-3';
    const crown     = rank === 1 ? '<span class="lb-crown">👑</span>' : rank === 2 ? '<span class="lb-trophy">🥈</span>' : '<span class="lb-trophy">🥉</span>';
    return `<div class="lb-row ${rowClass}">
      <div class="lb-rank ${rankClass}">${rank}</div>
      <div class="lb-avatar" style="background:${s.color}">${s.initials}</div>
      <div class="lb-info">
        <div class="lb-name">${s.name} ${crown}</div>
        <span class="lb-level-badge ${levelBgCls[s.level]}">${levelLabels[s.level]}</span>
      </div>
      <div class="lb-pts">${s.points.toLocaleString()} pts</div>
    </div>`;
  }).join('');

  const restHtml = sorted.slice(3).map((s, i) => {
    const rank = i + 4;
    return `<div class="lb-row">
      <div class="lb-rank rank-other">${rank}</div>
      <div class="lb-avatar" style="background:${s.color}">${s.initials}</div>
      <div class="lb-info">
        <div class="lb-name">${s.name}</div>
        <span class="lb-level-badge ${levelBgCls[s.level]}">${levelLabels[s.level]}</span>
      </div>
      <div class="lb-pts">${s.points.toLocaleString()} pts</div>
    </div>`;
  }).join('');

  document.getElementById(containerId).innerHTML = `
    <div class="leaderboard-card">
      <div class="leaderboard-header"><i class="bi bi-trophy-fill me-2"></i><h6>Ranking de alumnos · ordenado por puntos</h6></div>
      ${topHtml}${restHtml}
    </div>`;
}

/* ─────────────────────────────────────────────
   MESSAGING
───────────────────────────────────────────── */
function seedChat() {
  const msgs = document.getElementById('chat-messages');
  msgs.innerHTML = '';
  const isProf = state.currentUser.role === 'profesor' && !state.isImpersonating;
  document.getElementById('chat-partner-name').textContent = isProf ? 'Chat con alumnos' : 'Mensaje de tu profesor';
  const seed = isProf
    ? [{ sent:false, text:'Profesor, tengo dudas con el passé composé 🙁', time:'10:12' },
       { sent:true,  text:'¡Hola Ana! Claro, repasemos juntos. ¿Qué parte no entiendes?', time:'10:14' }]
    : [{ sent:false, text:'¡Hola! Recuerda practicar los verbos hoy 💪', time:'09:00' },
       { sent:true,  text:'¡Gracias! Acabo de completar la actividad de "être y avoir" 🎉', time:'09:05' },
       { sent:false, text:'Perfecto, ¡vas genial! Sigue así 🔥', time:'09:06' }];
  seed.forEach(m => appendBubble(m.text, m.sent, m.time));
}

function sendMessage() {
  const inp  = document.getElementById('chat-input');
  const text = inp.value.trim();
  if (!text) return;
  inp.value = '';
  const now  = new Date();
  const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;
  appendBubble(text, true, time);
  const replies = ['¡Buen punto! 👍','Recuerda practicar todos los días 🔥','¡Excellente! Sigue así ⭐','¿Tienes dudas con algún ejercicio?','¡Ya casi llegas al siguiente nivel! 🚀'];
  setTimeout(() => appendBubble(replies[Math.floor(Math.random()*replies.length)], false, time), 900);
}

function appendBubble(text, sent, time) {
  const msgs = document.getElementById('chat-messages');
  const div  = document.createElement('div');
  div.className = `chat-bubble ${sent ? 'sent' : 'received'}`;
  div.innerHTML = `${text}<div class="bubble-meta">${time}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

/* ─────────────────────────────────────────────
   PROFESOR PANELS
───────────────────────────────────────────── */
function buildProfeDashboard() {
  // Metrics table
  const tbody = document.getElementById('profe-metrics-table');
  const levelLabels = { basico:'Básico', intermedio:'Intermedio', avanzado:'Avanzado' };
  const sorted = [...MOCK_STUDENTS].sort((a,b) => b.points - a.points);
  tbody.innerHTML = sorted.map(s => {
    const pct = s.level === 'avanzado' ? 100 : s.level === 'intermedio' ? Math.round((s.points-2000)/60) : Math.round(s.points/20);
    const clamp = Math.min(100, Math.max(0, pct));
    return `<tr>
      <td><div style="display:flex;align-items:center;gap:.5rem;">
        <div style="width:30px;height:30px;border-radius:50%;background:${s.color};color:#fff;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:700;">${s.initials}</div>
        <span style="font-weight:600;">${s.name}</span></div></td>
      <td><span class="badge" style="background:var(--primary-light);color:var(--primary);font-size:.72rem;">${levelLabels[s.level]}</span></td>
      <td style="font-weight:700;color:var(--gold);">${s.points.toLocaleString()}</td>
      <td>${s.exercises}</td>
      <td style="color:var(--text-muted);font-size:.82rem;">${s.lastSeen}</td>
      <td style="color:var(--text-muted);font-size:.82rem;">${s.time}</td>
      <td style="min-width:100px;"><div class="prog-bar-wrap"><div class="prog-bar-fill" style="width:${clamp}%"></div></div><div style="font-size:.7rem;color:var(--text-muted);margin-top:.2rem;">${clamp}%</div></td>
    </tr>`;
  }).join('');

  // Recent activity feed
  const el = document.getElementById('profe-recent-activity');
  el.innerHTML = [
    { icon:'🎯', text:'Ana García completó "Saludos y presentaciones"', time:'Hace 2h' },
    { icon:'⭐', text:'Marta Ruiz alcanzó el nivel Avanzado', time:'Hace 3h' },
    { icon:'📚', text:'Carlos López comenzó el curso A1 Básico', time:'Ayer' },
    { icon:'💪', text:'Sofía Jiménez obtuvo 500 puntos en una sesión', time:'Ayer' },
    { icon:'🏆', text:'Luis Fernández completó su primera actividad', time:'Hace 2 días' },
  ].map(a => `<div class="d-flex align-items-center gap-3 p-3 mb-2" style="background:var(--white);border:1px solid var(--border);border-radius:var(--radius);box-shadow:var(--shadow-sm);">
    <span style="font-size:1.4rem;">${a.icon}</span>
    <div style="flex:1;font-size:.88rem;font-weight:500;">${a.text}</div>
    <span style="font-size:.75rem;color:var(--text-muted);">${a.time}</span>
  </div>`).join('');
}

function buildStudents() {
  const el = document.getElementById('students-list');
  const levelLabels = { basico:'Básico', intermedio:'Intermedio', avanzado:'Avanzado' };
  el.innerHTML = [...MOCK_STUDENTS].sort((a,b) => b.points - a.points).map(s => {
    const lvlCls = s.level === 'avanzado' ? 'color:var(--gold)' : s.level === 'intermedio' ? 'color:var(--green-mid)' : 'color:var(--primary)';
    return `<div class="student-row">
      <div class="student-avatar" style="background:${s.color}">${s.initials}</div>
      <div>
        <div class="student-name">${s.name}</div>
        <div class="student-meta">Última conexión: ${s.lastSeen} · Tiempo total: ${s.time} · Ejercicios: ${s.exercises}</div>
      </div>
      <div class="student-stats">
        <div class="student-points">${s.points.toLocaleString()} pts</div>
        <div class="student-level" style="${lvlCls};font-weight:600;">${levelLabels[s.level]}</div>
      </div>
    </div>`;
  }).join('');
}

function buildProfeCourses() {
  const el = document.getElementById('profe-courses-container');
  const badgeMap = { A1:'badge-a1', A2:'badge-a2', B1:'badge-b1', B2:'badge-b1' };
  el.innerHTML = COURSES.map(c => `
    <div class="col-md-4 col-sm-6">
      <div class="course-card">
        <span class="course-level-badge ${c.badge || badgeMap[c.level] || 'badge-a1'}">${c.level}</span>
        <div class="course-title">${c.title}</div>
        <div class="course-meta">${c.desc}</div>
        <div class="course-meta mt-1">${c.activities.length} actividades</div>
        <div class="mt-3 d-flex gap-2 flex-wrap">
          <button class="btn btn-sm btn-outline-primary" style="border-radius:8px;font-size:.8rem;" onclick="editCourse('${c.id}')"><i class="bi bi-pencil me-1"></i>Editar</button>
          <button class="btn btn-sm btn-outline-secondary" style="border-radius:8px;font-size:.8rem;" onclick="openCourse('${c.id}')"><i class="bi bi-eye me-1"></i>Ver actividades</button>
          <button class="btn btn-sm btn-outline-danger" style="border-radius:8px;font-size:.8rem;" onclick="deleteCourse('${c.id}')"><i class="bi bi-trash me-1"></i></button>
        </div>
      </div>
    </div>`).join('');
}

function buildProfeLeaderboard() { buildLeaderboard('profe-leaderboard-content'); }

/* ─────────────────────────────────────────────
   COURSE MANAGER (professor)
───────────────────────────────────────────── */
function openCourseModal(courseId) {
  state.editingCourseId = courseId || null;
  if (courseId) {
    const c = COURSES.find(x => x.id === courseId);
    document.getElementById('mc-title').value = c.title;
    document.getElementById('mc-level').value = c.level;
    document.getElementById('mc-desc').value  = c.desc;
    document.getElementById('modal-course-title').textContent = 'Editar Curso';
  } else {
    document.getElementById('mc-title').value = '';
    document.getElementById('mc-level').value = 'A1';
    document.getElementById('mc-desc').value  = '';
    document.getElementById('modal-course-title').textContent = 'Nuevo Curso';
  }
  openModal('modal-course');
}

function editCourse(id) { openCourseModal(id); }

function saveCourse() {
  const title = document.getElementById('mc-title').value.trim();
  const level = document.getElementById('mc-level').value;
  const desc  = document.getElementById('mc-desc').value.trim();
  if (!title) { alert('Escribe un título para el curso.'); return; }
  const badgeMap = { A1:'badge-a1', A2:'badge-a2', B1:'badge-b1', B2:'badge-b1' };
  if (state.editingCourseId) {
    const c = COURSES.find(x => x.id === state.editingCourseId);
    c.title = title; c.level = level; c.desc = desc; c.badge = badgeMap[level];
  } else {
    COURSES.push({ id:'c'+ Date.now(), title, level, badge: badgeMap[level], desc, activities:[] });
  }
  closeModal('modal-course');
  buildProfeCourses();
  populateEditorFilter();
  renderActivityEditor();
}

function deleteCourse(id) {
  if (!confirm('¿Eliminar este curso y todas sus actividades?')) return;
  COURSES = COURSES.filter(c => c.id !== id);
  buildProfeCourses();
  populateEditorFilter();
  renderActivityEditor();
}

/* ─────────────────────────────────────────────
   ACTIVITY EDITOR
───────────────────────────────────────────── */
function populateEditorFilter() {
  const sel = document.getElementById('editor-course-filter');
  const val = sel.value;
  sel.innerHTML = '<option value="">Todos los cursos</option>' +
    COURSES.map(c => `<option value="${c.id}">${c.title}</option>`).join('');
  sel.value = COURSES.find(c => c.id === val) ? val : '';
}

function renderActivityEditor() {
  const filter = document.getElementById('editor-course-filter').value;
  const courses = filter ? COURSES.filter(c => c.id === filter) : COURSES;
  let html = '';
  courses.forEach(course => {
    html += `<div class="editor-card mb-3">
      <div class="d-flex align-items-center justify-content-between mb-2">
        <h6 class="mb-0">${course.title}</h6>
        <button class="btn-primary-custom" style="font-size:.78rem;padding:.3rem .7rem;" onclick="openActivityModal('${course.id}')"><i class="bi bi-plus-lg me-1"></i>Actividad</button>
      </div>`;
    if (course.activities.length === 0) {
      html += `<div style="font-size:.85rem;color:var(--text-muted);padding:.5rem 0;">Sin actividades todavía. Crea la primera.</div>`;
    } else {
      course.activities.forEach((act, idx) => {
        html += `<div class="exercise-editor-item">
          <span class="drag-handle"><i class="bi bi-grip-vertical"></i></span>
          <div>
            <div class="ex-preview">${idx+1}. ${act.title}</div>
            <div style="font-size:.75rem;color:var(--text-muted);margin-top:.1rem;">${act.exercises.length} ejercicios${act.maxTime ? ` · ${act.maxTime} min` : ''}${act.deadline ? ` · Límite: ${act.deadline}` : ''}</div>
          </div>
          <div style="margin-left:auto;display:flex;gap:.4rem;align-items:center;">
            <button class="btn btn-sm btn-outline-primary" style="border-radius:6px;font-size:.72rem;" onclick="openActivityModal('${course.id}','${act.id}')">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-sm btn-outline-success" style="border-radius:6px;font-size:.72rem;" onclick="openExerciseModal('${course.id}','${act.id}')">
              <i class="bi bi-plus-lg"></i> Ejercicio
            </button>
            <button class="btn btn-sm btn-outline-danger" style="border-radius:6px;font-size:.72rem;" onclick="deleteActivity('${course.id}','${act.id}')">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>`;
        // List exercises
        if (act.exercises.length > 0) {
          act.exercises.forEach((ex, ei) => {
            html += `<div style="margin-left:1.5rem;margin-bottom:.25rem;background:#f8f9fa;border:1px dashed var(--border);border-radius:6px;padding:.45rem .75rem;display:flex;align-items:center;gap:.75rem;font-size:.8rem;">
              <span style="color:var(--text-muted);">${ei+1}.</span>
              <span style="flex:1;color:var(--text-main);">${ex.question.substring(0,60)}${ex.question.length>60?'…':''}</span>
              <span class="ex-type-tag">${ex.type === 'test' ? 'test' : 'hueco'}</span>
              <button class="btn btn-sm btn-outline-secondary" style="border-radius:4px;font-size:.7rem;padding:.15rem .4rem;" onclick="deleteExercise('${course.id}','${act.id}',${ei})"><i class="bi bi-x"></i></button>
            </div>`;
          });
        }
      });
    }
    html += `</div>`;
  });
  document.getElementById('activity-editor-list').innerHTML = html || '<p style="color:var(--text-muted);font-size:.88rem;">No hay cursos. Crea uno desde Gestión de Cursos.</p>';
}

/* ─────────────────────────────────────────────
   ACTIVITY MODAL
───────────────────────────────────────────── */
function openActivityModal(courseId, actId) {
  state.editingActivityId = actId || null;
  state.editorCourseId    = courseId || null;

  // Populate course selector
  const sel = document.getElementById('ma-course');
  sel.innerHTML = COURSES.map(c => `<option value="${c.id}" ${c.id === courseId ? 'selected':''}>${c.title}</option>`).join('');

  if (actId) {
    const course = COURSES.find(c => c.id === courseId);
    const act    = course.activities.find(a => a.id === actId);
    document.getElementById('ma-title').value    = act.title;
    document.getElementById('ma-subtitle').value = act.subtitle;
    document.getElementById('ma-deadline').value = act.deadline || '';
    document.getElementById('ma-maxtime').value  = act.maxTime  || 0;
    document.getElementById('modal-activity-title').textContent = 'Editar Actividad';
  } else {
    document.getElementById('ma-title').value    = '';
    document.getElementById('ma-subtitle').value = '';
    document.getElementById('ma-deadline').value = '';
    document.getElementById('ma-maxtime').value  = 0;
    document.getElementById('modal-activity-title').textContent = 'Nueva Actividad';
  }
  openModal('modal-activity');
}

function saveActivity() {
  const courseId = document.getElementById('ma-course').value;
  const title    = document.getElementById('ma-title').value.trim();
  const subtitle = document.getElementById('ma-subtitle').value.trim();
  const deadline = document.getElementById('ma-deadline').value;
  const maxTime  = parseInt(document.getElementById('ma-maxtime').value) || 0;
  if (!title) { alert('Escribe un título para la actividad.'); return; }
  const course = COURSES.find(c => c.id === courseId);
  if (!course) return;

  if (state.editingActivityId) {
    const act    = course.activities.find(a => a.id === state.editingActivityId);
    act.title    = title; act.subtitle = subtitle;
    act.deadline = deadline; act.maxTime = maxTime;
  } else {
    course.activities.push({
      id: 'act-' + Date.now(), title, subtitle,
      icon:'bi-book-fill', deadline, maxTime, exercises:[]
    });
  }
  closeModal('modal-activity');
  buildProfeCourses();
  renderActivityEditor();
}

function editActivity(courseId, actId) { openActivityModal(courseId, actId); }

function deleteActivity(courseId, actId) {
  if (!confirm('¿Eliminar esta actividad y todos sus ejercicios?')) return;
  const course = COURSES.find(c => c.id === courseId);
  course.activities = course.activities.filter(a => a.id !== actId);
  buildProfeCourses();
  renderActivityEditor();
  // Refresh if inside activity list
  if (state.currentCourseId === courseId) buildActivityList(course);
}

/* ─────────────────────────────────────────────
   EXERCISE MODAL
───────────────────────────────────────────── */
function openExerciseModal(courseId, actId, exerciseIndex) {
  state.editorCourseId      = courseId;
  state.editorActivityId    = actId;
  state.editingExerciseIndex = exerciseIndex !== undefined ? exerciseIndex : null;
  toggleExerciseForm();

  if (exerciseIndex !== undefined) {
    const course = COURSES.find(c => c.id === courseId);
    const act    = course.activities.find(a => a.id === actId);
    const ex     = act.exercises[exerciseIndex];
    document.getElementById('me-type').value     = ex.type;
    document.getElementById('me-question').value = ex.question;
    if (ex.type === 'test') {
      ex.options.forEach((o,i) => { const el = document.getElementById('me-opt'+i); if(el) el.value = o; });
      document.querySelectorAll('input[name="me-correct"]').forEach(r => r.checked = (parseInt(r.value) === ex.correct));
    } else {
      document.getElementById('me-fill-correct').value = ex.correct;
      document.getElementById('me-fill-hint').value    = ex.hint || '';
    }
    document.getElementById('modal-exercise-title').textContent = 'Editar Ejercicio';
  } else {
    document.getElementById('me-type').value     = 'test';
    document.getElementById('me-question').value = '';
    ['me-opt0','me-opt1','me-opt2','me-opt3'].forEach(id => { const el = document.getElementById(id); if(el) el.value=''; });
    document.querySelector('input[name="me-correct"][value="0"]').checked = true;
    document.getElementById('me-fill-correct').value = '';
    document.getElementById('me-fill-hint').value    = '';
    document.getElementById('modal-exercise-title').textContent = 'Nuevo Ejercicio';
  }
  toggleExerciseForm();
  openModal('modal-exercise');
}

function toggleExerciseForm() {
  const type = document.getElementById('me-type').value;
  document.getElementById('me-test-fields').style.display = type === 'test' ? '' : 'none';
  document.getElementById('me-fill-fields').style.display = type === 'fill' ? '' : 'none';
}

function saveExercise() {
  const courseId = state.editorCourseId;
  const actId    = state.editorActivityId;
  const type     = document.getElementById('me-type').value;
  const question = document.getElementById('me-question').value.trim();
  if (!question) { alert('Escribe la pregunta.'); return; }

  const course = COURSES.find(c => c.id === courseId);
  const act    = course.activities.find(a => a.id === actId);

  let exercise;
  if (type === 'test') {
    const opts    = ['me-opt0','me-opt1','me-opt2','me-opt3'].map(id => document.getElementById(id).value.trim()).filter(Boolean);
    const correct = parseInt(document.querySelector('input[name="me-correct"]:checked').value);
    if (opts.length < 2) { alert('Añade al menos 2 opciones.'); return; }
    exercise = { type:'test', question, options: opts, correct };
  } else {
    const correctAns = document.getElementById('me-fill-correct').value.trim();
    const hint       = document.getElementById('me-fill-hint').value.trim();
    if (!correctAns) { alert('Escribe la respuesta correcta.'); return; }
    exercise = { type:'fill', question, correct: correctAns, hint };
  }

  if (state.editingExerciseIndex !== null) {
    act.exercises[state.editingExerciseIndex] = exercise;
  } else {
    act.exercises.push(exercise);
  }
  closeModal('modal-exercise');
  renderActivityEditor();
}

function deleteExercise(courseId, actId, exIndex) {
  if (!confirm('¿Eliminar este ejercicio?')) return;
  const course = COURSES.find(c => c.id === courseId);
  const act    = course.activities.find(a => a.id === actId);
  act.exercises.splice(exIndex, 1);
  renderActivityEditor();
}

/* ─────────────────────────────────────────────
   MODAL HELPERS
───────────────────────────────────────────── */
function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
// Close on overlay click
document.querySelectorAll('.modal-overlay').forEach(o => {
  o.addEventListener('click', e => { if (e.target === o) o.classList.remove('open'); });
});

/* ─────────────────────────────────────────────
   INIT — auto-restore session
───────────────────────────────────────────── */
(function init() {
  // Rotating motivational messages every 10s
  setInterval(() => {
    const el = document.getElementById('motivational-msg');
    if (!el) return;
    const m = MOTIVATIONAL_MSGS[Math.floor(Math.random() * MOTIVATIONAL_MSGS.length)];
    document.getElementById('motivational-banner').querySelector('.msg-icon').textContent = m.icon;
    el.textContent = m.msg;
  }, 10000);

  // Restore localStorage session
  try {
    const saved = localStorage.getItem('lf_session');
    if (saved) {
      const { email, role } = JSON.parse(saved);
      document.getElementById('login-email').value = email;
      selectRole(role);
    }
    const savedNotes = localStorage.getItem('lf_notes');
    if (savedNotes) state.courseNotes = JSON.parse(savedNotes);
  } catch(e) {}
})();
/*
=================================================================
  ESQUEMA DE IDs v2.0 — DOCUMENTACIÓN INTERNA
=================================================================

── SCREENS ───────────────────────────────────────────────────────
  #screen-login              → Login con recuerdo de sesión (localStorage)
  #screen-app                → App principal post-login

── BANNERS ───────────────────────────────────────────────────────
  #teacher-impersonation-mode → Banner rojo visible cuando profesor impersona alumno

── NAVBAR ────────────────────────────────────────────────────────
  .app-navbar                → Navbar sticky
  #nav-avatar                → Iniciales del usuario
  #nav-username              → Nombre del usuario
  #nav-role-pill             → Badge de rol (Alumno / Profesor / Vista Alumno)
  #global-timer              → Timer de actividad (.visible/.urgent)
  #timer-val                 → Valor del timer "MM:SS"

── SIDEBARS ──────────────────────────────────────────────────────
  #sidebar-alumno            → Sidebar para alumnos (incluye Leaderboard)
  #sidebar-profesor          → Sidebar para profesor (incluye Vista alumno btn)

── PANELS ALUMNO ─────────────────────────────────────────────────
  #dashboard                 → Dashboard alumno
  #courses                   → Galería de cursos
  #activity-container        → Actividades de un curso (con apuntes)
  #activity-notes-wrap       → Panel de apuntes editable
  #activity-notes            → Textarea de apuntes
  #exercise-panel            → Motor de ejercicios
  #activity-complete-panel   → Pantalla de actividad completada
  #leaderboard               → Leaderboard para alumno
  #progress                  → Progreso del alumno (incluye tiempo sesión)
  #messages                  → Chat

── PANELS PROFESOR ───────────────────────────────────────────────
  #profe-dashboard           → Panel profesor con métricas + tabla de progreso
  #profe-students            → Listado de alumnos
  #profe-leaderboard         → Leaderboard del aula (panel profesor)
  #course-manager            → Div interno de #profe-courses
  #profe-courses             → Gestión de cursos (crear/editar/eliminar)
  #activity-editor           → Editor completo de actividades y ejercicios

── MODALES ───────────────────────────────────────────────────────
  #modal-course              → Modal crear/editar curso
  #modal-activity            → Modal crear/editar actividad (con deadline+timer)
  #modal-exercise            → Modal crear/editar ejercicio (test o hueco)

── LEADERBOARD ───────────────────────────────────────────────────
  #leaderboard-content       → Contenedor leaderboard alumno
  #profe-leaderboard-content → Contenedor leaderboard profesor
  .lb-row.top-1/2/3          → Filas destacadas top 3
  .lb-rank.rank-1/2/3        → Medallas con gradiente
  .lb-level-badge            → Badge de nivel junto al nombre

── ACTIVITY EDITOR ───────────────────────────────────────────────
  #activity-editor-list      → Lista dinámica de actividades editables
  #editor-course-filter      → Selector de filtro por curso
  .exercise-editor-item      → Fila de actividad en el editor

── TIMER ─────────────────────────────────────────────────────────
  .timer-display             → Div del timer (visible/urgent vía clases)
  state.activityTimer        → setInterval del timer de actividad
  state.sessionTimerInterval → setInterval del tiempo de sesión

── USUARIOS DEMO ────────────────────────────────────────────────
  alumno@test.com   / 1234   → Dashboard alumno
  profesor@test.com / 1234   → Panel profesor
  (cualquier email válido + pass ≥4 chars) → alumno genérico

=================================================================

  CAMBIOS REALIZADOS v1 → v2
=================================================================

PALETA DE COLORES:
  ✓ Primary:    #1a3a5c / #2563eb  →  #0055A4 (azul Francia)
  ✓ Secondary:  (sin uso)          →  #EF4135 (rojo Francia)
  ✓ Background: #f8fafc            →  #f8f9fa
  ✓ Todos los gradientes, badges y botones actualizados

NUEVAS FUNCIONALIDADES:
  ✓ Leaderboard mejorado: top 3 destacado, medallas, nivel junto al nombre, orden automático por puntos
  ✓ Timer funcional por actividad (MM:SS en navbar, pulso rojo últimos 30s)
  ✓ Fecha límite en actividades (visible en la lista)
  ✓ Campo de apuntes editable por curso (guardado en localStorage)
  ✓ Persistencia de sesión (localStorage: recuerda email y rol)
  ✓ Tiempo de sesión activo simulado en "Mi Progreso"
  ✓ Editor de actividades completo: crear, editar, eliminar actividades
  ✓ Editor de ejercicios completo: crear, editar, eliminar ejercicios (test y hueco)
  ✓ Creación de cursos desde el panel del profesor
  ✓ Edición y eliminación de cursos
  ✓ Modo impersonación: profesor ve la app como alumno con banner rojo
  ✓ Tabla de métricas por alumno: ejercicios, tiempo, última actividad, barra de progreso
  ✓ Modales propios (sin depender de Bootstrap modal JS)

MEJORAS DE UX:
  ✓ Banner de impersonación con botón de vuelta
  ✓ Badge de versión "2.0" en navbar
  ✓ Botones de editar/eliminar actividades inline (solo para profesor)
  ✓ Pista de respuesta correcta en ejercicios de hueco cuando falla
  ✓ Hint de credenciales demo en login
  ✓ Sidebar con secciones y etiquetas

REFACTOR JS:
  ✓ auth logic    → doLogin, doRegister, doLogout, enterApp, selectRole
  ✓ course logic  → buildCourses, courseCardHTML, openCourse, saveCourse, deleteCourse
  ✓ activity logic→ buildActivityList, openActivity, saveActivity, deleteActivity
  ✓ exercise logic→ loadExercise, checkTest, checkFill, saveExercise, deleteExercise
  ✓ scoring system→ applyPoints, showFeedback, scheduleNextExercise, finishActivity
  ✓ timer system  → startActivityTimer, clearActivityTimer, startSessionTimer
  ✓ impersonation → startImpersonation, exitImpersonation
  ✓ modal helpers → openModal, closeModal (con cierre al clicar overlay)
*/