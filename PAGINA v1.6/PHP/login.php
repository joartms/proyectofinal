<?php
session_start();
$usersFile = __DIR__ . '/users.csv';
$username = isset($_POST['username']) ? trim($_POST['username']) : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';
if ($username && $password && file_exists($usersFile)) {
    $lines = file($usersFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $parts = explode(',', $line);
        if (count($parts) >= 3 && trim($parts[0]) === $username && trim($parts[2]) === $password) {
            $_SESSION['usuario'] = $username;
            header('Location: ../HTML/index.php');
            exit();
        }
    }
}
header('Location: ../HTML/inicio-sesion.html');
exit();
