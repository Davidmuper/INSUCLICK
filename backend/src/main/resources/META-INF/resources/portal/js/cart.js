/* =============================================
   cart.js — Módulo de carrito InsuClick
   Persistencia en localStorage, eventos globales
============================================= */

const Cart = (() => {

  const KEY = 'insuclick_cart';

  /* ---------- Utilidades ---------- */

  function getItems() {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  }

  function saveItems(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    _dispatch();
  }

  // Evento personalizado para que la navbar/badge reaccione
  function _dispatch() {
    window.dispatchEvent(new CustomEvent('cart:updated', { detail: { count: totalUnits() } }));
  }

  /* ---------- API pública ---------- */

  // Agregar o sumar cantidad
  function add(producto, cantidad = 1) {
    const items = getItems();
    const idx   = items.findIndex(i => i.id === producto.id);
    if (idx > -1) {
      items[idx].cantidad = Math.min(items[idx].cantidad + cantidad, producto.stock);
    } else {
      items.push({
        id:       producto.id,
        nombre:   producto.nombre,
        precio:   producto.precio,
        imagen:   producto.imagen,
        stock:    producto.stock,
        cantidad: Math.min(cantidad, producto.stock)
      });
    }
    saveItems(items);
  }

  // Cambiar cantidad directamente
  function setQty(id, cantidad) {
    const items = getItems();
    const idx   = items.findIndex(i => i.id === id);
    if (idx === -1) return;
    if (cantidad <= 0) {
      items.splice(idx, 1);
    } else {
      items[idx].cantidad = Math.min(cantidad, items[idx].stock);
    }
    saveItems(items);
  }

  function remove(id) {
    saveItems(getItems().filter(i => i.id !== id));
  }

  function clear() {
    saveItems([]);
  }

  function list() {
    return getItems();
  }

  function totalUnits() {
    return getItems().reduce((s, i) => s + i.cantidad, 0);
  }

  function totalPrice() {
    return getItems().reduce((s, i) => s + i.precio * i.cantidad, 0);
  }

  function hasItem(id) {
    return getItems().some(i => i.id === id);
  }

  function getQty(id) {
    const item = getItems().find(i => i.id === id);
    return item ? item.cantidad : 0;
  }

  return { add, setQty, remove, clear, list, totalUnits, totalPrice, hasItem, getQty };

})();
