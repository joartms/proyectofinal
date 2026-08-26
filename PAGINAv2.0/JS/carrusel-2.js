// Variable que almacena el 'pagina' (posición) de la imagen actual.
// Comienza en 0 porque el carrusel inicia mostrando la primera imagen.
let pagina = 0;

// Obtiene el contenedor que agrupa todas las imágenes del carrusel.
const contenedor = document.getElementById("contenedor-fotos");

// Busca todos los elementos con la clase "foto-n"
// y guarda cuántos hay en total.
const totalFotos = document.querySelectorAll(".foto-n").length;

const totalPaginas = totalFotos / 3;

function moverCarrusel() {
    // Mueve horizontalmente el contenedor de imágenes.
    // Si pagina = 0 → muestra la primera imagen.
    // Si pagina = 1 → desplaza 1290px y muestra la segunda.
    // Si pagina = 2 → desplaza 1290px y muestra la tercera.

    // Calculo el desplazamiento que debe realizar el Carrusel.
    const anchoFoto = window.innerWidth / 3;
    console.log(anchoFoto);
    const desplazamiento = anchoFoto * 3;

    contenedor.style.transform = `translateX(-${pagina * desplazamiento}px)`;
}

function siguientePagina() {

    // Se incrementa el 'pagina' en 1.
    pagina++;

    // Si 'pagina' supera la cantidad total, la misma se pone en 0, regresando a 'pagina' = 1 (principio).
    if (pagina >= (totalPaginas) ) {
        pagina = 0;
    }

    // Se actualiza el Carrusel.
    moverCarrusel();
}

function anteriorPagina() {

    pagina--;

    if (pagina < 0 ) {
        pagina = totalPaginas - 1;
    }

    // Se actualiza el Carrusel.
    moverCarrusel();
}

// Mueve el Carruel cada 4 segundos
setInterval(siguientePagina, 4000);