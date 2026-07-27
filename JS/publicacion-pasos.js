// Define 'Carrusel' al elemento HTML con la clase 'contenedor-central'.
const carrusel = document.querySelector(".contenedor-central");

// Define 'circuloPasoN' al elemento HTML con la ID 'ir-paso-N'.
const circuloPaso1 = document.getElementById("ir-paso-1");
const circuloPaso2 = document.getElementById("ir-paso-2");
const circuloPaso3 = document.getElementById("ir-paso-3");
const circuloPaso4 = document.getElementById("ir-paso-4");

// Define 'circulos' como una Array con los elementos 'CirculoPasoN'.
const circulos = [circuloPaso1, circuloPaso2, circuloPaso3,circuloPaso4];


// Define la function 'activarPaso' con el parámetro 'paso'.
function activarPaso(paso) {

    // Recorre la Array buscando 'circulos'. El valor del circulo cambia según la vuelta.
    circulos.forEach(circulos => {

        // Elimina la clase 'activo' de la rotación del circulo actual.
        circulos.classList.remove("activo");
    });

    // Accede a la Array y le resta 1 porque el circuito es 0-1-2-3.
    circulos[paso - 1]. classList.add("activo");
}

// Detecta 'click' y desplaza el Carrusel a la posicion inicial (1) = Paso 1.
circuloPaso1.addEventListener("click", () => {
    carrusel.style.transform = "translateX(0%)";

    // Marca al círculo 1 como 'activo'.
    activarPaso(1);
});

// Detecta 'click' y desplaza (un 100%) el Carrusel una página a la izquierda (2) = Paso 2.
circuloPaso2.addEventListener("click", () => {
    carrusel.style.transform = "translateX(-100%)";

    // Marca al círculo 2 como 'activo'.
    activarPaso(2);
});

// Detecta 'click' y desplaza (un 200%) el Carrusel dos páginas a la izquierda (3) = Paso 3.
circuloPaso3.addEventListener("click", () => {
    carrusel.style.transform = "translateX(-200%)";

    // Marca al círculo 3 como 'activo'.
    activarPaso(3);
});

// Detecta 'click' y desplaza (un 300%) el Carrusel tres páginas a la izquierda (4) = Paso 4.
circuloPaso4.addEventListener("click", () => {
    carrusel.style.transform = "translateX(-300%)";

    // Marca al círculo 4 como 'activo'.
    activarPaso(4);
});

// Al iniciar la página, desmarca al resto de circulos para empezar con el 1, como debería ser.
activarPaso(1);