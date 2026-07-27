document.addEventListener("DOMContentLoaded", () => {
    const botonPublicar = document.getElementById("btn-publicar-producto");

    if (botonPublicar) {
        botonPublicar.addEventListener("click", () => {
            const nombre = document.getElementById("nombre-producto")?.value.trim() || "Producto publicado";
            const precio = document.getElementById("precio-producto")?.value.trim() || "0";
            const descripcion = document.getElementById("descripcion-producto")?.value.trim() || "Sin descripción.";
            const imagen = document.getElementById("preview-imagen-producto")?.src || "";

            localStorage.setItem("productoPublicado", JSON.stringify({
                nombre,
                precio,
                descripcion,
                imagen
            }));

            window.location.href = "producto-publicado.html";
        });
    }
});
