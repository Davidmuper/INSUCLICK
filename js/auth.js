/* =============================================
   auth.js — Módulo de autenticación InsuClick
   Gestiona usuarios, sesión y rutas protegidas
============================================= */

const Auth = (() => {

  const USERS_KEY  = 'insuclick_users';
  const SESSION_KEY = 'insuclick_session';

  /* ---------- utilidades internas ---------- */

  function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function getSession() {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  }

  function saveSession(user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  }

  /* ---------- API pública ---------- */

  function register({ nombre, email, telefono, password, rol }) {
    const users = getUsers();
    if (users.find(u => u.email === email)) {
      return { ok: false, msg: 'El correo ya está registrado.' };
    }
    const newUser = {
      id: Date.now(),
      nombre,
      email,
      telefono,
      password,   // En producción usar hashing
      rol,        // 'comprador' | 'vendedor'
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    saveUsers(users);
    saveSession(newUser);
    return { ok: true, user: newUser };
  }

  function login({ email, password }) {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return { ok: false, msg: 'Correo o contraseña incorrectos.' };
    }
    saveSession(user);
    return { ok: true, user };
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
      window.location.href = redirectTo;
    }
  }

  /* Iniciales para el avatar */
  function initials(name = '') {
    return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  }

  return { register, login, logout, isLoggedIn, currentUser, requireAuth, initials };

})();
