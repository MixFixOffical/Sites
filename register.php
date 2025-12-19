<?php
// Создаем папку data если её нет
if (!file_exists('data')) {
    mkdir('data', 0777, true);
}

$users_file = 'data/baza.txt';

// Получаем данные из формы
$login = trim($_POST['login']);
$password = trim($_POST['password']);

// Проверяем валидность
if (strlen($login) < 3) {
    header('Location: index.html?error=Логин должен быть не менее 3 символов');
    exit;
}

if (strlen($password) < 4) {
    header('Location: index.html?error=Пароль должен быть не менее 4 символов');
    exit;
}

// Проверяем, не существует ли уже такой логин
if (file_exists($users_file)) {
    $lines = file($users_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $parts = explode(':', $line);
        if (isset($parts[0]) && $parts[0] === $login) {
            header('Location: index.html?error=Этот логин уже занят');
            exit;
        }
    }
}

// Записываем в файл (формат: логин:пароль)
$data = "$login:$password\n";
file_put_contents($users_file, $data, FILE_APPEND | LOCK_EX);

// Перенаправляем с сообщением об успехе
header('Location: index.html?success=Регистрация прошла успешно! Теперь войдите в систему');
exit;
?>