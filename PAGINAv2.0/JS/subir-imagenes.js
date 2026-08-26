document.addEventListener("DOMContentLoaded", () => {
    const inputArchivo = document.getElementById("input-imagen-producto");
    const botonSubir = document.getElementById("boton-subir-imagen");
    const preview = document.getElementById("preview-imagen-producto");
    const textoEstado = document.getElementById("estado-subida");
    const miniaturas = document.getElementById("miniaturas-imagenes-producto");
    const imagenes = [];

    if (botonSubir && inputArchivo) {
        botonSubir.addEventListener("click", () => inputArchivo.click());

        inputArchivo.addEventListener("change", () => {
            const archivos = [...inputArchivo.files];
            if (!archivos.length) return;

            let cargadas = 0;
            archivos.forEach((archivo) => {
                const lector = new FileReader();
                lector.onload = function (e) {
                    imagenes.push({ nombre: archivo.name, src: e.target.result });
                    cargadas++;
                    renderizarImagenes();
                };
                lector.readAsDataURL(archivo);
            });
        });
    }

    window.obtenerImagenesPublicacion = () => imagenes.map((imagen) => imagen.src);

    function renderizarImagenes() {
        if (!imagenes.length) return;
        if (preview) {
            preview.src = imagenes[0].src;
            preview.style.display = "block";
        }
        if (textoEstado) textoEstado.textContent = `${imagenes.length} imagen(es) lista(s)`;
        if (miniaturas) {
            miniaturas.innerHTML = "";
            imagenes.forEach((imagen, indice) => {
                const miniatura = document.createElement("img");
                miniatura.src = imagen.src;
                miniatura.alt = `Imagen ${indice + 1}`;
                miniatura.title = `Imagen ${indice + 1}: ${imagen.nombre}`;
                miniatura.addEventListener("click", () => {
                    preview.src = imagen.src;
                });
                miniaturas.appendChild(miniatura);
            });
        }
    }
});
