/* ====== OPCIONES DEL HEADER ====== */

/* Definición de los elementos de los li->a */
const sobrenosotros = document.getElementById("sobrenosotros");
const producto = document.getElementById("productos");
const contactos = document.getElementById("contactos");
const delicia = document.getElementById("delicia");

/* Definición de las secciones a mostrar durante el desplazamiento */
const seccionSobreNosotros = document.querySelector(".nuestra-historia");
const seccionProductos = document.querySelector(".contenedor-semiprincipal");
const footer = document.querySelector("footer");

sobrenosotros.addEventListener("click", () => {
    seccionSobreNosotros.scrollIntoView({
        behavior: "smooth" /* Esta linea es para suavizar el desplazamiento */
    });
});

producto.addEventListener("click", () => {
    seccionProductos.scrollIntoView({
        behavior: "smooth" /* Esta linea es para suavizar el desplazamiento */
    });
});

contactos.addEventListener("click", () => {
    footer.scrollIntoView({
        behavior: "smooth" /* Esta linea es para suavizar el desplazamiento */
    });
});

delicia.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth" /* Esta linea es para suavizar el desplazamiento */
  });
});




/* ====== BOTON PARA BAJAR ====== */

/* Definición del botón para bajar */
const botonBajar = document.getElementById('contenedor-flecha-bajar');

/* Definición de la seccion a mostrar durante el desplazamiento */
const seccionCarrusel = document.querySelector(".carrusel-no-interactivo");

botonBajar.addEventListener("click", () => {
    seccionCarrusel.scrollIntoView({
        behavior: "smooth" /* Esta linea es para suavizar el desplazamiento */
    });
});
