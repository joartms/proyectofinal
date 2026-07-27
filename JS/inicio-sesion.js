const formCrearCuenta = document.getElementById("form-crear-cuenta");

if (formCrearCuenta) {
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
            dni: document.getElementById("dni").value.trim(),
            role: null
        };

        const camposVacios = Object.values(datos).some((valor) => valor === "");

        if (camposVacios) {
            alert("Completá todos los campos para continuar.");
            return;
        }

        const usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados") || "[]");
        const existe = usuariosRegistrados.some((usuario) => usuario.username === datos.username);

        if (existe) {
            alert("Ese nombre de usuario ya existe. Elegí otro.");
            return;
        }

        usuariosRegistrados.push(datos);
        localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados));
        localStorage.setItem("registroPendiente", JSON.stringify(datos));
        localStorage.setItem("registroCuenta", JSON.stringify(datos));
        localStorage.setItem("registroCompleto", "true");
        window.location.href = "inicio-sesion-rol.html";
    });
}
