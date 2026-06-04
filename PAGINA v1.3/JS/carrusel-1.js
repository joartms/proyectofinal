const contenedorProductos = document.querySelector(".contenedor-productos"); /* busca la class .contenedor productos para darselo a la variable contenedorProductos/ */
const botonIzquierdo = document.querySelector(".boton-izquierdo"); /* busca la class .boton-izquierdo para darselo a la variable botonIzquierdo*/
const botonDerecho = document.querySelector(".boton-derecho"); /* busca la class .boton-derecho para darselo a la variable botonDerecho*/
const productos = document.querySelectorAll(".producto"); /* busca todas las class .producto para darselo a la variable productos*/

/*===============*/
/* CONFIGURACIÓN */
/*===============*/
const productosVisibles = 3; /* como la variable lo indica, se verán 3 productos*/
const anchoProducto = 250; /* representa el width: 250px de producto en css*/
const gap = 60; /* representa el gap: 60px de producto en css*/

/*==========================*/
/* MOVIMIENTO DE UN PRODUCTO*/
/*==========================*/
const movimiento = anchoProducto + gap; /* calcula el ancho por gap para darselo a la variable movimiento*/

/*=============================*/
/* ESTADO INICIAL DEL CARRUSEL */
/*=============================*/
let posicionActual = 0; /* determina el inicio del carrusel (si estuviera en 2 se verían los productos 3-4-5)

/*===============================*/
/* CANTIDAD MAXIMA DE MOVIMIENTO */
/*===============================*/
const maximoDesplazamiento = productos.length - productosVisibles; /* el maximodesplazamiento será a los productos.length (6) menos la cantidad que se va a ver, o sea 3 (6-3=3) 3 = maximodesplazamiento*/

/*===================*/
/* FUNCIÓN PRINCIPAL */
/*===================*/
function actualizarCarrusel() {
    contenedorProductos.style.transform = `translateX(-${posicionActual * movimiento}px)`;

    /* BOTÓN IZQUIERDO */
    botonIzquierdo.disabled = posicionActual === 0;

    /* BOTÓN DERECHO */
    botonDerecho.disabled = posicionActual === maximoDesplazamiento;
}

/*===============*/
/* BOTÓN DERECHO */
/*===============*/
botonDerecho.addEventListener("click", () => {
    if (posicionActual < maximoDesplazamiento) {
        posicionActual++;
        actualizarCarrusel();
    }
});

/* ================*/
/* BOTÓN IZQUIERDO */
/*=================*/
botonIzquierdo.addEventListener("click", () => { /*.addeventlistener escucha instrucciones, en este caso "click"*/
    if (posicionActual > 0) {
        posicionActual--;
        actualizarCarrusel();
    }
});

/*=============*/
/* INICIALIZAR */
/*=============*/
actualizarCarrusel();