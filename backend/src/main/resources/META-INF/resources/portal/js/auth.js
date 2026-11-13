/* =============================================
   auth.js — Módulo de autenticación InsuClick
   Gestiona usuarios, sesión y rutas protegidas
============================================= */

const Auth = (() => {

  // Backend Java (Render) que valida usuarios contra Neon
  const API_URL     = 'https://insuclick-backend.onrender.com/api/auth';
  const SESSION_KEY = 'insuclick_session';

  // Limpieza: la versión anterior guardaba usuarios y contraseñas en el navegador
  localStorage.removeItem('insuclick_users');

  /* ---------- utilidades internas ---------- */

  // Envía JSON al backend y devuelve { ok, msg } o { ok, user }
  async function post(ruta, datos) {
    try {
      const resp = await fetch(API_URL + ruta, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });
      const json = await resp.json().catch(() => null);
      if (json && typeof json.ok === 'boolean') return json;
      if (resp.status >= 500) {
        return { ok: false, msg: 'El servidor tuvo un problema. Intenta de nuevo en unos minutos.' };
      }
      return { ok: false, msg: 'Datos inválidos. Revisa el formulario.' };
    } catch (e) {
      return { ok: false, msg: 'No se pudo conectar con el servidor. Intenta de nuevo en unos segundos.' };
    }
  }

  function getSession() {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  }

  function saveSession(user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  }

  /* ---------- API pública ---------- */

  // La sesión guarda solo { id, nombre, email, telefono, rol }: nunca la contraseña
  async function register({ nombre, email, telefono, password, rol }) {
    const result = await post('/registro', { nombre, email, telefono, password, rol });
    if (result.ok) saveSession(result.user);
    return result;
  }

  async function login({ email, password }) {
    const result = await post('/login', { email, password });
    if (result.ok) saveSession(result.user);
    return result;
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  function isLoggedIn() {
    return getSession() !== null;
  }

  function currentUser() {
    return getSession();
  }

  /* Redirige a login si no hay sesión */
  function requireAuth(redirectTo = 'login.html') {
    if (!isLoggedIn()) {
      // Recuerda la página pedida (ej. productos.html?cat=...) para volver tras el login
      sessionStorage.setItem('insuclick_volver', location.pathname.split('/').pop() + location.search);
      window.location.href = redirectTo;
    }
  }

  /* Página a la que va cada rol después de entrar */
  function destino(user) {
    if (user.rol === 'vendedor') return 'admin.html';
    const volver = sessionStorage.getItem('insuclick_volver') || '';
    sessionStorage.removeItem('insuclick_volver');
    return /^(productos|carrito)\.html/.test(volver) ? volver : 'productos.html';
  }

  /* Iniciales para el avatar */
  function initials(name = '') {
    return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  }

  return { register, login, logout, isLoggedIn, currentUser, requireAuth, destino, initials };

})();
