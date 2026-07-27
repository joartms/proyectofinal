document.addEventListener("DOMContentLoaded", () => {
    const usuario = localStorage.getItem("usuario");
    const rol = localStorage.getItem("usuarioRol");

    if (usuario && rol) {
        const rutaActual = window.location.pathname.split("/").pop();
        const destino = rol === "vendedor" ? "publicacion-pasos.html" : "catalogo.html";

        if (rutaActual === "index.html" || rutaActual === "" || rutaActual === "index.php") {
            window.location.href = destino;
        }
    }
});
