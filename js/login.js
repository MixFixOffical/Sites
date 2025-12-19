document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const loginBtn = document.getElementById('loginBtn');
    const rememberMe = document.getElementById('rememberMe');

    // Переключение видимости пароля
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });

    // Валидация формы
    function validateForm() {
        let isValid = true;
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Сброс ошибок
        clearErrors();

        // Валидация логина
        if (!username) {
            showError('username-error', 'Пожалуйста, введите логин или email');
            usernameInput.style.borderColor = '#f72585';
            isValid = false;
        } else if (!isValidEmail(username) && !isValidUsername(username)) {
            showError('username-error', 'Введите корректный email или логин');
            usernameInput.style.borderColor = '#f72585';
            isValid = false;
        } else {
            usernameInput.style.borderColor = '#4cc9f0';
        }

        // Валидация пароля
        if (!password) {
            showError('password-error', 'Пожалуйста, введите пароль');
            passwordInput.style.borderColor = '#f72585';
            isValid = false;
        } else if (password.length < 6) {
            showError('password-error', 'Пароль должен содержать минимум 6 символов');
            passwordInput.style.borderColor = '#f72585';
            isValid = false;
        } else {
            passwordInput.style.borderColor = '#4cc9f0';
        }

        return isValid;
    }

    // Проверка email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Проверка логина
    function isValidUsername(username) {
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        return usernameRegex.test(username);
    }

    // Показать ошибку
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.opacity = '1';
        }
    }

    // Очистить ошибки
    function clearErrors() {
        const errors = document.querySelectorAll('.input-error');
        errors.forEach(error => {
            error.textContent = '';
            error.style.opacity = '0';
        });
        
        [usernameInput, passwordInput].forEach(input => {
            input.style.borderColor = '#e9ecef';
        });
    }

    // Показать уведомление
    function showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Симуляция входа
    function simulateLogin(username, password) {
        return new Promise((resolve, reject) => {
            loginBtn.disabled = true;
            loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Загрузка...';
            
            // Имитация задержки сети
            setTimeout(() => {
                // Здесь будет реальный запрос к серверу
                // fetch('/api/login', { method: 'POST', body: JSON.stringify({username, password}) })
                
                // Для демо - проверяем тестовые данные
                const testUsers = {
                    'admin@test.com': 'admin123',
                    'user@test.com': 'user123',
                    'test': 'test123'
                };
                
                if (testUsers[username] === password) {
                    resolve({ success: true, message: 'Вход выполнен успешно!' });
                } else {
                    reject({ success: false, message: 'Неверный логин или пароль' });
                }
            }, 1500);
        });
    }

    // Обработка отправки формы
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        try {
            const result = await simulateLogin(username, password);
            
            if (result.success) {
                showNotification(result.message, 'success');
                
                // Сохранить данные если выбрано "Запомнить меня"
                if (rememberMe.checked) {
                    localStorage.setItem('rememberedUser', username);
                } else {
                    localStorage.removeItem('rememberedUser');
                }
                
                // Переход на страницу кабинета
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            }
        } catch (error) {
            showNotification(error.message, 'error');
            
            // Восстановить кнопку
            loginBtn.disabled = false;
            loginBtn.innerHTML = '<span class="btn-text">Войти</span><i class="fas fa-sign-in-alt btn-icon"></i>';
            
            // Анимация ошибки
            loginForm.classList.add('shake');
            setTimeout(() => {
                loginForm.classList.remove('shake');
            }, 500);
        }
    });

    // Восстановить сохраненный логин
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        usernameInput.value = rememberedUser;
        rememberMe.checked = true;
    }

    // Анимация при ошибке
    const style = document.createElement('style');
    style.textContent = `
        .shake {
            animation: shake 0.5s ease-in-out;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);

    // Плавное появление формы
    setTimeout(() => {
        document.querySelector('.login-form-wrapper').style.opacity = '1';
        document.querySelector('.login-form-wrapper').style.transform = 'translateY(0)';
    }, 100);
});

// Инициализация стилей при загрузке
window.onload = function() {
    const formWrapper = document.querySelector('.login-form-wrapper');
    if (formWrapper) {
        formWrapper.style.opacity = '0';
        formWrapper.style.transform = 'translateY(20px)';
        formWrapper.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    }
};