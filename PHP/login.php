<?php
header('Content-Type: application/json');
session_start();

$usersFile = __DIR__ . '/users.csv';
$username = isset($_POST['username']) ? trim($_POST['username']) : '';
$password = isset($_POST['password']) ? trim($_POST['password']) : '';

if ($username === '' || $password === '') {
    echo json_encode(['success' => false, 'message' => 'Faltan datos para iniciar sesión.']);
    exit();
}

if (!file_exists($usersFile)) {
    echo json_encode(['success' => false, 'message' => 'No existe el archivo de usuarios.']);
    exit();
}

$lines = file($usersFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
foreach ($lines as $line) {
    $parts = str_getcsv($line);
    if (empty($parts)) {
        continue;
    }

    $storedUsername = trim($parts[0] ?? '');
    $storedPassword = trim($parts[2] ?? '');
    $storedRole = isset($parts[3]) ? trim($parts[3]) : 'comprador';

    if ($storedUsername === $username) {
        $passwordMatches = false;

        if ($storedPassword === $password) {
            $passwordMatches = true;
        } elseif (strpos($storedPassword, '$2y$') === 0 && function_exists('password_verify')) {
            $passwordMatches = password_verify($password, $storedPassword);
        }

        if ($passwordMatches) {
            $_SESSION['usuario'] = $username;
            echo json_encode([
                'success' => true,
                'username' => $username,
                'role' => $storedRole
            ]);
            exit();
        }
    }
}

echo json_encode(['success' => false, 'message' => 'Usuario o contraseña incorrectos.']);
