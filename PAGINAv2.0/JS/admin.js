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

document.addEventListener("DOMContentLoaded", async () => {
    await cargarPanelAdministrador();
});

async function cargarPanelAdministrador() {
    try {
        const [publicacionesRespuesta, comentariosRespuesta, clientesRespuesta, vendedoresRespuesta] = await Promise.all([
            fetch("../PHP/api.php?accion=admin-publicaciones"),
            fetch("../PHP/api.php?accion=admin-comentarios"),
            fetch("../PHP/api.php?accion=admin-clientes"),
            fetch("../PHP/api.php?accion=admin-vendedores")
        ]);
        const publicaciones = await publicacionesRespuesta.json();
        const comentarios = await comentariosRespuesta.json();
        const clientes = await clientesRespuesta.json();
        const vendedores = await vendedoresRespuesta.json();
        if (!publicaciones.success || !comentarios.success || !clientes.success || !vendedores.success) {
            alert(publicaciones.message || comentarios.message || clientes.message || vendedores.message || "No tenés acceso al panel.");
            window.location.href = "inicio-sesion.html";
            return;
        }
        renderizarPublicacionesAdmin(publicaciones.publicaciones);
        renderizarComentariosAdmin(comentarios.comentarios);
        renderizarClientesAdmin(clientes.clientes);
        renderizarVendedoresAdmin(vendedores.vendedores);
    } catch (error) {
        alert("No se pudo cargar el panel de administración.");
    }
}

function renderizarClientesAdmin(clientes) {
    const lista = document.querySelector(".seccion-opcion-cliente ul");
    lista.innerHTML = "";
    clientes.forEach((cliente) => {
        const elemento = document.createElement("li");
        elemento.className = "elemento elemento-admin";
        elemento.innerHTML = `<strong>${escaparAdmin(cliente.nombre)} ${escaparAdmin(cliente.apellido)}</strong><br><small>@${escaparAdmin(cliente.username)} · ${escaparAdmin(cliente.correo)}${cliente.ciudad ? ` · ${escaparAdmin(cliente.ciudad)}` : ""}</small>`;
        lista.appendChild(elemento);
    });
    if (!lista.children.length) lista.innerHTML = "<li class=\"elemento\">No hay compradores registrados.</li>";
}

function renderizarVendedoresAdmin(vendedores) {
    const lista = document.querySelector(".seccion-opcion-vendedor ul");
    lista.innerHTML = "";
    vendedores.forEach((vendedor) => {
        const elemento = document.createElement("li");
        elemento.className = "elemento elemento-admin";
        const negocio = vendedor.nombre_negocio || "Sin nombre de negocio";
        elemento.innerHTML = `<strong>${escaparAdmin(vendedor.nombre)} ${escaparAdmin(vendedor.apellido)}</strong><br><small>@${escaparAdmin(vendedor.username)} · ${escaparAdmin(negocio)} · ${escaparAdmin(vendedor.correo)}${vendedor.ciudad ? ` · ${escaparAdmin(vendedor.ciudad)}` : ""}</small>`;
        lista.appendChild(elemento);
    });
    if (!lista.children.length) lista.innerHTML = "<li class=\"elemento\">No hay vendedores registrados.</li>";
}

function renderizarPublicacionesAdmin(publicaciones) {
    const pendientes = document.querySelector(".seccion-opcion-producto-pendiente ul");
    const aprobados = document.querySelector(".seccion-opcion-producto-aprobado ul");
    pendientes.innerHTML = "";
    aprobados.innerHTML = "";
    publicaciones.forEach((publicacion) => {
        const elemento = document.createElement("li");
        elemento.className = "elemento elemento-admin";
        let etiquetas = [];
        try {
            etiquetas = JSON.parse(publicacion.etiquetas || "[]");
        } catch (error) {
            etiquetas = [];
        }
        elemento.innerHTML = `<strong>${escaparAdmin(publicacion.titulo)}</strong> - ${escaparAdmin(publicacion.username)} - $${Number(publicacion.precio).toLocaleString("es-AR")}<br><small>Etiquetas: ${escaparAdmin(etiquetas.join(", "))}</small>`;
        if (publicacion.estado === "pendiente") {
            elemento.innerHTML += ` <button onclick="decidirPublicacion(${publicacion.id}, 'aprobado')">Aceptar</button><button onclick="rechazarPublicacion(${publicacion.id})">Rechazar</button>`;
            pendientes.appendChild(elemento);
        } else if (publicacion.estado === "aprobado") {
            aprobados.appendChild(elemento);
        }
    });
    if (!pendientes.children.length) pendientes.innerHTML = "<li class=\"elemento\">No hay solicitudes pendientes.</li>";
    if (!aprobados.children.length) aprobados.innerHTML = "<li class=\"elemento\">No hay productos aprobados.</li>";
}

function renderizarComentariosAdmin(comentarios) {
    const revisar = document.querySelector(".seccion-opcion-comentarios-revisar ul");
    const publicados = document.querySelector(".seccion-opcion-comentarios-publicados ul");
    revisar.innerHTML = "";
    publicados.innerHTML = "";
    comentarios.forEach((comentario) => {
        const elemento = document.createElement("li");
        elemento.className = "elemento elemento-admin";
        elemento.innerHTML = `<strong>${escaparAdmin(comentario.username)}</strong>: ${escaparAdmin(comentario.comentario)}`;
        if (comentario.estado === "pendiente") {
            elemento.innerHTML += ` <button onclick="decidirComentario(${comentario.id}, 'aprobado')">Aceptar</button><button onclick="decidirComentario(${comentario.id}, 'rechazado')">Rechazar</button>`;
            revisar.appendChild(elemento);
        } else if (comentario.estado === "aprobado") {
            publicados.appendChild(elemento);
        }
    });
    if (!revisar.children.length) revisar.innerHTML = "<li class=\"elemento\">No hay comentarios para revisar.</li>";
    if (!publicados.children.length) publicados.innerHTML = "<li class=\"elemento\">No hay comentarios publicados.</li>";
}

async function decidirPublicacion(id, estado) {
    await enviarDecision("decidir-publicacion", id, estado);
}

async function rechazarPublicacion(id) {
    const mensaje = window.prompt("Escribí el motivo del rechazo para el vendedor:");
    if (mensaje === null) return;
    if (!mensaje.trim()) {
        alert("El motivo del rechazo es obligatorio.");
        return;
    }
    await enviarDecision("decidir-publicacion", id, "rechazado", mensaje.trim());
}

async function decidirComentario(id, estado) {
    await enviarDecision("decidir-comentario", id, estado);
}

async function enviarDecision(accion, id, estado, mensaje = "") {
    const respuesta = await fetch("../PHP/api.php", {
        method: "POST",
        body: new URLSearchParams({ accion, id, estado, mensaje })
    });
    const datos = await respuesta.json();
    if (!datos.success) {
        alert(datos.message || "No se pudo guardar la decisión.");
        return;
    }
    await cargarPanelAdministrador();
}

function escaparAdmin(valor) {
    const elemento = document.createElement("div");
    elemento.textContent = valor;
    return elemento.innerHTML;
}
