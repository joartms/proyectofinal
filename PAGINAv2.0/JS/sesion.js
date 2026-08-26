document.addEventListener("DOMContentLoaded", () => { 
    const usuario = localStorage.getItem("usuario");
    const rol = localStorage.getItem("usuarioRol");

    if (usuario && rol) {
        const rutaActual = window.location.pathname.split("/").pop();
        const destino = "catalogo.html";

       if (rutaActual === "index.html" || rutaActual === "" || rutaActual === "index.php") {
    window.location.href = "catalogo.html";

        }
    }
});
