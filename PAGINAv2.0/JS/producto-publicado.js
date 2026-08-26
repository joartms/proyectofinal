document.addEventListener("DOMContentLoaded", () => {
    const datosProducto = JSON.parse(localStorage.getItem("productoPublicado") || "null");

    if (!datosProducto) return;

    const titulo = document.getElementById("titulo-producto-publicado");
    const precio = document.getElementById("precio-producto-publicado");
    const descripcion = document.getElementById("descripcion-producto-publicado");
    const etiquetasPublicadas = document.getElementById("etiquetas-publicadas");
    const imagen = document.getElementById("imagen-producto-publicado");
    const galeria = document.getElementById("galeria-imagenes");
    let imagenes = [];

    try {
        imagenes = datosProducto.imagen ? JSON.parse(datosProducto.imagen) : [];
    } catch (error) {
        imagenes = datosProducto.imagen ? [datosProducto.imagen] : [];
    }
    if (!Array.isArray(imagenes)) imagenes = [imagenes];

    if (titulo) titulo.textContent = datosProducto.titulo || datosProducto.nombre || "Producto publicado";
    if (precio) precio.textContent = `$${datosProducto.precio || 0}`;
    if (descripcion) descripcion.textContent = datosProducto.descripcion || "Sin descripción.";
    if (etiquetasPublicadas) {
        let etiquetas = [];
        try {
            etiquetas = JSON.parse(datosProducto.etiquetas || "[]");
        } catch (error) {
            etiquetas = [];
        }
        if (!Array.isArray(etiquetas)) etiquetas = [];
        etiquetasPublicadas.innerHTML = etiquetas.length
            ? etiquetas.map((etiqueta) => `<span>${escaparTexto(etiqueta)}</span>`).join("")
            : "<span>Sin etiquetas</span>";
    }
    const imagenDescripcion = document.getElementById("imagen-descripcion-producto");
    let indiceImagen = 0;

    function mostrarImagen(indice) {
        if (!imagenes.length) return;
        indiceImagen = (indice + imagenes.length) % imagenes.length;
        const fuente = imagenes[indiceImagen];
        [imagen, imagenDescripcion].forEach((elemento) => {
            if (!elemento) return;
            elemento.classList.add("cambiando-imagen");
            window.setTimeout(() => {
                elemento.src = fuente;
                elemento.classList.remove("cambiando-imagen");
            }, 300);
        });
    }
    mostrarImagen(0);
    if (imagenes.length > 1) window.setInterval(() => mostrarImagen(indiceImagen + 1), 5000);
    if (galeria) {
        imagenes.forEach((imagenProducto, indice) => {
            const miniatura = document.createElement("img");
            miniatura.src = imagenProducto;
            miniatura.alt = "Vista previa del producto";
            miniatura.style.cssText = "width:60px;height:60px;object-fit:cover;border-radius:6px;cursor:pointer;";
            miniatura.addEventListener("click", () => mostrarImagen(indice));
            galeria.appendChild(miniatura);
        });
    }

    const botonComprar = document.getElementById("button-comprar");
    const botonComentar = document.getElementById("button-comentar");
    const textoComentario = document.getElementById("texto-comentario");
    const listaComentarios = document.getElementById("lista-comentarios");
    const esComprador = localStorage.getItem("usuarioRol") === "comprador";

    if (botonComprar && !esComprador) {
        botonComprar.disabled = true;
        botonComprar.textContent = "Solo compradores";
    }

    async function cargarComentarios() {
        if (!datosProducto.id || !listaComentarios) return;
        const respuesta = await fetch(`../PHP/api.php?accion=comentarios&publicacion_id=${datosProducto.id}`);
        const datos = await respuesta.json();
        listaComentarios.innerHTML = "";
        datos.comentarios.forEach((comentario) => {
            const elemento = document.createElement("div");
            elemento.className = "comentario";
            elemento.textContent = `De: ${comentario.username}: ${comentario.comentario}`;
            listaComentarios.appendChild(elemento);
        });
    }

    if (botonComprar && datosProducto.id && esComprador) {
        botonComprar.addEventListener("click", async () => {
            const respuesta = await fetch("../PHP/api.php", {
                method: "POST",
                body: new URLSearchParams({ accion: "comprar", publicacion_id: datosProducto.id })
            });
            const datos = await respuesta.json();
            alert(datos.message || "Compra registrada.");
        });
    }

    if (botonComentar && datosProducto.id) {
        botonComentar.addEventListener("click", async () => {
            const respuesta = await fetch("../PHP/api.php", {
                method: "POST",
                body: new URLSearchParams({
                    accion: "crear-comentario",
                    publicacion_id: datosProducto.id,
                    comentario: textoComentario.value.trim()
                })
            });
            const datos = await respuesta.json();
            alert(datos.message || "No se pudo publicar el comentario.");
            if (datos.success) textoComentario.value = "";
        });
    } else if (botonComentar) {
        botonComentar.disabled = true;
        textoComentario.placeholder = "Los comentarios están disponibles en productos comprados.";
    }

    cargarComentarios().catch(() => {});
});

function escaparTexto(valor) {
    const elemento = document.createElement("div");
    elemento.textContent = valor;
    return elemento.innerHTML;
}
