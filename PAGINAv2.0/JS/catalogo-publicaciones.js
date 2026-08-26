document.addEventListener("DOMContentLoaded", async () => {
    const contenedor = document.querySelector("#publicados-recientemente .contenedor-productos, #publicados-recientemente .slides-catalogo");
    if (!contenedor) return;

    try {
        const respuesta = await fetch("../PHP/api.php?accion=publicaciones");
        const datos = await respuesta.json();
        if (!datos.success) return;

        datos.publicaciones.forEach((publicacion) => {
            const producto = document.createElement("div");
            const usaFormatoCatalogoHtml = contenedor.classList.contains("contenedor-productos");
            producto.className = usaFormatoCatalogoHtml ? "producto producto-publicado-catalogo" : "slide-catalogo producto-publicado-catalogo";
            producto.tabIndex = 0;
            let imagen = publicacion.imagen || "../IMG/fondos/fondo20.jpg";
            try {
                const imagenes = JSON.parse(imagen);
                imagen = Array.isArray(imagenes) ? (imagenes[0] || "../IMG/fondos/fondo20.jpg") : imagenes;
            } catch (error) {
                // Mantener compatibilidad con publicaciones guardadas antes de usar múltiples imágenes.
            }
            producto.innerHTML = usaFormatoCatalogoHtml
                ? `<div class="contenedor-img-carrusel">
                       <img class="producto-img" src="${escaparAtributo(imagen)}" alt="${escaparTexto(publicacion.titulo)}">
                   </div>
                   <h3 class="producto-h3">${escaparTexto(publicacion.titulo)}</h3>
                   <p class="producto-p">$${Number(publicacion.precio).toLocaleString("es-AR")}</p>`
                : `<img src="${escaparAtributo(imagen)}" alt="${escaparTexto(publicacion.titulo)}">
                   <h2>${escaparTexto(publicacion.titulo)}</h2>
                   <p>$${Number(publicacion.precio).toLocaleString("es-AR")}</p>`;
            producto.addEventListener("click", () => abrirProducto(publicacion));
            producto.addEventListener("keydown", (evento) => {
                if (evento.key === "Enter" || evento.key === " ") abrirProducto(publicacion);
            });
            contenedor.appendChild(producto);
        });
    } catch (error) {
        console.error("No se pudieron cargar las publicaciones aprobadas.", error);
    }
});

function abrirProducto(publicacion) {
    localStorage.setItem("productoPublicado", JSON.stringify(publicacion));
    window.location.href = "producto-publicado.html";
}

function escaparTexto(valor) {
    const elemento = document.createElement("div");
    elemento.textContent = valor;
    return elemento.innerHTML;
}

function escaparAtributo(valor) {
    return escaparTexto(valor).replace(/"/g, "&quot;");
}
