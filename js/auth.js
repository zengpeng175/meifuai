/* Auth page interactions */
document.addEventListener('DOMContentLoaded', () => {
    initPasswordToggle();
    initLoginForm();
    initRegisterForm();
    initSendCode();
});

function initPasswordToggle() {
    const toggle = document.getElementById('togglePassword');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
        const passwordInput = toggle.closest('.input-wrapper').querySelector('input');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
        } else {
            passwordInput.type = 'password';
            toggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
        }
    });
}

function initLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('#email').value;
        const password = form.querySelector('#password').value;

        if (!email || !password) return;

        showMessage(form, '登录功能仅作演示，请访问 meifu.tech 进行实际登录', 'info');
    });
}

function initRegisterForm() {
    const form = document.getElementById('registerForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = form.querySelector('#password').value;
        const confirm = form.querySelector('#confirmPassword').value;

        if (password !== confirm) {
            showMessage(form, '两次输入的密码不一致', 'error');
            return;
        }

        if (password.length < 8) {
            showMessage(form, '密码至少需要 8 位', 'error');
            return;
        }

        showMessage(form, '注册功能仅作演示，请访问 meifu.tech 进行实际注册', 'info');
    });
}

function initSendCode() {
    const btn = document.getElementById('sendCode');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const emailInput = document.getElementById('email');
        if (!emailInput || !emailInput.value) {
            return;
        }

        let countdown = 60;
        btn.disabled = true;
        btn.textContent = `${countdown}s`;

        const timer = setInterval(() => {
            countdown--;
            btn.textContent = `${countdown}s`;
            if (countdown <= 0) {
                clearInterval(timer);
                btn.disabled = false;
                btn.textContent = '发送验证码';
            }
        }, 1000);
    });
}

function showMessage(form, text, type) {
    let msg = form.parentElement.querySelector('.auth-message');
    if (!msg) {
        msg = document.createElement('div');
        msg.className = 'auth-message';
        form.parentElement.insertBefore(msg, form);
    }

    msg.textContent = text;
    msg.className = `auth-message ${type}`;

    setTimeout(() => {
        msg.style.display = 'none';
    }, 5000);
}