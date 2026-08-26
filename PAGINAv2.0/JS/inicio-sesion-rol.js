var opcionComprador = document.getElementsByClassName("opcion-1")[0];
var opcionVendedor = document.getElementsByClassName("opcion-2")[0];
var botonFinalizar = document.getElementById("btn-finalizar-rol");
var rolSeleccionado = null;

function activoComprador() {
    opcionVendedor.classList.remove("opcion-activa");
    opcionComprador.classList.add("opcion-activa");
    rolSeleccionado = "comprador";
}

function activoVendedor() {
    opcionComprador.classList.remove("opcion-activa");
    opcionVendedor.classList.add("opcion-activa");
    rolSeleccionado = "vendedor";
}

if (botonFinalizar) {
    botonFinalizar.addEventListener("click", async () => {
        if (!rolSeleccionado) {
            alert("Tenés que elegir si querés ser comprador o vendedor.");
            return;
        }

        const registroPendiente = JSON.parse(localStorage.getItem("registroPendiente") || "null");
        if (!registroPendiente) {
            alert("No se encontró la información de la cuenta para guardar.");
            window.location.href = "inicio-sesion.html";
            return;
        }

        const camposRequeridos = ["nombre", "apellido", "username", "password", "email", "pais", "ciudad", "fechaNacimiento", "dni"];
        const faltanDatos = camposRequeridos.some((campo) => !registroPendiente[campo]);
        if (faltanDatos) {
            localStorage.removeItem("registroPendiente");
            alert("La información del registro anterior está incompleta. Completá el formulario nuevamente.");
            window.location.href = "inicio-sesion.html";
            return;
        }

        try {
            const response = await fetch("../PHP/register.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ ...registroPendiente, role: rolSeleccionado })
            });
            const data = await response.json();
            if (!data.success) {
                alert(data.message || "No se pudo guardar la cuenta.");
                return;
            }

            localStorage.setItem("rolSeleccionado", data.role);
            localStorage.setItem("usuario", data.username);
            localStorage.setItem("usuarioRol", data.role);
            localStorage.removeItem("registroPendiente");
            window.location.href = "catalogo.html";
        } catch (error) {
            alert("No se pudo guardar la cuenta en el servidor.");
        }
    });
}
