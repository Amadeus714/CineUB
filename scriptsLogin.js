// scriptsLogin.js
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");
    const forgotPassword = document.getElementById("forgotPassword");
    const passwordModal = document.getElementById("passwordModal");
    const closeModal = document.querySelector(".close-modal");
    const recoveryForm = document.getElementById("recoveryForm");
    
    let passwordVisible = false;
    
    // Alternar visibilidad de contraseña
    togglePassword.addEventListener("click", function() {
        passwordVisible = !passwordVisible;
        passwordInput.type = passwordVisible ? "text" : "password";
        this.textContent = passwordVisible ? "👁️‍🗨️" : "👁️";
        this.setAttribute("aria-label", passwordVisible ? "Ocultar contraseña" : "Mostrar contraseña");
    });
    
    // Mostrar modal de recuperación
    forgotPassword.addEventListener("click", function(e) {
        e.preventDefault();
        passwordModal.style.display = "flex";
        document.body.style.overflow = "hidden";
    });
    
    // Cerrar modal
    closeModal.addEventListener("click", function() {
        passwordModal.style.display = "none";
        document.body.style.overflow = "auto";
    });
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener("click", function(e) {
        if (e.target === passwordModal) {
            passwordModal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
    
    // Validación del formulario de login
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        let isValid = true;
        
        // Validar email
        if (!email) {
            showError("email", "Por favor ingresa tu correo electrónico");
            isValid = false;
        } else if (!validateEmail(email)) {
            showError("email", "Ingresa un correo electrónico válido");
            isValid = false;
        } else {
            hideError("email");
        }
        
        // Validar contraseña
        if (!password) {
            showError("password", "Por favor ingresa tu contraseña");
            isValid = false;
        } else if (password.length < 6) {
            showError("password", "La contraseña debe tener al menos 6 caracteres");
            isValid = false;
        } else {
            hideError("password");
        }
        
        if (isValid) {
            // Simular envío del formulario
            simulateLogin(email, password);
        } else {
            loginForm.classList.add("shake");
            setTimeout(() => loginForm.classList.remove("shake"), 500);
        }
    });
    
    // Formulario de recuperación
    recoveryForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const email = document.getElementById("recoveryEmail").value.trim();
        
        if (!email) {
            alert("Por favor ingresa tu correo electrónico");
            return;
        }
        
        if (!validateEmail(email)) {
            alert("Ingresa un correo electrónico válido");
            return;
        }
        
        // Simular envío de recuperación
        alert(`Se ha enviado un enlace de recuperación a ${email}`);
        passwordModal.style.display = "none";
        document.body.style.overflow = "auto";
        recoveryForm.reset();
    });
    
    // Funciones auxiliares
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        let errorElement = field.nextElementSibling;
        
        if (!errorElement || !errorElement.classList.contains("error-message")) {
            errorElement = document.createElement("div");
            errorElement.className = "error-message";
            field.parentNode.insertBefore(errorElement, field.nextSibling);
        }
        
        errorElement.textContent = message;
        errorElement.style.display = "block";
        field.style.borderColor = "var(--error-color)";
    }
    
    function hideError(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = field.nextElementSibling;
        
        if (errorElement && errorElement.classList.contains("error-message")) {
            errorElement.style.display = "none";
        }
        
        field.style.borderColor = "var(--border-color)";
    }
    
    function simulateLogin(email, password) {
        // Mostrar carga
        const submitBtn = loginForm.querySelector("button[type='submit']");
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Ingresando...";
        submitBtn.disabled = true;
        
        // Simular retraso de red
        setTimeout(() => {
            // Simular éxito o error aleatorio para demostración
            const isSuccess = Math.random() > 0.3;
            
            if (isSuccess) {
                alert(`¡Bienvenido! Has iniciado sesión como ${email}`);
                // Redirigir a la página principal
                window.location.href = "index.html";
            } else {
                showError("password", "Correo o contraseña incorrectos");
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                loginForm.classList.add("shake");
                setTimeout(() => loginForm.classList.remove("shake"), 500);
            }
        }, 1500);
    }
});