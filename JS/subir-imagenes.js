document.addEventListener("DOMContentLoaded", () => {
    const inputArchivo = document.getElementById("input-imagen-producto");
    const botonSubir = document.getElementById("boton-subir-imagen");
    const preview = document.getElementById("preview-imagen-producto");
    const textoEstado = document.getElementById("estado-subida");

    if (botonSubir && inputArchivo) {
        botonSubir.addEventListener("click", () => inputArchivo.click());

        inputArchivo.addEventListener("change", () => {
            const archivo = inputArchivo.files[0];
            if (!archivo) return;

            const lector = new FileReader();
            lector.onload = function (e) {
                if (preview) {
                    preview.src = e.target.result;
                    preview.style.display = "block";
                }
                if (textoEstado) {
                    textoEstado.textContent = `Imagen lista: ${archivo.name}`;
                }
            };
            lector.readAsDataURL(archivo);
        });
    }
});
