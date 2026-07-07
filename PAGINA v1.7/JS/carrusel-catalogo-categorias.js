const carousel = document.querySelector(".carrusel-catalogo"); // Obtiene el contenedor principal del carrusel (.carousel)
const slidesCatalogo = document.getElementById("slides-catalogo"); // Obtiene el contenedor que agrupa todas las tarjetas (.slides)

// Obtiene la primera tarjeta del carrusel
// Se usa como referencia para calcular el ancho real de una tarjeta
const slideCatalogo = document.querySelector(".slide-catalogo");

// Calcula el ancho total que ocupa una tarjeta:
// ancho propio + margen izquierdo + margen derecho
const slideCatalogoWidth =
    slideCatalogo.offsetWidth +
    parseInt(getComputedStyle(slideCatalogo).marginLeft) +
    parseInt(getComputedStyle(slideCatalogo).marginRight);

// Variable que almacena cuánto se desplazó el carrusel
// Comienza en 0 porque inicialmente no se movió
let offset = 0;

// Función que se ejecuta al presionar el botón "Siguiente"
function sigSlide(){

    // Espacio extra que se quiere dejar al final
    // para que el último producto no quede pegado al borde
    const paddingFinal = 0;

    // Calcula el desplazamiento máximo permitido:
    // ancho total del contenido
    // menos ancho visible del carrusel
    // más el espacio extra deseado
    const maxOffset =
        slidesCatalogo.scrollWidth - carousel.clientWidth + paddingFinal;

    // Avanza una tarjeta completa
    offset += slideCatalogoWidth;

    // Si se pasó del límite máximo,
    // lo ajusta al máximo permitido
    if(offset > maxOffset){
        offset = maxOffset;
    }

    // Aplica el desplazamiento horizontal
    // moviendo el contenedor de tarjetas hacia la izquierda
    slidesCatalogo.style.transform =
        `translateX(-${offset}px)`;
}

// Función que se ejecuta al presionar el botón "Anterior"
function antSlide(){

    // Retrocede una tarjeta completa
    offset -= slideCatalogoWidth;

    // Si intenta retroceder más allá del inicio,
    // vuelve a 0
    if(offset < 0){
        offset = 0;
    }

     // Aplica el nuevo desplazamiento
    slidesCatalogo.style.transform =
        `translateX(-${offset}px)`;
}