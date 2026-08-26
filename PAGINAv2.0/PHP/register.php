<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/db.php';

function responder(array $respuesta): void
{
    echo json_encode($respuesta);
    exit();
}

$campos = ['nombre', 'apellido', 'username', 'password', 'email', 'pais', 'ciudad', 'fechaNacimiento', 'dni'];
$datos = [];
foreach ($campos as $campo) {
    $datos[$campo] = trim((string) ($_POST[$campo] ?? ''));
}

$camposFaltantes = array_keys(array_filter($datos, static fn (string $valor): bool => $valor === ''));
if ($camposFaltantes !== []) {
    responder([
        'success' => false,
        'message' => 'Faltan datos del formulario: ' . implode(', ', $camposFaltantes) . '. Volvé a completar el registro.',
    ]);
}

if (!filter_var($datos['email'], FILTER_VALIDATE_EMAIL)) {
    responder(['success' => false, 'message' => 'Ingresá un correo electrónico válido.']);
}

$rolSolicitado = trim((string) ($_POST['role'] ?? 'comprador'));
$rol = $rolSolicitado === 'vendedor' ? 'vendedor' : 'cliente';

try {
    $pdo = conectarBaseDeDatos();
    $existente = $pdo->prepare(
        'SELECT username, dni, correo
         FROM usuarios
         WHERE username = :username OR dni = :dni OR correo = :correo
         LIMIT 1'
    );
    $existente->execute([
        ':username' => $datos['username'],
        ':dni' => $datos['dni'],
        ':correo' => $datos['email'],
    ]);
    $usuarioExistente = $existente->fetch();

    if ($usuarioExistente) {
        $coincidencias = [];
        if ($usuarioExistente['username'] === $datos['username']) {
            $coincidencias[] = 'nombre de usuario';
        }
        if ($usuarioExistente['dni'] === $datos['dni']) {
            $coincidencias[] = 'DNI';
        }
        if ($usuarioExistente['correo'] === $datos['email']) {
            $coincidencias[] = 'correo electrónico';
        }

        responder(['success' => false, 'message' => 'Ya existe una cuenta con: ' . implode(', ', $coincidencias) . '.']);
    }

    $consulta = $pdo->prepare(
        'INSERT INTO usuarios
            (username, nombre, apellido, dni, correo, password_hash, fecha_nacimiento, pais, ciudad, rol)
         VALUES
            (:username, :nombre, :apellido, :dni, :correo, :password_hash, :fecha_nacimiento, :pais, :ciudad, :rol)'
    );
    $consulta->execute([
        ':username' => $datos['username'], ':nombre' => $datos['nombre'], ':apellido' => $datos['apellido'],
        ':dni' => $datos['dni'], ':correo' => $datos['email'],
        ':password_hash' => password_hash($datos['password'], PASSWORD_DEFAULT),
        ':fecha_nacimiento' => $datos['fechaNacimiento'], ':pais' => $datos['pais'],
        ':ciudad' => $datos['ciudad'], ':rol' => $rol,
    ]);
    responder(['success' => true, 'username' => $datos['username'], 'role' => $rolSolicitado === 'vendedor' ? 'vendedor' : 'comprador']);
} catch (PDOException $error) {
    if ($error->getCode() === '23000') {
        responder(['success' => false, 'message' => 'El usuario, correo o DNI ya se encuentra registrado.']);
    }
    error_log($error->getMessage());
    responder(['success' => false, 'message' => 'No se pudo guardar la cuenta en la base de datos.']);
}
