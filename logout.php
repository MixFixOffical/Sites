<?php
session_start();
session_destroy();
header('Location: index.html?success=Вы успешно вышли из системы');
exit;
?>