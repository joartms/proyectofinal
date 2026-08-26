<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
session_start();
require_once __DIR__ . '/db.php';

$username = trim((string) ($_POST['username'] ?? ''));
$password = trim((string) ($_POST['password'] ?? ''));
if ($username === '' || $password === '') {
    echo json_encode(['success' => false, 'message' => 'Faltan datos para iniciar sesión.']);
    exit();
}

try {
    $pdo = conectarBaseDeDatos();
    $consulta = $pdo->prepare('SELECT username, password_hash, rol FROM usuarios WHERE username = :username LIMIT 1');
    $consulta->execute([':username' => $username]);
    $usuario = $consulta->fetch();
    if (!$usuario || empty($usuario['password_hash']) || !password_verify($password, $usuario['password_hash'])) {
        echo json_encode(['success' => false, 'message' => 'Usuario o contraseña incorrectos.']);
        exit();
    }
    $_SESSION['usuario'] = $usuario['username'];
    $rol = in_array($usuario['rol'], ['admin', 'vendedor'], true) ? $usuario['rol'] : 'comprador';
    $_SESSION['rol'] = $rol;
    echo json_encode(['success' => true, 'username' => $usuario['username'], 'role' => $rol]);
} catch (PDOException $error) {
    error_log($error->getMessage());
    echo json_encode(['success' => false, 'message' => 'No se pudo conectar con la base de datos.']);
}
