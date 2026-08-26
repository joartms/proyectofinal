<?php

session_start();
session_destroy();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Cerrando sesión</title>
</head>
<body>
    <script>
        localStorage.removeItem('usuario');
        localStorage.removeItem('usuarioRol');
        localStorage.removeItem('rolSeleccionado');
        window.location.replace('../HTML/index.php?v=2');
    </script>
</body>
</html>
