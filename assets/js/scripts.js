/**bdd marcos
 */
const productos = [
    { id: 1, nombre: "Marco metálico redondo c/ capa Clarity", categoria: "metalico", img: "assets/img/metalico1.jpeg" },
    { id: 2, nombre: "Marco metálico simple Angelo Falcony 1", categoria: "metalico", img: "assets/img/metalico3af.jpg" },
    { id: 3, nombre: "Marco metálico simple Angelo Falcony 2", categoria: "metalico", img: "assets/img/metalico3af2.jpg" },
    { id: 4, nombre: "Marco metálico c/ capa mujer Clarity", categoria: "metalico", img: "assets/img/metalico4.jpeg" },
    { id: 5, nombre: "Marco Acetato Clarity", categoria: "acetato", img: "assets/img/acetato1.jpeg" },
    { id: 6, nombre: "Marco Acetato doble capa Vigo", categoria: "acetato", img: "assets/img/acetato4.jpeg" },
    { id: 7, nombre: "Marco Acetato 4 capas Clarity", categoria: "acetato", img: "assets/img/acetato5.jpeg" },
    { id: 8, nombre: "Marco Acetato c/ capa Vigo", categoria: "acetato", img: "assets/img/acetato6.jpeg" },
];

let carrito = JSON.parse(localStorage.getItem('cart')) || [];

function cargarHome() {
    const contMetal = document.getElementById('contenedor-metalicos');
    const contAcetato = document.getElementById('contenedor-acetato');
    if (!contMetal) return;

    productos.forEach(prod => {
        const html = `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 shadow">
                    <img src="${prod.img}" class="card-img-top product-img" alt="${prod.nombre}">
                    <div class="card-body text-center">
                        <h5>${prod.nombre}</h5>
                        <p class="text-primary small">Antireflejo Incluido</p>
                        <a href="detalle.html?id=${prod.id}" class="btn btn-dark w-100">Seleccionar</a>
                    </div>
                </div>
            </div>`;
        prod.categoria === "metalico" ? contMetal.innerHTML += html : contAcetato.innerHTML += html;
    });
    actualizarContador();
}

function cargarDetalle() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const prod = productos.find(p => p.id == id);
    const contenedor = document.getElementById('detalle-producto');

    if (prod && contenedor) {
        contenedor.innerHTML = `
            <div class="col-md-5 mb-4"><img src="${prod.img}" class="img-fluid rounded shadow"></div>
            <div class="col-md-7">
                <h2>${prod.nombre}</h2>
                <div class="graduacion-box shadow">
                    <h6>Graduación Ojo Derecho (OD)</h6>
                    <div class="row g-2 mb-3">
                        <div class="col-6"><input type="number" id="od_sph" class="form-control" placeholder="SPH" value="0"></div>
                        <div class="col-6"><input type="number" id="od_cyl" class="form-control" placeholder="CYL" value="0"></div>
                    </div>
                    <h6>Graduación Ojo Izquierdo (OI)</h6>
                    <div class="row g-2 mb-3">
                        <div class="col-6"><input type="number" id="oi_sph" class="form-control" placeholder="SPH" value="0"></div>
                        <div class="col-6"><input type="number" id="oi_cyl" class="form-control" placeholder="CYL" value="0"></div>
                    </div>
                    <select class="form-select mb-3" id="mat">
                        <option value="Orgánico">Orgánico (Base)</option>
                        <option value="Policarbonato">Policarbonato (+$40.000)</option>
                    </select>
                    <div class="form-check"><input class="form-check-input" type="checkbox" id="azul"><label>Filtro Azul (+$15.000)</label></div>
                    <div class="form-check mb-3"><input class="form-check-input" type="checkbox" id="foto"><label>Fotocromático (+$20.000)</label></div>
                    <button class="btn btn-danger w-100" onclick="agregarAlCarrito(${prod.id})">Añadir al Carrito</button>
                </div>
            </div>`;
    }
}

function agregarAlCarrito(id) {
    const prod = productos.find(p => p.id == id);
    let precio = 50000;

    const graduaciones = [
        Math.abs(parseFloat(document.getElementById('od_sph').value)),
        Math.abs(parseFloat(document.getElementById('od_cyl').value)),
        Math.abs(parseFloat(document.getElementById('oi_sph').value)),
        Math.abs(parseFloat(document.getElementById('oi_cyl').value))
    ];

    graduaciones.forEach(v => { if(v > 4) precio += (v - 4) * 10000; });
    if (document.getElementById('mat').value === "Policarbonato") precio += 40000;
    if (document.getElementById('azul').checked) precio += 15000;
    if (document.getElementById('foto').checked) precio += 20000;

    carrito.push({ nombre: prod.nombre, precio: precio });
    localStorage.setItem('cart', JSON.stringify(carrito));
    window.location.href = "carrito.html";
}

function mostrarCarrito() {
    const lista = document.getElementById('lista-carrito');
    const totalTxt = document.getElementById('total-carrito');
    if (!lista) return;
    let total = 0;
    carrito.forEach(item => {
        total += item.precio;
        lista.innerHTML += `<div class="list-group-item d-flex justify-content-between">
            <span>${item.nombre}</span><b>$${item.precio.toLocaleString()}</b>
        </div>`;
    });
    totalTxt.innerText = `$${total.toLocaleString()}`;
}

function actualizarContador() {
    const badge = document.getElementById('cart-count');
    if (badge) badge.innerText = carrito.length;
}

function limpiarCarrito() {
    localStorage.removeItem('cart');
    location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
    cargarHome();
    cargarDetalle();
    mostrarCarrito();
});