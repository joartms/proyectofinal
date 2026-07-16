function desplegarBarraLateral(){
    var contenedorBarraLateral = document.getElementsByClassName("contenedor-barra-lateral")[0];
    var barraLateral = document.getElementsByClassName("barra-lateral")[0];

    if(contenedorBarraLateral.style.display=="flex"){
        contenedorBarraLateral.style.display ="none";
    }else{
        contenedorBarraLateral.style.display="flex";
    }

    if(barraLateral.style.display=="flex"){
        barraLateral.style.display ="none";
    }else{
        barraLateral.style.display="flex";
    }
}

var seccionProductoPendiente = document.getElementsByClassName("seccion-opcion-producto-pendiente")[0];
var seccionProductoAprobado = document.getElementsByClassName("seccion-opcion-producto-aprobado")[0];
var seccionPedidosPendientes = document.getElementsByClassName("seccion-opcion-pedido-pendiente")[0];
var seccionPedidosCompletados = document.getElementsByClassName("seccion-opcion-pedido-completado")[0];
var seccionCLientes = document.getElementsByClassName("seccion-opcion-cliente")[0];
var seccionVendedores = document.getElementsByClassName("seccion-opcion-vendedor")[0];
var seccionComentariosRevisar = document.getElementsByClassName("seccion-opcion-comentarios-revisar")[0];
var seccionComentariosPublicados = document.getElementsByClassName("seccion-opcion-comentarios-publicados")[0];

function mostrarOpcionesProducto(){
    var contenedorSubopcionesProducto = document.getElementsByClassName("contenedor-subopciones-productos")[0];

    if(contenedorSubopcionesProducto.style.display=="flex"){
        contenedorSubopcionesProducto.style.display = "none";
    }else{
        contenedorSubopcionesProducto.style.display = "flex";
    }

    seccionProductoPendiente.style.display = "flex";
    seccionProductoAprobado.style.display = "flex";
    seccionPedidosPendientes.style.display = "none";
    seccionPedidosCompletados.style.display = "none";
    seccionCLientes.style.display = "none";
    seccionVendedores.style.display = "none";
    seccionComentariosRevisar.style.display = "none";
    seccionComentariosPublicados.style.display = "none";

}

function mostrarOpcionesPedidos(){
    var contenedorSubopcionesPedido = document.getElementsByClassName("contenedor-subopciones-pedidos")[0];

    if(contenedorSubopcionesPedido.style.display=="flex"){
        contenedorSubopcionesPedido.style.display = "none";
    }else{
        contenedorSubopcionesPedido.style.display = "flex";
    }

    seccionProductoPendiente.style.display = "none";
    seccionProductoAprobado.style.display = "none";
    seccionPedidosPendientes.style.display = "flex";
    seccionPedidosCompletados.style.display = "flex";
    seccionCLientes.style.display = "none";
    seccionVendedores.style.display = "none";
    seccionComentariosRevisar.style.display = "none";
    seccionComentariosPublicados.style.display = "none";
}

function mostrarClientes(){

    seccionProductoPendiente.style.display = "none";
    seccionProductoAprobado.style.display = "none";
    seccionPedidosPendientes.style.display = "none";
    seccionPedidosCompletados.style.display = "none";
    seccionCLientes.style.display = "flex";
    seccionVendedores.style.display = "none";
    seccionComentariosRevisar.style.display = "none";
    seccionComentariosPublicados.style.display = "none";

    seccionCLientes.scrollIntoView({
        behavior: "smooth"
    });

}

function mostrarVendedores(){

    seccionProductoPendiente.style.display = "none";
    seccionProductoAprobado.style.display = "none";
    seccionPedidosPendientes.style.display = "none";
    seccionPedidosCompletados.style.display = "none";
    seccionCLientes.style.display = "none";
    seccionVendedores.style.display = "flex";
    seccionComentariosRevisar.style.display = "none";
    seccionComentariosPublicados.style.display = "none";

    seccionVendedores.scrollIntoView({
        behavior: "smooth"
    });

}

function mostrarOpcionesComentarios(){
    var contenedorSubopcionesComentarios = document.getElementsByClassName("contenedor-subopciones-comentarios")[0];

    if(contenedorSubopcionesComentarios.style.display=="flex"){
        contenedorSubopcionesComentarios.style.display = "none";
    }else{
        contenedorSubopcionesComentarios.style.display = "flex";
    }

    seccionProductoPendiente.style.display = "none";
    seccionProductoAprobado.style.display = "none";
    seccionPedidosPendientes.style.display = "none";
    seccionPedidosCompletados.style.display = "none";
    seccionCLientes.style.display = "none";
    seccionVendedores.style.display = "none";
    seccionComentariosRevisar.style.display = "flex";
    seccionComentariosPublicados.style.display = "flex";
}

var botonProductoPendiente = document.getElementsByClassName("boton-productos-pendientes")[0];
var botonProductoAprobado = document.getElementsByClassName("boton-productos-aprobados")[0];
var botonPedidoPendiente = document.getElementsByClassName("boton-pedidos-pendientes")[0];
var botonPedidoCompletado = document.getElementsByClassName("boton-pedidos-completados")[0];
var botonComentarioRevisar = document.getElementsByClassName("boton-comentarios-revisar")[0];
var botonComentarioPublicado = document.getElementsByClassName("boton-comentarios-publicados")[0];

function mostrarProductosPendientes(){

    seccionProductoPendiente.style.display = "flex";
    seccionProductoAprobado.style.display = "flex";
    seccionPedidosPendientes.style.display = "none";
    seccionPedidosCompletados.style.display = "none";
    seccionCLientes.style.display = "none";
    seccionVendedores.style.display = "none";
    seccionComentariosRevisar.style.display = "none";
    seccionComentariosPublicados.style.display = "none";

    seccionProductoPendiente.scrollIntoView({
        behavior: "smooth"
    });
}

function mostrarProductosAprobados(){

    seccionProductoPendiente.style.display = "flex";
    seccionProductoAprobado.style.display = "flex";
    seccionPedidosPendientes.style.display = "none";
    seccionPedidosCompletados.style.display = "none";
    seccionCLientes.style.display = "none";
    seccionVendedores.style.display = "none";
    seccionComentariosRevisar.style.display = "none";
    seccionComentariosPublicados.style.display = "none";

    seccionProductoAprobado.scrollIntoView({
        behavior: "smooth"
    });
}

function mostrarPedidosPendientes(){

    seccionProductoPendiente.style.display = "none";
    seccionProductoAprobado.style.display = "none";
    seccionPedidosPendientes.style.display = "flex";
    seccionPedidosCompletados.style.display = "flex";
    seccionCLientes.style.display = "none";
    seccionVendedores.style.display = "none";
    seccionComentariosRevisar.style.display = "none";
    seccionComentariosPublicados.style.display = "none";

    seccionPedidosPendientes.scrollIntoView({
        behavior: "smooth"
    });
}

function mostrarPedidosCompletados(){

    seccionProductoPendiente.style.display = "none";
    seccionProductoAprobado.style.display = "none";
    seccionPedidosPendientes.style.display = "flex";
    seccionPedidosCompletados.style.display = "flex";
    seccionCLientes.style.display = "none";
    seccionVendedores.style.display = "none";
    seccionComentariosRevisar.style.display = "none";
    seccionComentariosPublicados.style.display = "none";

    seccionPedidosCompletados.scrollIntoView({
        behavior: "smooth"
    });
}

function mostrarComentariosRevisar(){

    seccionProductoPendiente.style.display = "none";
    seccionProductoAprobado.style.display = "none";
    seccionPedidosPendientes.style.display = "none";
    seccionPedidosCompletados.style.display = "none";
    seccionCLientes.style.display = "none";
    seccionVendedores.style.display = "none";
    seccionComentariosRevisar.style.display = "flex";
    seccionComentariosPublicados.style.display = "flex";

    seccionComentariosRevisar.scrollIntoView({
        behavior: "smooth"
    });
}

function mostrarComentariosPublicados(){

    seccionProductoPendiente.style.display = "none";
    seccionProductoAprobado.style.display = "none";
    seccionPedidosPendientes.style.display = "none";
    seccionPedidosCompletados.style.display = "none";
    seccionCLientes.style.display = "none";
    seccionVendedores.style.display = "none";
    seccionComentariosRevisar.style.display = "flex";
    seccionComentariosPublicados.style.display = "flex";

    seccionComentariosPublicados.scrollIntoView({
        behavior: "smooth"
    });
}
