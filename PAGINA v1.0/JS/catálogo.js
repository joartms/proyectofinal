// Variable que almacena el índice (posición) de la imagen actual.
// Comienza en 0 porque el carrusel inicia mostrando la primera imagen.
let index = 0;

// Obtiene el contenedor que agrupa todas las imágenes del carrusel.
const slides = document.getElementById("slides");

// Busca todos los elementos con la clase "slide"
// y guarda cuántos hay en total.
const totalSlides = document.querySelectorAll(".slide").length;

// Función encargada de mostrar la imagen correspondiente al índice actual.
function showSlide(){
    // Mueve horizontalmente el contenedor de imágenes.
    // Si index = 0 → muestra la primera imagen.
    // Si index = 1 → desplaza -100% y muestra la segunda.
    // Si index = 2 → desplaza -200% y muestra la tercera.
    slides.style.transform = `translateX(-${index * 100}%)`;
}

// Función que avanza a la siguiente imagen.
function nextSlide(){

    // Incrementa el índice en 1.
    index++;

    // Si se supera la última imagen...
    if(index >= totalSlides){
        // ...vuelve al principio del carrusel.
        index = 0;
    }

    // Actualiza la imagen mostrada.
    showSlide();
}

// Función que retrocede a la imagen anterior.
function prevSlide(){

    // Reduce el índice en 1.
    index--;

    // Si se intenta retroceder desde la primera imagen...
    if(index < 0){
        // ...salta a la última imagen.s
        index = totalSlides - 1;
    }
    // Actualiza la imagen mostrada.
        showSlide();
}

// Mueve automáticamente el carrusel cada 6 segundos.
setInterval(() => {
    // Ejecuta la función que avanza a la siguiente imagen.
    nextSlide();
}, 6000); // 6000 milisegundos = 6 segundos