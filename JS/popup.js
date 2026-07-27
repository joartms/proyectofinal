
const usuariosBase = {
    joaquin: { password: "1234567", role: "comprador" },
    lourdesgei: { password: "987654321", role: "comprador" },
    juan: { password: "contraseña123", role: "comprador" },
    admin: { password: "admin123", role: "vendedor" }
};

function obtenerUsuarios() {
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuariosRegistrados") || "[]");
    const usuarios = { ...usuariosBase };

    usuariosGuardados.forEach((usuario) => {
        usuarios[usuario.username] = {
            password: usuario.password,
            role: usuario.role || "comprador"
        };
    });

    return usuarios;
}

const botonAbrir = document.getElementById("inicio-sesion-popup");
const botonCerrar = document.getElementById("cerrar-popup-boton");
const popUp = document.getElementById("popup");
const formularioLogin = document.getElementById("formulario-login");

const usuarioActual = localStorage.getItem("usuario");
const rolActual = localStorage.getItem("usuarioRol");

if (usuarioActual && rolActual) {
    if (window.location.pathname.includes("index.html") || window.location.pathname.endsWith("/")) {
        window.location.href = rolActual === "vendedor" ? "publicacion-pasos.html" : "catalogo.html";
    }
}

botonAbrir.addEventListener("click", () => {
    popUp.showModal();

    popUp.classList.remove("cerrar");
    popUp.classList.add("abrir");
});

botonCerrar.addEventListener("click", () => {
    popUp.classList.remove("abrir");
    popUp.classList.add("cerrar");

    popUp.addEventListener(
        "animationend", () => {
            popUp.close();
        },
        { once: true }
    );
});
formularioLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("../PHP/login.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem("usuario", data.username);
            localStorage.setItem("usuarioRol", data.role);
            
            popUp.classList.remove("abrir");
            popUp.classList.add("cerrar");
            
            popUp.addEventListener(
                "animationend", () => {
                    popUp.close();
                    window.location.href = data.role === "vendedor" ? "publicacion-pasos.html" : "catalogo.html";
                },
                { once: true }
            );
        } else {
            alert(data.message || "Usuario o contraseña incorrectos");
            formularioLogin.reset();
        }
    } catch (error) {
        alert("No se pudo conectar con el servidor para iniciar sesión.");
    }
});