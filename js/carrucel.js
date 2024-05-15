'use strict';

const grande = document.querySelector('.grande');
const punto = document.querySelectorAll('.punto');

let currentIndex = 0; // Variable para realizar un seguimiento de la diapositiva actual

if (grande) {
  // El elemento existe, puedes acceder a sus propiedades
  grande.style.property = 'valor';
} else {
  console.error('El elemento no se encontró en el DOM');
}

function moveCarousel(nextSlide) {
  currentIndex = nextSlide;
  const slideWidth = 25; // Ancho de cada diapositiva en porcentaje
  const translateXValue = currentIndex * -slideWidth;
  grande.style.transform = `translateX(${translateXValue}%)`;

  punto.forEach((cadaPunto, i) => {
    punto[i].classList.remove('activo');
  });

  punto[currentIndex].classList.add('activo');
}

function autoSlide() {
  // Mueve automáticamente al siguiente slide
  const nextSlideIndex = (currentIndex + 1) % punto.length;
  moveCarousel(nextSlideIndex);
}

// Agregar un temporizador para cambiar automáticamente las diapositivas cada X segundos
const interval = setInterval(autoSlide, 7500); // Cambia cada 7.5 segundos

// Detener la transición automática cuando el mouse está sobre el carrusel
grande.addEventListener('mouseEnter', () => {
  clearInterval(interval); // Detiene el intervalo
});

// Reanudar la transición automática cuando el mouse sale del carrusel
grande.addEventListener('mouseLeave', () => {
  interval = setInterval(autoSlide, 7500); // Vuelve a iniciar el intervalo
});

// Asignar un evento de clic a los puntos para cambiar manualmente las diapositivas
punto.forEach((cadaPunto, i) => {
  punto[i].addEventListener('click', () => {
    moveCarousel(i);
  });
});
