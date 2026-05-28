/* =============================================
   ui.js — Utilidades de interfaz InsuClick
   Toast, navbar dinámica, helpers
============================================= */

const UI = (() => {

  /* ---------- Toast / notificaciones ---------- */

  function toast(msg, type = 'success', duration = 3500) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    const el = document.createElement('div');
    el.className = `toast-ic ${type !== 'success' ? type : ''}`;
    el.innerHTML = `<span>${icons[type] || '📌'}</span> <span>${msg}</span>`;
    container.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transition = 'opacity .3s';
      setTimeout(() => el.remove(), 350);
    }, duration);
  }

  /* ---------- Navbar dinámica ---------- */

  function renderNavbar(activeSection = '') {
    const user = Auth.currentUser();

    const links = [
      { href: 'index.html',     label: 'Inicio',     key: 'home' },
      { href: 'productos.html', label: 'Productos',  key: 'products' },
      { href: 'contacto.html',  label: 'Contacto',   key: 'contact' },
      { href: 'fundadores.html',label: 'Fundadores', key: 'founders' },
    ];

    const navLinksHTML = links.map(l => `
      <li class="nav-item">
        <a class="nav-link ${activeSection === l.key ? 'active' : ''}" href="${l.href}">${l.label}</a>
      </li>
    `).join('');

    // Botón carrito con badge
    const cartCount = Cart.totalUnits();
    const cartBtn = `
      <li class="nav-item ms-lg-1">
        <a href="carrito.html" class="nav-cart-btn" id="nav-cart-btn"
           style="position:relative;display:flex;align-items:center;gap:8px;
                  background:${activeSection==='cart'?'#0057B8':'#EBF2FF'};
                  color:${activeSection==='cart'?'#fff':'#0057B8'};
                  border-radius:50px;padding:9px 18px;font-weight:700;
                  font-family:'Plus Jakarta Sans',sans-serif;font-size:.88rem;
                  text-decoration:none;transition:.2s ease;">
          🛒 Carrito
          <span id="cart-badge" style="
            background:${activeSection==='cart'?'rgba(255,255,255,.3)':'#0057B8'};
            color:${activeSection==='cart'?'#fff':'#fff'};
            border-radius:50px;min-width:22px;height:22px;
            display:${cartCount>0?'flex':'none'};
            align-items:center;justify-content:center;
            font-size:.75rem;font-weight:800;padding:0 6px;">${cartCount}</span>
        </a>
      </li>
    `;

    let authHTML;
    if (user) {
      const adminLink = user.rol === 'vendedor'
        ? `<li class="nav-item"><a class="nav-link ${activeSection === 'admin' ? 'active' : ''}" href="admin.html">📦 Mis Productos</a></li>`
        : '';
      authHTML = `
        ${adminLink}
        <li class="nav-item ms-lg-2">
          <div class="nav-user-info">
            <div class="nav-user-avatar">${Auth.initials(user.nombre)}</div>
            <span>${user.nombre.split(' ')[0]}</span>
            <button class="btn-logout" onclick="UI.doLogout()">Salir</button>
          </div>
        </li>
      `;
    } else {
      authHTML = `
        <li class="nav-item ms-lg-2">
          <a class="btn-nav-login nav-link" href="login.html">Iniciar Sesión</a>
        </li>
        <li class="nav-item ms-lg-1">
          <a class="btn-nav-register nav-link" href="registro.html">Registro Gratis</a>
        </li>
      `;
    }

    const nav = document.getElementById('main-navbar');
    if (!nav) return;
    nav.innerHTML = `
      <div class="container">
        <a class="navbar-brand" href="index.html">
          <img src="img/insuclick.png" alt="InsuClick" class="logo-img">
        </a>
        <button class="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto align-items-lg-center">
            ${navLinksHTML}
            ${cartBtn}
            ${authHTML}
          </ul>
        </div>
      </div>
    `;

    // Actualizar badge cuando cambie el carrito
    window.addEventListener('cart:updated', (e) => {
      const badge = document.getElementById('cart-badge');
      if (!badge) return;
      badge.textContent = e.detail.count;
      badge.style.display = e.detail.count > 0 ? 'flex' : 'none';
    });

    /* Sombra al hacer scroll */
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  /* ---------- Logout ---------- */

  function doLogout() {
    Auth.logout();
    toast('Sesión cerrada. ¡Hasta pronto!', 'info', 2000);
    setTimeout(() => window.location.href = 'index.html', 1200);
  }

  /* ---------- Validación de formularios ---------- */

  function validateField(input, rule) {
    const val = input.value.trim();
    let valid = true;
    let msg = '';

    if (rule.required && !val) {
      valid = false; msg = 'Este campo es obligatorio.';
    } else if (rule.minLen && val.length < rule.minLen) {
      valid = false; msg = `Mínimo ${rule.minLen} caracteres.`;
    } else if (rule.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      valid = false; msg = 'Correo electrónico inválido.';
    } else if (rule.tel && !/^[0-9]{7,15}$/.test(val.replace(/\s/g, ''))) {
      valid = false; msg = 'Teléfono inválido (solo dígitos).';
    } else if (rule.positive && (isNaN(val) || Number(val) <= 0)) {
      valid = false; msg = 'Debe ser un número mayor a cero.';
    }

    const errEl = input.nextElementSibling;
    if (errEl && errEl.classList.contains('form-error')) {
      errEl.textContent = msg;
    }
    input.classList.toggle('is-invalid', !valid);
    return valid;
  }

  return { toast, renderNavbar, doLogout, validateField };

})();
