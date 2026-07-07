function mostrarPrecioPeso(){

    var contenedorPrecioPeso = document.getElementsByClassName("contenedor-precio-peso")[0];
    var contenedorPrecioUnidad = document.getElementsByClassName("contenedor-precio-unidad")[0];

    var botonPrecioPeso = document.getElementsByClassName("boton-peso")[0];
    var botonPrecioUnidad = document.getElementsByClassName("boton-unidad")[0];

    contenedorPrecioPeso.style.display = "flex";
    contenedorPrecioUnidad.style.display = "none";

    botonPrecioPeso.classList.add("boton-precio-activo");
    botonPrecioUnidad.classList.remove("boton-precio-activo");
}

function mostrarPrecioUnidad(){

    var contenedorPrecioPeso = document.getElementsByClassName("contenedor-precio-peso")[0];
    var contenedorPrecioUnidad = document.getElementsByClassName("contenedor-precio-unidad")[0];

    var botonPrecioPeso = document.getElementsByClassName("boton-peso")[0];
    var botonPrecioUnidad = document.getElementsByClassName("boton-unidad")[0];

    contenedorPrecioUnidad.style.display = "flex";
    contenedorPrecioPeso.style.display = "none";

    botonPrecioUnidad.classList.add("boton-precio-activo");
    botonPrecioPeso.classList.remove("boton-precio-activo");
}