/* =============================================================
   Le Français v3.0 — JavaScript unificado
   Cambios vs v2:
   ✓ Login: sin registro visible, sin hint demo en UI
   ✓ Leaderboard: podio visual, solo alumnos, profesor excluido
   ✓ % acierto: añadido al alumno, eliminado del panel profesor
   ✓ Settings: dark mode toggle + cambio contraseña
   ✓ Editor ejercicios: 4 tipos (test, fill, match, image)
   ✓ Rol Director: estructura lista para backend
   ✓ Generación automática username + contraseña (Director)
   ✓ Modo oscuro: clase body.dark-mode, persistido en localStorage
============================================================= */

/* ─── DATA ─── */
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

/* Usuarios demo — en código, nunca en la UI */
const MOCK_USERS = [
  { email:'alumno@test.com',   password:'1234',  name:'Alumno Demo',   role:'alumno'   },
  { email:'profesor@test.com', password:'1234',  name:'Profesor Demo', role:'profesor' },
  { email:'director@test.com', password:'admin', name:'Director Demo', role:'director' },
];

/* Solo alumnos en el leaderboard */
const MOCK_STUDENTS = [
  { name:'Ana García',     initials:'AG', color:'#0055A4', points:3400, level:'intermedio', exercises:28, lastSeen:'Hace 2h',    time:'4h 30m', course:'A2', role:'alumno' },
  { name:'Carlos López',   initials:'CL', color:'#059669', points:890,  level:'basico',     exercises:12, lastSeen:'Hace 1 día', time:'1h 15m', course:'A1', role:'alumno' },
  { name:'Marta Ruiz',     initials:'MR', color:'#d97706', points:9200, level:'avanzado',   exercises:76, lastSeen:'Hace 30min', time:'12h',    course:'B1', role:'alumno' },
  { name:'Luis Fernández', initials:'LF', color:'#7c3aed', points:1750, level:'basico',     exercises:19, lastSeen:'Hace 3 días',time:'2h 45m', course:'A1', role:'alumno' },
  { name:'Sofía Jiménez',  initials:'SJ', color:'#EF4135', points:5100, level:'intermedio', exercises:41, lastSeen:'Ayer',       time:'7h 20m', course:'A2', role:'alumno' },
];

/* Lista de todos los usuarios del sistema (para panel director) */
let SYSTEM_USERS = [
  ...MOCK_STUDENTS.map(s => ({ ...s, email: s.name.toLowerCase().replace(' ','.')+  '@centro.es', username: s.initials.toLowerCase() })),
  { name:'Profesor Demo', initials:'PD', color:'#1a70c1', role:'profesor', email:'profesor@test.com', username:'pdemo', points:0, level:'—', exercises:0, lastSeen:'—', time:'—', course:'—' },
];

let COURSES = [
  {
    id:'a1', title:'Francés A1 Básico', level:'A1', badge:'badge-a1',
    desc:'Vocabulario esencial, saludos y presentaciones',
    activities:[
      { id:'a1-act1', title:'Saludos y presentaciones', icon:'bi-hand-wave-fill', subtitle:'Aprende a saludar y presentarte en francés', deadline:'', maxTime:0,
        exercises:[
          { type:'test', question:'¿Cómo se dice "Buenos días" en francés?', options:['Bonjour','Bonsoir','Bonne nuit','Au revoir'], correct:0 },
          { type:'fill', question:'Completa: Je m\'appelle _____ (Yo me llamo María)', hint:'prénom féminin', correct:'Maria' },
          { type:'test', question:'¿Qué significa "Comment t\'appelles-tu ?"', options:['¿Cómo estás?','¿Cuántos años tienes?','¿Cómo te llamas?','¿De dónde eres?'], correct:2 },
          { type:'fill', question:'Traduce: "Encantado de conocerte" → _____ de te rencontrer', hint:'', correct:'Enchanté' },
        ]
      },
      { id:'a1-act2', title:'Los números del 1 al 20', icon:'bi-123', subtitle:'Domina los primeros números en francés', deadline:'', maxTime:0,
        exercises:[
          { type:'test', question:'¿Cómo se dice "5" en francés?', options:['Quatre','Cinq','Six','Sept'], correct:1 },
          { type:'fill', question:'Escribe en francés el número 12: _____', hint:'', correct:'Douze' },
          { type:'test', question:'¿Cuánto es "dix + sept" en español?', options:['15','16','17','18'], correct:2 },
        ]
      },
      { id:'a1-act3', title:'Los colores', icon:'bi-palette-fill', subtitle:'Aprende los colores básicos en francés', deadline:'', maxTime:0,
        exercises:[
          { type:'test', question:'¿Cómo se dice "rojo" en francés?', options:['Bleu','Vert','Rouge','Jaune'], correct:2 },
          { type:'fill', question:'Traduce "azul" al francés: _____', hint:'couleur du ciel', correct:'Bleu' },
          { type:'match', question:'Une cada color con su traducción', pairs:[['Rouge','Rojo'],['Bleu','Azul'],['Vert','Verde']] },
        ]
      },
    ]
  },
  {
    id:'a2', title:'Francés A2 Elemental', level:'A2', badge:'badge-a2',
    desc:'Conversación básica, verbos y rutinas diarias',
    activities:[
      { id:'a2-act1', title:'Verbos esenciales: être y avoir', icon:'bi-lightning-fill', subtitle:'Los dos verbos más importantes del francés', deadline:'', maxTime:10,
        exercises:[
          { type:'test', question:'"Je _____ étudiant" — ¿qué verbo usar?', options:['ai','suis','est','sont'], correct:1 },
          { type:'fill', question:'Completa: Nous _____ deux chiens', hint:'forme de avoir', correct:'avons' },
          { type:'test', question:'¿Cuál es la traducción de "Ils sont français"?', options:['Ellos tienen francés','Ellos son franceses','Ellas están en Francia','Nosotros somos franceses'], correct:1 },
        ]
      },
      { id:'a2-act2', title:'La vida cotidiana', icon:'bi-house-fill', subtitle:'Vocabulario de actividades diarias', deadline:'', maxTime:0,
        exercises:[
          { type:'test', question:'¿Qué significa "Je mange à midi"?', options:['Como a medianoche','Ceno a las doce','Como al mediodía','Desayuno a las doce'], correct:2 },
          { type:'fill', question:'Traduce: "Voy al trabajo" → Je vais au _____', hint:'lieu de travail', correct:'travail' },
        ]
      },
    ]
  },
  {
    id:'b1', title:'Francés B1 Intermedio', level:'B1', badge:'badge-b1',
    desc:'Expresión oral, cultura francesa y gramática avanzada',
    activities:[
      { id:'b1-act1', title:'El pasado: Passé Composé', icon:'bi-clock-history', subtitle:'Habla de eventos pasados con fluidez', deadline:'', maxTime:15,
        exercises:[
          { type:'test', question:'"J\'ai mangé une pomme" está en:', options:['Presente','Futuro','Passé composé','Imparfait'], correct:2 },
          { type:'fill', question:'Forma el passé composé de parler (yo): J\'_____ parlé', hint:'auxiliaire avoir', correct:'ai' },
          { type:'match', question:'Une el infinitivo con su participio pasado', pairs:[['parler','parlé'],['finir','fini'],['être','été']] },
        ]
      },
    ]
  },
];

/* ─── STATE ─── */
const state = {
  currentUser: null, selectedRole: 'alumno',
  isImpersonating: false, savedProfePanel: null,
  score: 0, exercisesDone: 0, activitiesDone: 0,
  correctAnswers: 0, totalAnswers: 0, currentLevel: 'basico',
  currentCourseId: null, currentActivityId: null,
  currentExerciseIndex: 0, exerciseSessionScore: 0,
  exerciseAnswered: false, completedActivities: new Set(),
  activityTimer: null, activityTimeLeft: 0,
  sessionStart: null, sessionTimerInterval: null,
  editorActivityId: null, editorCourseId: null,
  editingCourseId: null, editingActivityId: null, editingExerciseIndex: null,
  courseNotes: {},
  /* match exercise state */
  matchSelected: null,
  matchPairs: [],
  matchMatched: new Set(),
};

/* ─── AUTH ─── */
function selectRole(role) {
  state.selectedRole = role;
  ['alumno','profesor','director'].forEach(r => {
    document.getElementById('role-'+r)?.classList.toggle('active', r === role);
  });
}

function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-password').value.trim();
  if (!email || !pass) { showLoginError('Por favor completa todos los campos.'); return; }

  let user = MOCK_USERS.find(u => u.email === email && u.password === pass);
  if (!user) {
    if (email.includes('@') && pass.length >= 4) {
      user = { email, password:pass, name:email.split('@')[0], role:state.selectedRole };
    } else {
      showLoginError('Credenciales incorrectas.');
      return;
    }
  }
  /* El role del mock tiene prioridad sobre el selector, excepto para usuarios genéricos */
  if (MOCK_USERS.find(u => u.email === email)) {
    state.currentUser = { ...user }; // mantiene role del mock
  } else {
    state.currentUser = { ...user, role: state.selectedRole };
  }

  if (document.getElementById('remember-me').checked) {
    try { localStorage.setItem('lf_session', JSON.stringify({ email, role: state.currentUser.role })); } catch(e) {}
  }
  document.getElementById('login-error').classList.add('d-none');
  enterApp();
}

function showLoginError(msg) {
  const el = document.getElementById('login-error');
  el.textContent = msg;
  el.classList.remove('d-none');
}

function doLogout() {
  clearActivityTimer();
  clearInterval(state.sessionTimerInterval);
  try { localStorage.removeItem('lf_session'); } catch(e) {}
  Object.assign(state, {
    currentUser:null, score:0, exercisesDone:0, activitiesDone:0,
    correctAnswers:0, totalAnswers:0, completedActivities:new Set(),
    isImpersonating:false, courseNotes:{},
  });
  showScreen('screen-login');
  document.getElementById('login-email').value    = '';
  document.getElementById('login-password').value = '';
}

function enterApp() {
  const user = state.currentUser;
  document.getElementById('nav-avatar').textContent   = user.name.substring(0,2).toUpperCase();
  document.getElementById('nav-username').textContent = user.name;
  const pill = document.getElementById('nav-role-pill');

  ['sidebar-alumno','sidebar-profesor','sidebar-director'].forEach(id => {
    document.getElementById(id).style.display = 'none';
  });

  if (user.role === 'alumno') {
    pill.textContent = 'Alumno';
    pill.className   = 'user-role-pill';
    document.getElementById('sidebar-alumno').style.display = '';
    buildCourses(); updateDashboard(); showPanel('dashboard'); startSessionTimer();
  } else if (user.role === 'profesor') {
    pill.textContent = 'Profesor';
    pill.className   = 'user-role-pill profesor';
    document.getElementById('sidebar-profesor').style.display = '';
    buildProfeDashboard(); buildStudents(); buildProfeCourses(); buildProfeLeaderboard();
    populateEditorFilter(); renderActivityEditor(); showPanel('profe-dashboard');
  } else if (user.role === 'director') {
    pill.textContent = 'Director';
    pill.className   = 'user-role-pill director';
    document.getElementById('sidebar-director').style.display = '';
    buildDirectorUsers(); showPanel('director-dashboard');
  }
  seedChat();
  showScreen('screen-app');
}

/* ─── IMPERSONATION ─── */
function startImpersonation() {
  state.isImpersonating = true;
  document.getElementById('teacher-impersonation-mode').classList.add('visible');
  document.getElementById('sidebar-profesor').style.display = 'none';
  document.getElementById('sidebar-alumno').style.display   = '';
  const pill = document.getElementById('nav-role-pill');
  pill.textContent = 'Vista Alumno';
  pill.className   = 'user-role-pill';
  buildCourses(); updateDashboard(); showPanel('dashboard');
}

function exitImpersonation() {
  state.isImpersonating = false;
  document.getElementById('teacher-impersonation-mode').classList.remove('visible');
  document.getElementById('sidebar-alumno').style.display   = 'none';
  document.getElementById('sidebar-profesor').style.display = '';
  const pill = document.getElementById('nav-role-pill');
  pill.textContent = 'Profesor';
  pill.className   = 'user-role-pill profesor';
  showPanel('profe-dashboard');
}

/* ─── SCREEN / PANEL NAV ─── */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function showPanel(id) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.sidebar-item').forEach(b => b.classList.remove('active'));
  const map = {
    'dashboard':'Inicio','courses':'Cursos','leaderboard':'Leaderboard',
    'progress':'Mi progreso','messages':'Mensajes','settings':'Configuración',
    'profe-dashboard':'Inicio','profe-students':'Alumnos',
    'profe-leaderboard':'Leaderboard','profe-courses':'Cursos',
    'activity-editor':'Editor actividades',
    'director-dashboard':'Panel Director','director-users':'Usuarios',
  };
  const label = map[id];
  if (label) {
    document.querySelectorAll('.sidebar-item').forEach(b => {
      if (b.textContent.trim().startsWith(label)) b.classList.add('active');
    });
  }
  if (id === 'leaderboard')       buildLeaderboard('leaderboard-content', false);
  if (id === 'profe-leaderboard') buildLeaderboard('profe-leaderboard-content', true);
  if (id === 'progress')          buildProgressCourseList();
}

/* ─── TIMERS ─── */
function startSessionTimer() {
  state.sessionStart = Date.now();
  clearInterval(state.sessionTimerInterval);
  state.sessionTimerInterval = setInterval(() => {
    const mins = Math.floor((Date.now() - state.sessionStart) / 60000);
    const el = document.getElementById('prog-session-time');
    if (el) el.textContent = mins < 1 ? 'Menos de 1 min' : `${mins} min`;
  }, 10000);
}

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
      showToastAlert('⏰ ¡Tiempo agotado!', 'warning');
      setTimeout(() => showPanel('activity-container'), 2000);
    }
  }, 1000);
}

function clearActivityTimer() {
  clearInterval(state.activityTimer);
  document.getElementById('global-timer').classList.remove('visible','urgent');
  document.getElementById('timer-val').textContent = '00:00';
}

function showToastAlert(msg, type) {
  const t = document.getElementById('feedback-toast');
  t.querySelector('#toast-icon').textContent    = type === 'warning' ? '⏰' : 'ℹ️';
  t.querySelector('#toast-msg').textContent     = msg;
  t.querySelector('#toast-points').textContent  = '';
  t.className = 'feedback-toast show';
  setTimeout(() => t.classList.remove('show'), 3500);
}

/* ─── DASHBOARD ─── */
function updateDashboard() {
  const acc = state.totalAnswers > 0
    ? Math.round((state.correctAnswers / state.totalAnswers) * 100) + '%' : '—';

  document.getElementById('user-score').textContent           = state.score.toLocaleString();
  document.getElementById('dash-exercises-done').textContent  = state.exercisesDone;
  document.getElementById('dash-activities-done').textContent = state.activitiesDone;
  document.getElementById('dash-accuracy').textContent        = acc;
  document.getElementById('prog-score').textContent           = state.score.toLocaleString();
  const progAcc = document.getElementById('prog-accuracy');
  if (progAcc) progAcc.textContent = acc;

  const lvl = getLevelData();
  state.currentLevel = lvl.id;
  document.getElementById('level-indicator').textContent      = lvl.label;
  document.getElementById('prog-level').textContent           = lvl.label;
  document.getElementById('level-desc').textContent           = lvl.desc;
  document.getElementById('level-icon').textContent           = lvl.icon;
  document.getElementById('level-card').className             = 'level-card mb-4 ' + lvl.class;

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

/* ─── COURSES ─── */
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

/* ─── ACTIVITIES ─── */
function buildActivityList(course) {
  const isTeacher = state.currentUser.role === 'profesor' && !state.isImpersonating;
  document.getElementById('activity-list').innerHTML = course.activities.map((act, i) => {
    const done      = state.completedActivities.has(act.id);
    const statusCls = done ? 'status-done' : 'status-pending';
    const statusTxt = done ? '✓ Completada' : 'Pendiente';
    const deadline  = act.deadline ? `<span class="activity-deadline"><i class="bi bi-calendar3 me-1"></i>Límite: ${act.deadline}</span>` : '';
    const timerBadge= act.maxTime  ? `<span class="activity-timer-badge"><i class="bi bi-stopwatch me-1"></i>${act.maxTime} min</span>` : '';
    const teacherBtns = isTeacher ? `
      <div class="activity-teacher-actions ms-2">
        <button class="btn btn-sm btn-outline-primary" style="border-radius:6px;font-size:.75rem;" onclick="event.stopPropagation();editActivity('${course.id}','${act.id}')"><i class="bi bi-pencil"></i></button>
        <button class="btn-danger-custom" style="padding:.3rem .55rem;font-size:.72rem;" onclick="event.stopPropagation();deleteActivity('${course.id}','${act.id}')"><i class="bi bi-trash"></i></button>
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
  state.currentCourseId      = courseId;
  state.currentActivityId    = activityId;
  state.exerciseSessionScore = 0;
  state.currentExerciseIndex = 0;
  if (activity.maxTime > 0) startActivityTimer(activity.maxTime);
  document.getElementById('exercise-back-btn').onclick = () => { clearActivityTimer(); showPanel('activity-container'); };
  loadExercise(activity, 0);
  showPanel('exercise-panel');
}

/* ─── SCORING ─── */
function applyPoints(pts) {
  const prevLevel = getLevelData().id;
  state.score += pts;
  state.exerciseSessionScore += pts;
  state.exercisesDone++;
  document.getElementById('ex-points-live').textContent = state.exerciseSessionScore;
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

/* ─── EXERCISE ENGINE ─── */
function loadExercise(activity, index) {
  state.exerciseAnswered = false;
  const ex    = activity.exercises[index];
  const total = activity.exercises.length;
  const pct   = Math.round((index / total) * 100);
  document.getElementById('ex-counter').textContent       = `Ejercicio ${index+1}/${total}`;
  document.getElementById('ex-progress-fill').style.width = pct + '%';
  const card = document.getElementById('exercise-list');

  if (ex.type === 'test') {
    const letters = ['A','B','C','D'];
    const opts = ex.options.map((o, i) => `
      <button class="option-btn" onclick="checkTest(${i}, ${ex.correct}, '${activity.id}', ${index})">
        <span class="option-letter">${letters[i]}</span>${o}
      </button>`).join('');
    card.innerHTML = `<span class="exercise-type-badge">Opción múltiple</span>
      <div class="exercise-question">${ex.question}</div>
      <div>${opts}</div><div id="ex-feedback" class="mt-3"></div>`;

  } else if (ex.type === 'fill') {
    card.innerHTML = `<span class="exercise-type-badge">Rellena el hueco</span>
      <div class="exercise-question">${ex.question}</div>
      <div class="fill-blank-wrap mt-2">
        <input class="fill-input" id="fill-input" type="text" placeholder="${ex.hint || 'Tu respuesta…'}" autocomplete="off"/>
        <button class="btn-check" id="fill-btn" onclick="checkFill('${ex.correct}','${activity.id}',${index})">Comprobar →</button>
      </div><div id="ex-feedback" class="mt-3"></div>`;
    document.getElementById('fill-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') document.getElementById('fill-btn').click();
    });

  } else if (ex.type === 'match') {
    loadMatchExercise(ex, activity, index);

  } else if (ex.type === 'image') {
    card.innerHTML = `<span class="exercise-type-badge">Actividad con imagen</span>
      <div class="exercise-question">${ex.question}</div>
      <img src="${ex.imageUrl || ''}" alt="Imagen del ejercicio" class="image-exercise-img"/>
      <div class="fill-blank-wrap mt-2">
        <input class="fill-input" id="fill-input" type="text" placeholder="${ex.hint || 'Tu respuesta…'}" autocomplete="off"/>
        <button class="btn-check" id="fill-btn" onclick="checkFill('${ex.correct}','${activity.id}',${index})">Comprobar →</button>
      </div><div id="ex-feedback" class="mt-3"></div>`;
    document.getElementById('fill-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') document.getElementById('fill-btn').click();
    });
  }
}

/* ─── MATCH EXERCISE ENGINE ─── */
function loadMatchExercise(ex, activity, index) {
  const card = document.getElementById('exercise-list');
  state.matchPairs   = [...ex.pairs];
  state.matchMatched = new Set();
  state.matchSelected = null;

  const shuffledRight = [...ex.pairs.map(p => p[1])].sort(() => Math.random() - .5);

  const leftHTML  = ex.pairs.map((p, i) => `<div class="match-item" id="ml-${i}" onclick="selectMatch('left',${i})">${p[0]}</div>`).join('');
  const rightHTML = shuffledRight.map((val, i) => {
    const origIdx = ex.pairs.findIndex(p => p[1] === val);
    return `<div class="match-item" id="mr-${origIdx}" data-val="${val}" onclick="selectMatch('right',${origIdx})">${val}</div>`;
  }).join('');

  card.innerHTML = `<span class="exercise-type-badge">Unir elementos</span>
    <div class="exercise-question">${ex.question}</div>
    <div class="match-exercise-wrap">
      <div class="match-col" id="match-left">${leftHTML}</div>
      <div class="match-col" id="match-right">${rightHTML}</div>
    </div>
    <div id="ex-feedback" class="mt-3"></div>`;

  card._matchActivity = activity;
  card._matchIndex    = index;
}

function selectMatch(side, idx) {
  if (state.matchMatched.has(idx)) return;
  const el = document.getElementById(side === 'left' ? `ml-${idx}` : `mr-${idx}`);
  if (el.classList.contains('matched')) return;

  if (!state.matchSelected) {
    state.matchSelected = { side, idx };
    el.classList.add('selected');
    return;
  }

  const prev = state.matchSelected;
  if (prev.side === side) {
    // Deselect previous, select new
    document.getElementById(prev.side === 'left' ? `ml-${prev.idx}` : `mr-${prev.idx}`).classList.remove('selected');
    state.matchSelected = { side, idx };
    el.classList.add('selected');
    return;
  }

  // Try to match
  const leftIdx  = prev.side === 'left' ? prev.idx : idx;
  const rightIdx = prev.side === 'right'? prev.idx : idx;
  const prevEl   = document.getElementById(prev.side === 'left' ? `ml-${prev.idx}` : `mr-${prev.idx}`);
  prevEl.classList.remove('selected');
  state.matchSelected = null;

  const isCorrect = state.matchPairs[leftIdx][1] === state.matchPairs[rightIdx][1];
  if (isCorrect) {
    document.getElementById(`ml-${leftIdx}`).classList.add('matched');
    document.getElementById(`mr-${rightIdx}`).classList.add('matched');
    state.matchMatched.add(leftIdx);
    state.totalAnswers++;
    state.correctAnswers++;
    applyPoints(100);
    if (state.matchMatched.size === state.matchPairs.length) {
      showFeedback(true, 0);
      const card = document.getElementById('exercise-list');
      scheduleNextExercise(card._matchActivity.id, card._matchIndex);
    }
  } else {
    document.getElementById(`ml-${leftIdx}`).classList.add('wrong');
    document.getElementById(`mr-${rightIdx}`).classList.add('wrong');
    state.totalAnswers++;
    applyPoints(20);
    showFeedback(false, 20);
    setTimeout(() => {
      document.getElementById(`ml-${leftIdx}`)?.classList.remove('wrong');
      document.getElementById(`mr-${rightIdx}`)?.classList.remove('wrong');
    }, 600);
  }
}

/* ─── CHECK ANSWERS ─── */
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
  applyPoints(pts);
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
  applyPoints(pts);
  showFeedback(isCorrect, pts);
  scheduleNextExercise(actId, exIndex);
}

function showFeedback(isCorrect, pts) {
  const t = document.getElementById('feedback-toast');
  const msgs = isCorrect
    ? ['¡Perfecto! 🔥','¡Excelente! ⭐','¡Correcto! 💪','¡Brillante! ✨']
    : ['¡Casi! Sigue intentándolo 💪','¡Muy cerca! No te rindas 🎯','¡Buen intento! 📚'];
  t.querySelector('#toast-msg').textContent    = msgs[Math.floor(Math.random()*msgs.length)];
  t.querySelector('#toast-points').textContent = pts > 0 ? `+${pts} pts` : '';
  t.querySelector('#toast-icon').textContent   = isCorrect ? '🎉' : '💡';
  t.className = `feedback-toast show ${isCorrect ? 'toast-correct' : 'toast-wrong'}`;
  setTimeout(() => t.classList.remove('show'), 2500);
}

function scheduleNextExercise(actId, exIndex) {
  const course   = COURSES.find(c => c.id === state.currentCourseId);
  const activity = course.activities.find(a => a.id === actId);
  setTimeout(() => {
    const nextIdx = exIndex + 1;
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
  document.getElementById('complete-icon').textContent   = '🎉';
  document.getElementById('complete-points').textContent = `+${state.exerciseSessionScore} puntos`;
  document.getElementById('complete-sub').textContent    = `Has completado "${activity.title}"`;
  const accEl = document.getElementById('complete-accuracy');
  if (state.totalAnswers > 0) {
    const acc = Math.round((state.correctAnswers / state.totalAnswers) * 100);
    accEl.textContent = `Acierto en esta actividad: ${acc}%`;
    accEl.style.display = 'inline-block';
  } else {
    accEl.style.display = 'none';
  }
  showPanel('activity-complete-panel');
}

/* ─── LEVEL UP ─── */
function showLevelUp(levelId) {
  const lvl = LEVELS.find(l => l.id === levelId);
  document.getElementById('levelup-icon').textContent  = lvl.icon;
  document.getElementById('levelup-title').textContent = `¡Nivel ${lvl.label} desbloqueado!`;
  document.getElementById('levelup-sub').textContent   = lvl.desc;
  document.getElementById('levelup-overlay').style.display = 'flex';
}
function closeLevelUp() { document.getElementById('levelup-overlay').style.display = 'none'; }

/* ─── PROGRESS ─── */
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

/* ─── LEADERBOARD (PODIO VISUAL) ─────────────────────────────
   - Solo alumnos (role === 'alumno' implícito en MOCK_STUDENTS)
   - Si profe en impersonación no debe aparecer (isImpersonating)
   - 1° = 👑 corona; 2° = 🥈; 3° = 🥉
   - Resto: lista con tarjetas hover
─────────────────────────────────────────────────────────────── */
function buildLeaderboard(containerId, isTeacherView) {
  const levelLabels = { basico:'Básico', intermedio:'Intermedio', avanzado:'Avanzado' };
  const levelCls    = { basico:'lb-level-basico', intermedio:'lb-level-intermedio', avanzado:'lb-level-avanzado' };
  const podiumColors= { rank:['#ffd60a','#94a3b8','#ffb703'] };

  /* Solo alumnos. Si profe está en impersonación, no incluirlo. */
  let students = [...MOCK_STUDENTS].sort((a,b) => b.points - a.points);

  /* Añadir usuario actual si es alumno real y tiene puntos */
  const u = state.currentUser;
  if (u && u.role === 'alumno' && state.score > 0 && !MOCK_STUDENTS.find(s => s.name === u.name)) {
    students.push({ name:u.name, initials:u.name.substring(0,2).toUpperCase(), color:'#1a70c1', points:state.score, level:state.currentLevel, role:'alumno' });
    students.sort((a,b) => b.points - a.points);
  }

  const crownIcons = ['👑','🥈','🥉'];
  const podiumOrder = [1, 0, 2]; // visual: 2º izq, 1º centro, 3º der
  const top3 = students.slice(0, 3);

  /* Generar podio en orden visual */
  const podiumSlots = podiumOrder.map(visIdx => {
    const s = top3[visIdx];
    if (!s) return `<div class="lb-podium-slot rank-${visIdx+1}" style="opacity:.3;"></div>`;
    const rank = visIdx + 1;
    return `<div class="lb-podium-slot rank-${rank}">
      <span class="lb-podium-crown">${crownIcons[visIdx]}</span>
      <div class="lb-podium-avatar" style="background:${s.color}">${s.initials}</div>
      <div class="lb-podium-name">${s.name}</div>
      <div class="lb-podium-pts">${s.points.toLocaleString()} pts</div>
      <span class="lb-list-level ${levelCls[s.level] || 'lb-level-basico'}">${levelLabels[s.level] || s.level}</span>
    </div>`;
  });

  /* Lista del resto */
  const restHTML = students.slice(3).map((s, i) => {
    const rank = i + 4;
    return `<div class="lb-list-item">
      <span class="lb-list-rank">${rank}</span>
      <div class="lb-list-avatar" style="background:${s.color}">${s.initials}</div>
      <span class="lb-list-name">${s.name}</span>
      <span class="lb-list-level ${levelCls[s.level] || 'lb-level-basico'}">${levelLabels[s.level] || s.level}</span>
      <span class="lb-list-pts">${s.points.toLocaleString()} pts</span>
    </div>`;
  }).join('');

  document.getElementById(containerId).innerHTML = `
    <div class="lb-podium-wrap">
      ${podiumSlots[0]}
      ${podiumSlots[1]}
      ${podiumSlots[2]}
    </div>
    <div class="lb-list-wrap">${restHTML}</div>`;
}

/* ─── MESSAGING ─── */
function seedChat() {
  const msgs = document.getElementById('chat-messages');
  msgs.innerHTML = '';
  const isProf = state.currentUser.role === 'profesor' && !state.isImpersonating;
  document.getElementById('chat-partner-name').textContent = isProf ? 'Chat con alumnos' : 'Mensaje de tu profesor';
  const seed = isProf
    ? [{ sent:false, text:'Profesor, tengo dudas con el passé composé 🙁', time:'10:12' },
       { sent:true,  text:'¡Hola Ana! Claro, repasemos juntos. ¿Qué parte no entiendes?', time:'10:14' }]
    : [{ sent:false, text:'¡Hola! Recuerda practicar los verbos hoy 💪', time:'09:00' },
       { sent:true,  text:'¡Gracias! Acabo de completar "être y avoir" 🎉', time:'09:05' },
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
  const replies = ['¡Buen punto! 👍','Recuerda practicar todos los días 🔥','¡Excellente! ⭐','¿Tienes dudas con algún ejercicio?','¡Ya casi llegas al siguiente nivel! 🚀'];
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

/* ─── SETTINGS ─── */
function toggleDarkMode(on) {
  document.body.classList.toggle('dark-mode', on);
  try { localStorage.setItem('lf_darkmode', on ? '1' : '0'); } catch(e) {}
}

function changePassword() {
  const current  = document.getElementById('settings-pass-current').value.trim();
  const newPass  = document.getElementById('settings-pass-new').value.trim();
  const confirm  = document.getElementById('settings-pass-confirm').value.trim();
  const msgEl    = document.getElementById('settings-pass-msg');

  const showMsg = (txt, ok) => {
    msgEl.textContent = txt;
    msgEl.className   = `mb-3 alert py-2 px-3 ${ok ? 'alert-success' : 'alert-danger'}`;
    msgEl.classList.remove('d-none');
    setTimeout(() => msgEl.classList.add('d-none'), 4000);
  };

  if (!current || !newPass || !confirm) return showMsg('Rellena todos los campos.', false);
  if (newPass.length < 8)               return showMsg('La nueva contraseña debe tener al menos 8 caracteres.', false);
  if (newPass !== confirm)              return showMsg('Las contraseñas nuevas no coinciden.', false);
  /* Aquí iría la llamada al backend */
  showMsg('✓ Contraseña actualizada correctamente (demo local).', true);
  document.getElementById('settings-pass-current').value = '';
  document.getElementById('settings-pass-new').value     = '';
  document.getElementById('settings-pass-confirm').value = '';
}

/* ─── PROFESOR PANELS ─── */
function buildProfeDashboard() {
  const tbody = document.getElementById('profe-metrics-table');
  const levelLabels = { basico:'Básico', intermedio:'Intermedio', avanzado:'Avanzado' };
  const sorted = [...MOCK_STUDENTS].sort((a,b) => b.points - a.points);
  tbody.innerHTML = sorted.map(s => {
    const pct   = s.level === 'avanzado' ? 100 : s.level === 'intermedio' ? Math.round((s.points-2000)/60) : Math.round(s.points/20);
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
      <td style="min-width:100px;"><div class="prog-bar-wrap"><div class="prog-bar-fill" style="width:${clamp}%"></div></div>
        <div style="font-size:.7rem;color:var(--text-muted);margin-top:.2rem;">${clamp}%</div></td>
    </tr>`;
  }).join('');

  document.getElementById('profe-recent-activity').innerHTML = [
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
        <div class="student-meta">Última conexión: ${s.lastSeen} · Tiempo: ${s.time} · Ejercicios: ${s.exercises}</div>
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
          <button class="btn btn-sm btn-outline-secondary" style="border-radius:8px;font-size:.8rem;" onclick="openCourse('${c.id}')"><i class="bi bi-eye me-1"></i>Ver</button>
          <button class="btn btn-sm btn-outline-danger" style="border-radius:8px;font-size:.8rem;" onclick="deleteCourse('${c.id}')"><i class="bi bi-trash"></i></button>
        </div>
      </div>
    </div>`).join('');
}

function buildProfeLeaderboard() { buildLeaderboard('profe-leaderboard-content', true); }

/* ─── COURSE MANAGER ─── */
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
    COURSES.push({ id:'c'+Date.now(), title, level, badge:badgeMap[level], desc, activities:[] });
  }
  closeModal('modal-course');
  buildProfeCourses(); populateEditorFilter(); renderActivityEditor();
}
function deleteCourse(id) {
  if (!confirm('¿Eliminar este curso y todas sus actividades?')) return;
  COURSES = COURSES.filter(c => c.id !== id);
  buildProfeCourses(); populateEditorFilter(); renderActivityEditor();
}

/* ─── ACTIVITY EDITOR ─── */
function populateEditorFilter() {
  const sel = document.getElementById('editor-course-filter');
  const val = sel.value;
  sel.innerHTML = '<option value="">Todos los cursos</option>' +
    COURSES.map(c => `<option value="${c.id}">${c.title}</option>`).join('');
  sel.value = COURSES.find(c => c.id === val) ? val : '';
}

function renderActivityEditor() {
  const filter  = document.getElementById('editor-course-filter').value;
  const courses = filter ? COURSES.filter(c => c.id === filter) : COURSES;
  let html = '';
  courses.forEach(course => {
    html += `<div class="editor-card mb-3">
      <div class="d-flex align-items-center justify-content-between mb-2">
        <h6 class="mb-0">${course.title}</h6>
        <button class="btn-primary-custom" style="font-size:.78rem;padding:.3rem .7rem;" onclick="openActivityModal('${course.id}')"><i class="bi bi-plus-lg me-1"></i>Actividad</button>
      </div>`;
    if (course.activities.length === 0) {
      html += `<div style="font-size:.85rem;color:var(--text-muted);padding:.5rem 0;">Sin actividades todavía.</div>`;
    } else {
      course.activities.forEach((act, idx) => {
        html += `<div class="exercise-editor-item">
          <span class="drag-handle"><i class="bi bi-grip-vertical"></i></span>
          <div>
            <div class="ex-preview">${idx+1}. ${act.title}</div>
            <div style="font-size:.75rem;color:var(--text-muted);margin-top:.1rem;">${act.exercises.length} ejercicios${act.maxTime ? ` · ${act.maxTime} min` : ''}${act.deadline ? ` · Límite: ${act.deadline}` : ''}</div>
          </div>
          <div style="margin-left:auto;display:flex;gap:.4rem;align-items:center;">
            <button class="btn btn-sm btn-outline-primary" style="border-radius:6px;font-size:.72rem;" onclick="openActivityModal('${course.id}','${act.id}')"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-sm btn-outline-success" style="border-radius:6px;font-size:.72rem;" onclick="openExerciseModal('${course.id}','${act.id}')"><i class="bi bi-plus-lg"></i> Ejercicio</button>
            <button class="btn btn-sm btn-outline-danger" style="border-radius:6px;font-size:.72rem;" onclick="deleteActivity('${course.id}','${act.id}')"><i class="bi bi-trash"></i></button>
          </div>
        </div>`;
        act.exercises.forEach((ex, ei) => {
          const typeLabel = { test:'test', fill:'hueco', match:'unir', image:'imagen' };
          html += `<div style="margin-left:1.5rem;margin-bottom:.25rem;background:var(--bg);border:1px dashed var(--border);border-radius:6px;padding:.45rem .75rem;display:flex;align-items:center;gap:.75rem;font-size:.8rem;">
            <span style="color:var(--text-muted);">${ei+1}.</span>
            <span style="flex:1;">${ex.question.substring(0,60)}${ex.question.length>60?'…':''}</span>
            <span class="ex-type-tag">${typeLabel[ex.type] || ex.type}</span>
            <button class="btn btn-sm btn-outline-secondary" style="border-radius:4px;font-size:.7rem;padding:.15rem .4rem;" onclick="deleteExercise('${course.id}','${act.id}',${ei})"><i class="bi bi-x"></i></button>
          </div>`;
        });
      });
    }
    html += `</div>`;
  });
  document.getElementById('activity-editor-list').innerHTML = html || '<p style="color:var(--text-muted);font-size:.88rem;">No hay cursos. Crea uno desde Gestión de Cursos.</p>';
}

/* ─── ACTIVITY MODAL ─── */
function openActivityModal(courseId, actId) {
  state.editingActivityId = actId || null;
  state.editorCourseId    = courseId || null;
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
    const act = course.activities.find(a => a.id === state.editingActivityId);
    act.title=title; act.subtitle=subtitle; act.deadline=deadline; act.maxTime=maxTime;
  } else {
    course.activities.push({ id:'act-'+Date.now(), title, subtitle, icon:'bi-book-fill', deadline, maxTime, exercises:[] });
  }
  closeModal('modal-activity');
  buildProfeCourses(); renderActivityEditor();
}
function editActivity(courseId, actId) { openActivityModal(courseId, actId); }
function deleteActivity(courseId, actId) {
  if (!confirm('¿Eliminar esta actividad y todos sus ejercicios?')) return;
  const course = COURSES.find(c => c.id === courseId);
  course.activities = course.activities.filter(a => a.id !== actId);
  buildProfeCourses(); renderActivityEditor();
  if (state.currentCourseId === courseId) buildActivityList(course);
}

/* ─── EXERCISE MODAL (4 tipos) ─── */
function setExerciseTab(type) {
  document.getElementById('me-type').value = type;
  ['test','fill','match','image'].forEach(t => {
    document.getElementById(`tab-${t}`).classList.toggle('active', t === type);
    document.getElementById(`me-${t}-fields`).style.display = t === type ? '' : 'none';
  });
}

function addMatchPair() {
  const container = document.getElementById('me-match-pairs');
  const row = document.createElement('div');
  row.className = 'match-pair-row';
  row.innerHTML = `<input type="text" class="form-control form-control-sm" placeholder="Concepto"/><span class="match-arrow">↔</span><input type="text" class="form-control form-control-sm" placeholder="Definición"/>`;
  container.appendChild(row);
}

function previewImage() {
  const url  = document.getElementById('me-image-url').value.trim();
  const wrap = document.getElementById('me-image-preview-wrap');
  const img  = document.getElementById('me-image-preview');
  if (url) { img.src = url; wrap.style.display = ''; }
  else { wrap.style.display = 'none'; }
}

function openExerciseModal(courseId, actId, exerciseIndex) {
  state.editorCourseId       = courseId;
  state.editorActivityId     = actId;
  state.editingExerciseIndex = exerciseIndex !== undefined ? exerciseIndex : null;

  if (exerciseIndex !== undefined) {
    const course = COURSES.find(c => c.id === courseId);
    const act    = course.activities.find(a => a.id === actId);
    const ex     = act.exercises[exerciseIndex];
    setExerciseTab(ex.type);
    document.getElementById('me-question').value = ex.question;
    if (ex.type === 'test') {
      ex.options.forEach((o,i) => { const el = document.getElementById('me-opt'+i); if(el) el.value=o; });
      document.querySelectorAll('input[name="me-correct"]').forEach(r => r.checked = (parseInt(r.value) === ex.correct));
    } else if (ex.type === 'fill') {
      document.getElementById('me-fill-correct').value = ex.correct;
      document.getElementById('me-fill-hint').value    = ex.hint || '';
    } else if (ex.type === 'match') {
      const container = document.getElementById('me-match-pairs');
      container.innerHTML = '';
      ex.pairs.forEach(([left, right]) => {
        const row = document.createElement('div');
        row.className = 'match-pair-row';
        row.innerHTML = `<input type="text" class="form-control form-control-sm" value="${left}" placeholder="Concepto"/><span class="match-arrow">↔</span><input type="text" class="form-control form-control-sm" value="${right}" placeholder="Definición"/>`;
        container.appendChild(row);
      });
    } else if (ex.type === 'image') {
      document.getElementById('me-image-url').value     = ex.imageUrl || '';
      document.getElementById('me-image-correct').value = ex.correct;
      document.getElementById('me-image-hint').value    = ex.hint || '';
      previewImage();
    }
    document.getElementById('modal-exercise-title').textContent = 'Editar Ejercicio';
  } else {
    setExerciseTab('test');
    document.getElementById('me-question').value = '';
    ['me-opt0','me-opt1','me-opt2','me-opt3'].forEach(id => { const el = document.getElementById(id); if(el) el.value=''; });
    document.querySelector('input[name="me-correct"][value="0"]').checked = true;
    document.getElementById('me-fill-correct').value = '';
    document.getElementById('me-fill-hint').value    = '';
    document.getElementById('me-image-url').value    = '';
    document.getElementById('me-image-correct').value= '';
    document.getElementById('me-image-hint').value   = '';
    document.getElementById('me-image-preview-wrap').style.display = 'none';
    document.getElementById('me-match-pairs').innerHTML = `
      <div class="match-pair-row"><input type="text" class="form-control form-control-sm" placeholder="Concepto"/><span class="match-arrow">↔</span><input type="text" class="form-control form-control-sm" placeholder="Definición"/></div>
      <div class="match-pair-row"><input type="text" class="form-control form-control-sm" placeholder="Concepto"/><span class="match-arrow">↔</span><input type="text" class="form-control form-control-sm" placeholder="Definición"/></div>`;
    document.getElementById('modal-exercise-title').textContent = 'Nuevo Ejercicio';
  }
  openModal('modal-exercise');
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
    exercise = { type:'test', question, options:opts, correct };

  } else if (type === 'fill') {
    const correctAns = document.getElementById('me-fill-correct').value.trim();
    const hint       = document.getElementById('me-fill-hint').value.trim();
    if (!correctAns) { alert('Escribe la respuesta correcta.'); return; }
    exercise = { type:'fill', question, correct:correctAns, hint };

  } else if (type === 'match') {
    const rows = document.getElementById('me-match-pairs').querySelectorAll('.match-pair-row');
    const pairs = [];
    rows.forEach(row => {
      const inputs = row.querySelectorAll('input');
      const left   = inputs[0].value.trim();
      const right  = inputs[1].value.trim();
      if (left && right) pairs.push([left, right]);
    });
    if (pairs.length < 2) { alert('Añade al menos 2 pares completos.'); return; }
    exercise = { type:'match', question, pairs };

  } else if (type === 'image') {
    const imageUrl   = document.getElementById('me-image-url').value.trim();
    const correctAns = document.getElementById('me-image-correct').value.trim();
    const hint       = document.getElementById('me-image-hint').value.trim();
    if (!correctAns) { alert('Escribe la respuesta correcta.'); return; }
    exercise = { type:'image', question, imageUrl, correct:correctAns, hint };
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

/* ─── DIRECTOR ─── */
function buildDirectorUsers() {
  const el = document.getElementById('director-users-list');
  if (!el) return;
  el.innerHTML = SYSTEM_USERS.map(u => `
    <div class="director-user-row">
      <div class="student-avatar" style="background:${u.color || '#64748b'}">${u.initials || u.name.substring(0,2).toUpperCase()}</div>
      <div style="flex:1;">
        <div style="font-weight:600;">${u.name}</div>
        <div style="font-size:.78rem;color:var(--text-muted);">${u.email} · @${u.username || '—'}</div>
      </div>
      <span class="dir-role-badge dir-role-${u.role || 'alumno'}">${u.role === 'profesor' ? 'Profesor' : 'Alumno'}</span>
      <span style="font-size:.82rem;color:var(--text-muted);margin-left:.75rem;">${(u.points || 0).toLocaleString()} pts</span>
    </div>`).join('');
}

function openCreateUserModal() {
  ['cu-nombre','cu-apellidos','cu-email','cu-username','cu-password'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('cu-rol').value = 'alumno';
  document.getElementById('cu-msg').classList.add('d-none');
  generatePassword();
  openModal('modal-create-user');
}

function generateUsername() {
  const nombre    = document.getElementById('cu-nombre').value.trim().toLowerCase().replace(/\s+/g,'');
  const apellidos = document.getElementById('cu-apellidos').value.trim().toLowerCase().split(' ');
  if (!nombre && !apellidos[0]) return;
  let base = nombre + (apellidos[0] || '');
  base = base.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'');
  // Comprobar duplicados y añadir número si ya existe
  let username = base;
  let counter  = 1;
  while (SYSTEM_USERS.find(u => u.username === username)) {
    username = base + counter++;
  }
  document.getElementById('cu-username').value = username;
}

function generatePassword() {
  const chars   = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789!@#$%';
  const length  = 10;
  let password  = '';
  for (let i = 0; i < length; i++) password += chars[Math.floor(Math.random() * chars.length)];
  document.getElementById('cu-password').value = password;
}

function createUser() {
  const nombre    = document.getElementById('cu-nombre').value.trim();
  const apellidos = document.getElementById('cu-apellidos').value.trim();
  const email     = document.getElementById('cu-email').value.trim();
  const rol       = document.getElementById('cu-rol').value;
  const username  = document.getElementById('cu-username').value.trim();
  const password  = document.getElementById('cu-password').value.trim();
  const msgEl     = document.getElementById('cu-msg');

  const showMsg = (txt, ok) => {
    msgEl.textContent = txt;
    msgEl.className   = `mb-2 alert py-2 px-3 ${ok ? 'alert-success' : 'alert-danger'}`;
    msgEl.classList.remove('d-none');
  };

  if (!nombre || !email || !username || !password) return showMsg('Rellena nombre, email y genera username/contraseña.', false);
  if (!email.includes('@')) return showMsg('Email inválido.', false);

  /* En producción: llamada al backend. Aquí simulamos. */
  const newUser = {
    name: `${nombre} ${apellidos}`.trim(),
    initials: (nombre[0]+(apellidos[0]||'')).toUpperCase(),
    color: '#1a70c1',
    role: rol, email, username, password,
    points:0, level:'basico', exercises:0, lastSeen:'Nunca', time:'0h', course:'—',
  };
  SYSTEM_USERS.push(newUser);
  buildDirectorUsers();
  showMsg(`✓ Usuario @${username} creado correctamente (demo local).`, true);
  setTimeout(() => closeModal('modal-create-user'), 2000);
}

/* ─── MODALES ─── */
function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
document.querySelectorAll('.modal-overlay').forEach(o => {
  o.addEventListener('click', e => { if (e.target === o) o.classList.remove('open'); });
});

/* ─── INIT ─── */
(function init() {
  // Mensaje motivacional rotativo
  setInterval(() => {
    const el = document.getElementById('motivational-msg');
    if (!el) return;
    const m = MOTIVATIONAL_MSGS[Math.floor(Math.random() * MOTIVATIONAL_MSGS.length)];
    document.getElementById('motivational-banner').querySelector('.msg-icon').textContent = m.icon;
    el.textContent = m.msg;
  }, 10000);

  // Restaurar sesión
  try {
    const saved = localStorage.getItem('lf_session');
    if (saved) {
      const { email, role } = JSON.parse(saved);
      document.getElementById('login-email').value = email;
      selectRole(role);
    }
    const savedNotes = localStorage.getItem('lf_notes');
    if (savedNotes) state.courseNotes = JSON.parse(savedNotes);
    const dark = localStorage.getItem('lf_darkmode');
    if (dark === '1') {
      document.body.classList.add('dark-mode');
      const toggle = document.getElementById('dark-mode-toggle');
      if (toggle) toggle.checked = true;
    }
  } catch(e) {}
})();