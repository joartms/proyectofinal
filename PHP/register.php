<?php
header('Content-Type: application/json');

$usersFile = __DIR__ . '/users.csv';
$username = isset($_POST['username']) ? trim($_POST['username']) : '';
$password = isset($_POST['password']) ? trim($_POST['password']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$role = isset($_POST['role']) ? trim($_POST['role']) : 'comprador';

if (!in_array($role, ['comprador', 'vendedor'], true)) {
    $role = 'comprador';
}

if ($username === '' || $password === '' || $email === '') {
    echo json_encode(['success' => false, 'message' => 'Faltan datos para registrar la cuenta.']);
    exit();
}

if (!file_exists($usersFile)) {
    file_put_contents($usersFile, '');
}

$lines = file($usersFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
foreach ($lines as $line) {
    $parts = str_getcsv($line);
    if (!empty($parts) && trim($parts[0] ?? '') === $username) {
        echo json_encode(['success' => false, 'message' => 'Ese nombre de usuario ya existe.']);
        exit();
    }
}

$line = $username . ',' . $email . ',' . $password . ',' . $role . PHP_EOL;
file_put_contents($usersFile, $line, FILE_APPEND);

echo json_encode([
    'success' => true,
    'username' => $username,
    'role' => $role
]);
