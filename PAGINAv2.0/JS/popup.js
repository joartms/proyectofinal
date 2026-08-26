const botonAbrir = document.getElementById("inicio-sesion-popup");
const botonCerrar = document.getElementById("cerrar-popup-boton");
const popUp = document.getElementById("popup");
const formularioLogin = document.getElementById("formulario-login");

if (botonAbrir && popUp) {
    botonAbrir.addEventListener("click", () => popUp.showModal());
}

if (botonCerrar && popUp) {
    botonCerrar.addEventListener("click", () => popUp.close());
}

if (formularioLogin) {
    formularioLogin.addEventListener("submit", async (e) => {
        e.preventDefault();
        const datos = new FormData(formularioLogin);
        const username = String(datos.get("username") || "").trim();
        const password = String(datos.get("password") || "");

        if (!username || !password) {
            alert("Ingresá tu nombre de usuario y contraseña.");
            return;
        }

        try {
            const response = await fetch("../PHP/login.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ username, password })
            });
            const data = await response.json();

            if (!data.success) {
                alert(data.message || "Usuario o contraseña incorrectos.");
                return;
            }

            localStorage.setItem("usuario", data.username);
            localStorage.setItem("usuarioRol", data.role);
            if (data.role === "vendedor") {
                try {
                    const avisosRespuesta = await fetch("../PHP/api.php?accion=notificaciones-vendedor");
                    const avisos = await avisosRespuesta.json();
                    if (avisos.success && avisos.notificaciones.length) {
                        avisos.notificaciones.forEach((aviso) => {
                            alert(`El administrador rechazó "${aviso.titulo}":\n${aviso.mensaje_admin}`);
                        });
                    }
                } catch (error) {
                    console.error("No se pudieron cargar los avisos del vendedor.", error);
                }
            }
            window.location.href = data.role === "admin" ? "admin.html" : "catalogo.html";
        } catch (error) {
            alert("No se pudo conectar con el servidor para iniciar sesión.");
        }
    });
}
