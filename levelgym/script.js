let indiceActual = 0;  // Índice de la imagen actual
const slides = document.querySelectorAll('.mi-carrusel-item');  // Todos los items del carrusel
const totalSlides = slides.length;  // Total de imágenes

// Función para mover el carrusel
function moverCarrusel(paso) {
    indiceActual += paso;

    // Si llega al final o al principio, se reinicia el índice
    if (indiceActual >= totalSlides) {
        indiceActual = 0;
    } else if (indiceActual < 0) {
        indiceActual = totalSlides - 1;
    }

    actualizarCarrusel();
}

// Función para actualizar el carrusel (desplazar)
function actualizarCarrusel() {
    const nuevoValorDeTransform = -indiceActual * 100;  // Desplazamiento horizontal
    document.querySelector('.mi-carrusel').style.transform = `translateX(${nuevoValorDeTransform}%)`;
}

// Evento táctil para el deslizamiento en dispositivos móviles
let inicioX = 0;
let finX = 0;

document.querySelector('.mi-carrusel-contenedor').addEventListener('touchstart', function(e) {
    inicioX = e.changedTouches[0].screenX;
});

document.querySelector('.mi-carrusel-contenedor').addEventListener('touchend', function(e) {
    finX = e.changedTouches[0].screenX;

    if (inicioX > finX + 50) {
        moverCarrusel(1);  // Mover a la siguiente imagen
    } else if (inicioX < finX - 50) {
        moverCarrusel(-1);  // Mover a la anterior imagen
    }
});

// Inicialización del carrusel al cargar
actualizarCarrusel();
