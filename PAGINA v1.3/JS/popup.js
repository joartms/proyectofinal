// Definición de variables
const botonAbrir = document.getElementById("inicio-sesion-popup");
const botonCerrar = document.getElementById("cerrar-popup-boton");
const popUp = document.getElementById("popup");

// Funcionamiento del botón para abrir/mostrar el pop-up
botonAbrir.addEventListener("click", () => {
    popUp.showModal();
});

// Funcionamiento del botón para cerrar el pop-up
botonCerrar.addEventListener("click", () => {
    popUp.close();
});
