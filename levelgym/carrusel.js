let startX;
let currentX;
let isDragging = false;
let initialTranslateX = -60;  // Establecemos el desplazamiento inicial hacia la izquierda
const carrusel = document.querySelector('.carrusel');

// Aplicar la posición inicial de translateX al cargar la página
carrusel.style.transform = `translateX(${initialTranslateX}px)`;

// Detectar el toque al inicio
carrusel.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
  // Guardamos la posición actual de la traducción para calcular el movimiento
  initialTranslateX = getTranslateX();
  carrusel.style.transition = 'none';  // Desactivamos la transición mientras se arrastra
});

// Detectar el movimiento del toque
carrusel.addEventListener('touchmove', (e) => {
  if (!isDragging) return;

  currentX = e.touches[0].clientX;
  const moveX = startX - currentX;

  // Calcular el nuevo valor de translateX y aplicarlo al carrusel
  const newTranslateX = initialTranslateX - moveX;
  carrusel.style.transform = `translateX(${newTranslateX}px)`;
});

// Terminar el desplazamiento táctil
carrusel.addEventListener('touchend', () => {
  isDragging = false;
  carrusel.style.transition = 'transform 0.3s ease';  // Reactivamos la transición

  // Asegurarse de que el carrusel no se desplace más allá del contenido
  const totalWidth = carrusel.scrollWidth;  // Ancho total del contenido
  const visibleWidth = carrusel.clientWidth;  // Ancho visible del contenedor
  const maxTranslate = totalWidth - visibleWidth;  // El límite del movimiento

  let currentTranslate = getTranslateX();

  // Limitar el movimiento hacia la izquierda
  if (currentTranslate > 0) {
    carrusel.style.transform = `translateX(0px)`;
  } 
  // Limitar el movimiento hacia la derecha
  else if (currentTranslate < -maxTranslate) {
    carrusel.style.transform = `translateX(-${maxTranslate}px)`;
  }
});

// Función para obtener la posición actual de translateX
function getTranslateX() {
  const matrix = window.getComputedStyle(carrusel).transform;
  const values = matrix.split('(')[1].split(')')[0].split(',');
  return parseInt(values[4]) || 0;  // Devuelve el valor de translateX (valor desplazado horizontalmente)
}
