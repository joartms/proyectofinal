const header = document.querySelector('.header');

// Escuchamos el evento de scroll en la ventana
window.addEventListener('scroll', () => {
  // Verificamos si el scroll vertical es mayor a 50 píxeles
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});