
const Products = (() => {
    const API_URL = 'https://insuclick-backend.onrender.com/api/productos';

    let items = [];

    // Fotografías originales de la carpeta img
    const IMAGENES = {
        MED004: 'img/bata.png',
        MED003: 'img/desechables.png',
        MED002: 'img/tapabocas.png',
        MED001: 'img/Guantes.png',

        MED008: 'img/desechables.png',
        MED007: 'img/desechables.png',
        MED006: 'img/cura.png',
        MED005: 'img/gasas.png',

        MED012: 'img/desechables.png',
        MED011: 'img/desechables.png',
        MED010: 'img/jeringa.png',
        MED009: 'img/jeringa.png'
    };

    async function load() {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(
                `Error consultando productos: ${response.status}`
            );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error(
                'El backend no devolvió una lista de productos'
            );
        }

        items = data
            .map(p => ({
                id: Number(p.id),
                codigo: p.codigo || '',
                nombre: p.nombre || 'Producto sin nombre',
                categoria: p.categoria || 'Sin categoría',
                precio: Number(p.precio || 0),
                stock: Number(p.stock || 0),
                estado: p.estado || 'ACTIVO',
                idCategoria: p.idCategoria,
                idFundacion: p.idFundacion,
                descripcion: p.descripcion ||
                    'Producto médico disponible en InsuClick.',
                imagen: IMAGENES[p.codigo] || 'img/favicon.png'
            }))
            .filter(p => p.estado.toUpperCase() === 'ACTIVO');

        return items;
    }

    function getAll() {
        return [...items];
    }

    function list(filters = {}) {
        let result = getAll();

        if (filters.categoria) {
            result = result.filter(
                p => p.categoria === filters.categoria
            );
        }

        if (filters.search) {
            const q = filters.search.toLowerCase();

            result = result.filter(p =>
                p.nombre.toLowerCase().includes(q) ||
                p.descripcion.toLowerCase().includes(q) ||
                p.categoria.toLowerCase().includes(q) ||
                p.codigo.toLowerCase().includes(q)
            );
        }

        return result;
    }

    function getById(id) {
        return items.find(p => p.id === Number(id)) || null;
    }

    function categories() {
        return [
            ...new Set(items.map(p => p.categoria))
        ].sort();
    }

    function formatPrice(value) {
        return '$ ' + Number(value).toLocaleString('es-CO');
    }

    return {
        load,
        getAll,
        list,
        getById,
        categories,
        formatPrice
    };
})();
