const API_BASE = "http://192.168.150.185:8085/api";

async function doLogin() {
    const email    = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    // Captura el rol activo del selector de badges
    const rol      = document.querySelector('.role-badge.active')?.id?.replace('role-', '') || 'alumno';
    const errorDiv = document.getElementById('login-error');

    // Limpiamos errores previos antes de intentar el login
    errorDiv.classList.add('d-none');
    errorDiv.textContent = '';

    // Validación de campos vacíos
    if (!email || !password) {
        errorDiv.textContent = 'Por favor, rellena todos los campos.';
        errorDiv.classList.remove('d-none');
        return;
    }

    try {
        // Petición al servidor incluyendo el rol
        const usuario = await api.post('/auth/login', { 
            correo: email, 
            contrasena: password, 
            rol 
        });

        // Gestión de persistencia (Local vs Session Storage)[cite: 6]
        if (document.getElementById('remember-me').checked) {
            localStorage.setItem('usuario', JSON.stringify(usuario));
        } else {
            sessionStorage.setItem('usuario', JSON.stringify(usuario));
        }

        // Acceso a la aplicación si todo es correcto[cite: 6]
        enterApp(usuario);

    } catch (err) {
        // Si el servidor devuelve error, se muestra en el banner superior[cite: 6]
        errorDiv.textContent = err.message || 'Correo o contraseña incorrectos.';
        errorDiv.classList.remove('d-none');
    }
}

// ── REGISTRO ALUMNO ───────────────────────────

async function doRegister() {
    const nombre        = document.getElementById('reg-nombre').value.trim();
    const apellidos     = document.getElementById('reg-apellidos').value.trim();
    const correo        = document.getElementById('reg-correo').value.trim();
    const contrasena    = document.getElementById('reg-contrasena').value.trim();
    const confirmPass   = document.getElementById('reg-confirmar').value.trim();
    const msgDiv        = document.getElementById('reg-error');

    msgDiv.className = 'alert py-2 px-3';
    msgDiv.classList.add('d-none');

    // Validaciones
    if (!nombre || !apellidos || !correo || !contrasena) {
        showRegMsg('Por favor, rellena todos los campos.', 'danger');
        return;
    }
    if (contrasena !== confirmPass) {
        showRegMsg('Las contraseñas no coinciden.', 'danger');
        return;
    }
    if (contrasena.length < 4) {
        showRegMsg('La contraseña debe tener al menos 4 caracteres.', 'danger');
        return;
    }

    try {
        await api.post('/auth/registro', {
            nombre,
            apellidos,
            correo,
            contrasena,
            nombreUsuario: generarUsernameDesdeNombre(nombre, apellidos),
            rol: 'ALUMNO',
            nivel: 'A1',
            rango: 'Bronce'
        });

        showRegMsg('✅ Cuenta creada correctamente. Ya puedes iniciar sesión.', 'success');

        // Volver al login tras 1.5s
        setTimeout(() => toggleRegister(false), 1500);

    } catch (err) {
        showRegMsg(err.message || 'Error al crear la cuenta.', 'danger');
    }
}

function showRegMsg(msg, tipo) {
    const div = document.getElementById('reg-error');
    div.textContent = msg;
    div.className = `alert alert-${tipo} py-2 px-3`;
    div.style.fontSize = '.85rem';
    div.style.borderRadius = '8px';
    div.classList.remove('d-none');
}

// ── ALTERNAR LOGIN / REGISTRO ─────────────────

function toggleRegister(mostrar) {
    document.getElementById('login-form').style.display   = mostrar ? 'none'  : 'block';
    document.getElementById('register-form').style.display = mostrar ? 'block' : 'none';
}

// ── CERRAR SESIÓN ─────────────────────────────

function doLogout() {
    localStorage.removeItem('usuario');
    sessionStorage.removeItem('usuario');
    document.getElementById('screen-app').classList.remove('active');
    document.getElementById('screen-login').classList.add('active');
}

// ── ENTRAR A LA APP ───────────────────────────

function enterApp(usuario) {
    document.getElementById('screen-login').classList.remove('active');
    document.getElementById('screen-app').classList.add('active');

    // Navbar
    const iniciales = (usuario.nombre?.[0] || '') + (usuario.apellidos?.[0] || '');
    document.getElementById('nav-avatar').textContent   = iniciales.toUpperCase();
    document.getElementById('nav-username').textContent = usuario.nombre + ' ' + usuario.apellidos;

    const rolPill = document.getElementById('nav-role-pill');
    rolPill.textContent = usuario.rol.charAt(0) + usuario.rol.slice(1).toLowerCase();
    rolPill.className   = `user-role-pill ${usuario.rol.toLowerCase()}`;

    // Mostrar sidebar correcto
    document.getElementById('sidebar-alumno').style.display   = 'none';
    document.getElementById('sidebar-profesor').style.display = 'none';
    document.getElementById('sidebar-director').style.display = 'none';

    const rol = usuario.rol.toLowerCase();
    if (rol === 'alumno') {
        document.getElementById('sidebar-alumno').style.display = '';
        showPanel('dashboard');
        document.getElementById('dash-name').textContent = usuario.nombre;
    } else if (rol === 'profesor' || rol === 'director') {
        const sidebarId = rol === 'director' ? 'sidebar-director' : 'sidebar-profesor';
        document.getElementById(sidebarId).style.display = '';
        showPanel(rol === 'director' ? 'director-dashboard' : 'profe-dashboard');
    }
}

// ── UTILIDAD ──────────────────────────────────


// Recuperar sesión al cargar la página
(function recuperarSesion() {
    const raw = localStorage.getItem('usuario') || sessionStorage.getItem('usuario');
    if (raw) {
        try { enterApp(JSON.parse(raw)); } catch {}
    }
})();