<?php
session_start();

// Проверяем, вошел ли пользователь
if (!isset($_SESSION['user'])) {
    header('Location: index.html?error=Пожалуйста, войдите в систему');
    exit;
}

$username = $_SESSION['user'];
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Личный кабинет</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="dashboard-container">
        <div class="dashboard">
            <h2>Добро пожаловать, <?php echo htmlspecialchars($username); ?>!</h2>
            <p>Вы успешно вошли в систему.</p>
            
            <div class="user-info">
                <h3>Ваши данные:</h3>
                <p><strong>Логин:</strong> <?php echo htmlspecialchars($username); ?></p>
                <p><strong>Статус:</strong> Активный</p>
            </div>
            
            <div class="actions">
                <a href="logout.php" class="btn btn-logout">Выйти</a>
            </div>
        </div>
    </div>
</body>
</html>