document.addEventListener("DOMContentLoaded", () => {
    const datosProducto = JSON.parse(localStorage.getItem("productoPublicado") || "null");

    if (!datosProducto) return;

    const titulo = document.getElementById("titulo-producto-publicado");
    const precio = document.getElementById("precio-producto-publicado");
    const descripcion = document.getElementById("descripcion-producto-publicado");
    const imagen = document.getElementById("imagen-producto-publicado");

    if (titulo) titulo.textContent = datosProducto.nombre || "Producto publicado";
    if (precio) precio.textContent = `$${datosProducto.precio || 0}`;
    if (descripcion) descripcion.textContent = datosProducto.descripcion || "Sin descripción.";
    if (imagen && datosProducto.imagen) imagen.src = datosProducto.imagen;
});
