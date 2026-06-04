const botonBajar = document.getElementById('contenedor-flecha-bajar');

botonBajar.addEventListener('click', () => {
window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth' // Esta linea hace que el desplazamiento sea un poco más 'suave'
    });
});