document.addEventListener("DOMContentLoaded", () => {
    const botonPublicar = document.getElementById("btn-publicar-producto");

    if (botonPublicar) {
        botonPublicar.addEventListener("click", async () => {
            const nombre = document.getElementById("nombre-producto")?.value.trim() || "";
            const precios = [...document.querySelectorAll(".input-precio")];
            const precio = precios.find((input) => input.offsetParent !== null)?.value.trim() || "";
            const descripcion = document.getElementById("descripcion-producto")?.value.trim() || "";
            const imagenes = typeof window.obtenerImagenesPublicacion === "function"
                ? window.obtenerImagenesPublicacion()
                : [];
            const imagen = JSON.stringify(imagenes);
            const etiquetas = [...document.querySelectorAll('input[name="etiquetas"]:checked')].map((input) => input.value);

            if (!nombre || !precio || !descripcion || Number(precio) < 0) {
                alert("Completá el nombre, el precio y la descripción del producto.");
                return;
            }
            if (etiquetas.length < 2) {
                alert("Elegí al menos dos etiquetas para el producto.");
                return;
            }

            botonPublicar.disabled = true;
            try {
                const respuesta = await fetch("../PHP/api.php", {
                    method: "POST",
                    body: new URLSearchParams({
                        accion: "crear-publicacion",
                        titulo: nombre,
                        precio,
                        descripcion,
                        imagen,
                        etiquetas: JSON.stringify(etiquetas)
                    })
                });
                const datos = await respuesta.json();
                if (!datos.success) {
                    alert(datos.message || "No se pudo enviar la solicitud.");
                    return;
                }
                alert("Tu solicitud fue enviada. Esperá a que un administrador la apruebe.");
                window.location.href = "catalogo.html";
            } catch (error) {
                alert("No se pudo conectar con el servidor.");
            } finally {
                botonPublicar.disabled = false;
            }
        });
    }
});
