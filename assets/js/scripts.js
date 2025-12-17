// llamar al boton por su id
const botonIrArriba = document.getElementById('scroll-to-top');

// agregar fn al hacer click
function irArribaSuavemente() {
    // la fn usada desliza la pagina suavemente
    window.scrollTo({
        top: 0,                 // lleva la pagina al 0
        behavior: 'smooth'      // desplazamiento suave
    });
}

