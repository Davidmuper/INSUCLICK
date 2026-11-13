/* =============================================
   products.js — CRUD de productos InsuClick
   Gestiona productos con persistencia local
============================================= */

const Products = (() => {

  const KEY      = 'insuclick_products';
  const KEY_INIT = 'insuclick_products_init_v2'; // versión — cambiar para resetear

  /* ---------- Catálogo completo de ejemplo ---------- */
  const SAMPLE = [
    /* --- Desechables --- */
    {
      id: 1,
      nombre: 'Jeringas Desechables 5ml',
      categoria: 'Desechables',
      precio: 15000,
      stock: 200,
      descripcion: 'Jeringas estériles de 5ml y 10ml con aguja 21G. Caja x100 unidades. Material: polipropileno médico.',
      imagen: 'img/jeringa.png',
      vendedor: 'Demo'
    },
    {
      id: 2,
      nombre: 'Gasas Estériles 10x10cm',
      categoria: 'Desechables',
      precio: 18000,
      stock: 500,
      descripcion: 'Gasas tejidas estériles de 8 capas. Paquete x10 unidades. Aptas para curaciones y procedimientos quirúrgicos.',
      imagen: 'img/gasas.png',
      vendedor: 'Demo'
    },
    {
      id: 3,
      nombre: 'Apósitos Adhesivos',
      categoria: 'Desechables',
      precio: 22000,
      stock: 350,
      descripcion: 'Apósitos transparentes adhesivos impermeables. Caja x50 unidades. Tamaño 10x12cm. Hipoalergénicos.',
      imagen: 'img/Apositos.png',
      vendedor: 'Demo'
    },
    {
      id: 4,
      nombre: 'Curas / Curitas Surtidas',
      categoria: 'Desechables',
      precio: 12000,
      stock: 800,
      descripcion: 'Curas adhesivas surtidas en diferentes tamaños. Caja x100 unidades. Tela flexible y resistente al agua.',
      imagen: 'img/cura.png',
      vendedor: 'Demo'
    },
    /* --- Protección Médica --- */
    {
      id: 5,
      nombre: 'Guantes de Látex x100',
      categoria: 'Protección Médica',
      precio: 28000,
      stock: 150,
      descripcion: 'Guantes de examinación de látex sin polvo. Caja x100 unidades. Tallas S, M y L disponibles.',
      imagen: 'img/Guantes.png',
      vendedor: 'Demo'
    },
    {
      id: 6,
      nombre: 'Tapabocas N95',
      categoria: 'Protección Médica',
      precio: 32000,
      stock: 300,
      descripcion: 'Mascarilla N95 de alta filtración (≥95%). Con válvula de exhalación. Ajuste anatómico y cómodo.',
      imagen: 'img/tapabocas.png',
      vendedor: 'Demo'
    },
    {
      id: 7,
      nombre: 'Bata Médica Desechable',
      categoria: 'Protección Médica',
      precio: 25000,
      stock: 120,
      descripcion: 'Bata antifluido de un solo uso. Material SMS no tejido. Talla única. Cierre trasero con cintas.',
      imagen: 'img/bata.png',
      vendedor: 'Demo'
    },
    {
      id: 8,
      nombre: 'Careta Facial Protectora',
      categoria: 'Protección Médica',
      precio: 19500,
      stock: 90,
      descripcion: 'Careta de protección facial completa. Pantalla en PET antiempañante. Reutilizable. Ajuste a la cabeza.',
      imagen: 'img/Careta.png',
      vendedor: 'Demo'
    },
    {
      id: 9,
      nombre: 'Gafas de Protección',
      categoria: 'Protección Médica',
      precio: 24000,
      stock: 75,
      descripcion: 'Gafas de seguridad con lente policarbonato antiempañante. Ventilación lateral. Reutilizables y esterilizables.',
      imagen: 'img/Gafas.png',
      vendedor: 'Demo'
    },
    /* --- Equipos Médicos --- */
    {
      id: 10,
      nombre: 'Monitor de Signos Vitales',
      categoria: 'Equipos Médicos',
      precio: 1800000,
      stock: 8,
      descripcion: 'Monitor multiparámetros. Mide ECG, SpO₂, NIBP, temperatura y frecuencia respiratoria. Pantalla TFT 12".',
      imagen: 'img/monitorsignosvitales.png',
      vendedor: 'Demo'
    },
    {
      id: 11,
      nombre: 'Silla de Ruedas Plegable',
      categoria: 'Equipos Médicos',
      precio: 450000,
      stock: 12,
      descripcion: 'Silla de ruedas en aluminio ligero plegable. Capacidad 120kg. Reposapiés abatibles. Ancho asiento 45cm.',
      imagen: 'img/Silla.png',
      vendedor: 'Demo'
    },
    {
      id: 12,
      nombre: 'Ecógrafo Portátil',
      categoria: 'Equipos Médicos',
      precio: 8500000,
      stock: 3,
      descripcion: 'Ecógrafo portátil de ultrasonido diagnóstico. Pantalla 10" táctil. Frecuencia 2-15MHz. Batería 3 horas.',
      imagen: 'img/Ecografo.png',
      vendedor: 'Demo'
    },
    {
      id: 13,
      nombre: 'Equipo de Infusión IV',
      categoria: 'Equipos Médicos',
      precio: 95000,
      stock: 40,
      descripcion: 'Set completo de infusión intravenosa con filtro de 15μm. Cámara de goteo flexible. Longitud 150cm.',
      imagen: 'img/EquipodeInfusion.png',
      vendedor: 'Demo'
    },
    {
      id: 14,
      nombre: 'Luces de Examinación LED',
      categoria: 'Equipos Médicos',
      precio: 320000,
      stock: 15,
      descripcion: 'Lámpara LED de examinación clínica. 50.000 lux. Temperatura de color 4300K. Brazo articulado 5 puntos.',
      imagen: 'img/Luces.png',
      vendedor: 'Demo'
    },
    /* --- Instrumental --- */
    {
      id: 15,
      nombre: 'Termómetro Digital IR',
      categoria: 'Instrumental',
      precio: 45000,
      stock: 60,
      descripcion: 'Termómetro infrarrojo sin contacto. Respuesta en 1 segundo. Rango 32-42.9°C. Memoria 32 lecturas.',
      imagen: 'img/Termometro.png',
      vendedor: 'Demo'
    },
    {
      id: 16,
      nombre: 'Kit de Cirugía Básico',
      categoria: 'Instrumental',
      precio: 185000,
      stock: 25,
      descripcion: 'Kit instrumental quirúrgico en acero inoxidable: bisturí, pinzas, tijeras, porta agujas y clamp. Estuche incluido.',
      imagen: 'img/KitCirujia.png',
      vendedor: 'Demo'
    },
    {
      id: 17,
      nombre: 'Microscopio Clínico',
      categoria: 'Instrumental',
      precio: 2200000,
      stock: 5,
      descripcion: 'Microscopio binocular de laboratorio clínico. Aumento 40x-1000x. Iluminación LED. Platina mecánica doble.',
      imagen: 'img/Microscopio.png',
      vendedor: 'Demo'
    },
  ];

  /* ---------- utilidades ---------- */

  function getAll() {
    // Si no está inicializado con v2, reinicializar con SAMPLE completo
    if (!localStorage.getItem(KEY_INIT)) {
      saveAll(SAMPLE);
      localStorage.setItem(KEY_INIT, '1');
      return [...SAMPLE];
    }
    const stored = localStorage.getItem(KEY);
    return stored ? JSON.parse(stored) : [...SAMPLE];
  }

  function saveAll(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
  }

  function nextId(items) {
    return items.length ? Math.max(...items.map(p => p.id)) + 1 : 1;
  }

  /* ---------- CRUD ---------- */

  function list(filters = {}) {
    let items = getAll();
    if (filters.categoria) {
      items = items.filter(p => p.categoria === filters.categoria);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      items = items.filter(p =>
        p.nombre.toLowerCase().includes(q) ||
        p.descripcion.toLowerCase().includes(q) ||
        p.categoria.toLowerCase().includes(q)
      );
    }
    return items;
  }

  function getById(id) {
    return getAll().find(p => p.id === Number(id)) || null;
  }

  function create(data) {
    const items = getAll();
    const newProduct = { id: nextId(items), ...data, createdAt: new Date().toISOString() };
    items.push(newProduct);
    saveAll(items);
    return newProduct;
  }

  function update(id, data) {
    const items = getAll();
    const idx = items.findIndex(p => p.id === Number(id));
    if (idx === -1) return null;
    items[idx] = { ...items[idx], ...data };
    saveAll(items);
    return items[idx];
  }

  function remove(id) {
    saveAll(getAll().filter(p => p.id !== Number(id)));
  }

  function categories() {
    return [...new Set(getAll().map(p => p.categoria))].sort();
  }

  function formatPrice(n) {
    return '$ ' + Number(n).toLocaleString('es-CO');
  }

  return { list, getById, create, update, remove, categories, formatPrice };

})();
