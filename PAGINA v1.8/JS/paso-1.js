const contenedorPagina1 = document.querySelector(".contenedor-items-pagina1");

const botonAtrasPagina1 = document.querySelector(".boton-atras-pagina1");
const botonSiguientePagina1 = document.querySelector(".boton-siguiente-pagina1");

const itemsPagina1 = document.querySelectorAll(".pagina-item");

let indice = 0;

// Ancho de un item + gap
const desplazo = 210;

// Cantidad de items visibles
const itemsVisibles = 3;

// Máxima posición permitida
const maxIndice = itemsPagina1.length - itemsVisibles;

function actualizarCarrusel2() {
    contenedorPagina1.style.transform = `translateX(-${indice * desplazo}px)`;

    botonAtrasPagina1.disabled = indice === 0;
    botonSiguientePagina1.disabled = indice === maxIndice;
}

botonSiguientePagina1.addEventListener("click", () => {
    if (indice < maxIndice) {
        indice++;
        actualizarCarrusel2();
    }
});

botonAtrasPagina1.addEventListener("click", () => {
    if (indice > 0) {
        indice--;
        actualizarCarrusel2();
    }
});

actualizarCarrusel2();