// Definición de variables
const botonAbrir = document.getElementById("inicio-sesion-popup");
const botonCerrar = document.getElementById("cerrar-popup-boton");
const popUp = document.getElementById("popup");

// Funcionamiento del botón para abrir/mostrar el pop-up
botonAbrir.addEventListener("click", () => {
    popUp.showModal();

    popUp.classList.remove("cerrar"); /*Elimina la clase 'cerrar' */
    popUp.classList.add("abrir"); /*Agrega la clase 'abrir', activando la animación establecida en .popup-class.abrir */
});

// Funcionamiento del botón para cerrar el pop-up
botonCerrar.addEventListener("click", () => {
    popUp.classList.remove("abrir"); /*Elimina la clase 'abrir' */
    popUp.classList.add("cerrar"); /*Agrega la clase 'cerrar', activando la animación establecida en .popup-class.cerrar */

    popUp.addEventListener( /*El programa buscará un evento sobre el const 'popUp' */
        "animationend", () => { /*Cuando termina 'salir' activa su código */
            popUp.close();
        },
        { once: true } /*Ejecuta el evento una única vez, para posteriormente eliminar el 'Listener' */
    );
});