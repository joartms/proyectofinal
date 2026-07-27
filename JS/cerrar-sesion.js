document.addEventListener("DOMContentLoaded", () => {
    const botonCerrarSesion = document.getElementById("btn-cerrar-sesion");

    if (botonCerrarSesion) {
        botonCerrarSesion.addEventListener("click", () => {
            localStorage.removeItem("usuario");
            localStorage.removeItem("usuarioRol");
            localStorage.removeItem("productoPublicado");
            window.location.href = "index.html";
        });
    }
});
