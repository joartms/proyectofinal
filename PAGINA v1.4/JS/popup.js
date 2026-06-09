const botonAbrir = document.getElementById("inicio-sesion-popup");
const botonCerrar = document.getElementById("cerrar-popup-boton");
const popUp = document.getElementById("popup");
botonAbrir.addEventListener("click", () => {
    popUp.showModal();
});
botonCerrar.addEventListener("click", () => {
    popUp.close();
});
