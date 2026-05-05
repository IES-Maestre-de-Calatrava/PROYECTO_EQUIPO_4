// --- VARIABLES GLOBALES ---
const modal = document.getElementById("loginModal");
const loginForm = document.getElementById("loginForm");
const loginBtnSidebar = document.getElementById("loginBtn");
const themeToggle = document.getElementById("themeToggle");

// --- 1. LÓGICA DE PERSISTENCIA (AL CARGAR) ---
window.onload = () => {
    // Verificar sesión
    const sesionIniciada = localStorage.getItem("aulaSesion");
    if (sesionIniciada === "true") {
        modal.style.display = "none";
        loginBtnSidebar.innerHTML = '<i class="fas fa-sign-out-alt"></i> Cerrar Sesión';
    } else {
        modal.style.display = "block";
        document.querySelector(".close").style.display = "none"; // Obligatorio
    }

    // Verificar Modo Oscuro
    if (localStorage.getItem("darkTheme") === "true") {
        document.body.classList.add("dark-mode");
    }

    // Cargar progreso previo
    const savedProgress = localStorage.getItem("userProgress") || 0;
    updateProgress(savedProgress, localStorage.getItem("userLevel") || 'A1 Principiante');
};

// --- 2. INICIO DE SESIÓN ---
loginForm.onsubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById("emailInput").value;
    const recordar = document.getElementById("remember").checked;

    // Guardar estado
    localStorage.setItem("aulaSesion", "true");
    if (recordar) {
        localStorage.setItem("aulaEmail", email);
    }

    alert("¡Bienvenue! Acceso concedido.");
    location.reload();
};

// --- 3. CERRAR SESIÓN ---
loginBtnSidebar.onclick = () => {
    if (localStorage.getItem("aulaSesion") === "true") {
        localStorage.removeItem("aulaSesion");
        location.reload();
    } else {
        modal.style.display = "block";
    }
};

// --- 4. ACTUALIZAR PROGRESO ---
function updateProgress(val, levelName) {
    document.getElementById("bar").style.width = val + "%";
    document.getElementById("progressText").innerText = val + "% completado";
    document.getElementById("levelDisplay").innerText = levelName;
    localStorage.setItem("userProgress", val);
    localStorage.setItem("userLevel", levelName);
}

// --- 5. MODO OSCURO ---
themeToggle.onclick = () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkTheme", document.body.classList.contains("dark-mode"));
};

// --- 6. BUSCADOR ---
function filterTabs() {
    const input = document.getElementById("mainSearch").value.toUpperCase();
    const dropdown = document.getElementById("searchDropdown");
    const items = ["Nivel A1: Saludos", "Nivel A2: Compras", "Gramática: Verbos", "Cultura: París"];
    
    dropdown.innerHTML = "";
    if (!input) { dropdown.style.display = "none"; return; }

    const results = items.filter(i => i.toUpperCase().includes(input));
    if (results.length > 0) {
        dropdown.style.display = "block";
        results.forEach(res => {
            const a = document.createElement("a");
            a.textContent = res;
            a.onclick = () => alert("Navegando a: " + res);
            dropdown.appendChild(a);
        });
    } else {
        dropdown.style.display = "none";
    }
}

// Cerrar modal con la X (solo si ya inició sesión)
document.querySelector(".close").onclick = () => modal.style.display = "none";
