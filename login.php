<?php
session_start();
$users_file = 'data/baza.txt';

// Получаем данные из формы
$login = trim($_POST['login']);
$password = trim($_POST['password']);

// Проверяем существование файла с пользователями
if (!file_exists($users_file)) {
    header('Location: index.html?error=База данных пуста. Зарегистрируйтесь сначала.');
    exit;
}

// Ищем пользователя в файле
$lines = file($users_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
$user_found = false;

foreach ($lines as $line) {
    $parts = explode(':', $line);
    if (count($parts) === 2) {
        $stored_login = trim($parts[0]);
        $stored_password = trim($parts[1]);
        
        if ($stored_login === $login && $stored_password === $password) {
            $user_found = true;
            break;
        }
    }
}

if ($user_found) {
    // Сохраняем в сессию
    $_SESSION['user'] = $login;
    // Перенаправляем в личный кабинет
    header('Location: dashboard.php');
    exit;
} else {
    header('Location: index.html?error=Неверный логин или пароль');
    exit;
}
?>