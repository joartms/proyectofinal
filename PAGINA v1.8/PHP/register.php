<?php
$usersFile = __DIR__ . '/users.csv';
$username = isset($_POST['username']) ? trim($_POST['username']) : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
if ($username && $password && $email) {
    $exists = false;
    if (!file_exists($usersFile)) {
        file_put_contents($usersFile, '');
    }
    if (file_exists($usersFile)) {
        $lines = file($usersFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            $parts = explode(',', $line);
            if (count($parts) >= 1 && trim($parts[0]) === $username) {
                $exists = true;
                break;
            }
        }
    }
    if (!$exists) {
        $line = $username . ',' . $email . ',' . $password . "\n";
        file_put_contents($usersFile, $line, FILE_APPEND);
        header('Location: ../HTML/gracias-por-registrarte.html');
        exit();
    }
}
header('Location: ../HTML/inicio-sesion.html');
exit();
