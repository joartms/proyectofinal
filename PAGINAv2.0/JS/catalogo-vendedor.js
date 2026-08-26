document.addEventListener("DOMContentLoaded", () => {
    const botonPublicar = document.getElementById("btn-ir-a-publicar");

    if (!botonPublicar || localStorage.getItem("usuarioRol") !== "vendedor") {
        return;
    }

    botonPublicar.hidden = false;
    botonPublicar.addEventListener("click", () => {
        window.location.href = "publicacion-pasos.html";
    });
});
