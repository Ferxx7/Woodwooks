async function cargarProductos() {
  try {
    const resp = await fetch('data/productos.json');
    window.todosProductos = await resp.json();
    renderProductos('todos');
  } catch (e) {
    console.error('Error cargando productos', e);
  }
}

function renderProductos(categoria) {
  const contenedor = document.getElementById('productos');
  contenedor.innerHTML = '';
  const productosFiltrados = categoria === 'todos'
    ? window.todosProductos
    : window.todosProductos.filter(p => p.categoria === categoria);

  productosFiltrados.forEach(p => {
    const div = document.createElement('div');
    div.className = 'producto';
    div.dataset.categoria = p.categoria;

    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <div class="producto-info">
        <h2>${p.nombre}</h2>
        <p>${p.descripcion}</p>
        <p><strong>Q${p.precio}</strong></p>
        <button class="btn-consultar">Consultar</button>
      </div>`;

    div.querySelector('.btn-consultar').addEventListener('click', () => {
      const nombre = encodeURIComponent(p.nombre);
      window.open(`https://wa.me/50254113908?text=Hola!%20Estoy%20interesado%20en%20${nombre}`, '_blank');
    });
    contenedor.appendChild(div);
  });
}

function filtrarProductos(categoria) {
  document.querySelectorAll('.filtros button').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  renderProductos(categoria);
}

window.addEventListener('DOMContentLoaded', cargarProductos);
window.filtrarProductos = filtrarProductos;
