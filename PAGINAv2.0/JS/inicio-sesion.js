const formCrearCuenta = document.getElementById("form-crear-cuenta");

if (formCrearCuenta) {
    // Limpia datos de la versión anterior, que registraba usuarios en el navegador.
    localStorage.removeItem("usuariosRegistrados");

    formCrearCuenta.addEventListener("submit", (e) => {
        e.preventDefault();

        const datos = {
            nombre: document.getElementById("nombre").value.trim(),
            apellido: document.getElementById("apellido").value.trim(),
            username: document.getElementById("username").value.trim(),
            password: document.getElementById("password").value,
            email: document.getElementById("email").value.trim(),
            pais: document.getElementById("pais").value.trim(),
            ciudad: document.getElementById("ciudad").value.trim(),
            fechaNacimiento: document.getElementById("fechaNacimiento").value,
            dni: document.getElementById("dni").value.trim()
        };

        if (Object.values(datos).some((valor) => valor === "")) {
            alert("Completá todos los campos para continuar.");
            return;
        }

        // Solo se guarda temporalmente hasta elegir el rol. El alta definitiva
        // se hace en la base de datos desde PHP/register.php.
        localStorage.setItem("registroPendiente", JSON.stringify(datos));
        window.location.href = "inicio-sesion-rol.html?v=4";
    });
}
