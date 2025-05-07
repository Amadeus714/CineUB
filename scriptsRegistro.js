document.addEventListener("DOMContentLoaded", function() {
    const registerForm = document.getElementById("registerForm");
    const passwordInput = document.getElementById("regPassword");
    const confirmPasswordInput = document.getElementById("regConfirmPassword");
    const togglePassword = document.getElementById("regTogglePassword");
    const strengthBar = document.querySelector(".strength-bar");
    const strengthText = document.querySelector(".strength-text");
    const termsModal = document.getElementById("termsModal");
    const showTerms = document.getElementById("showTerms");
    const closeModal = document.querySelector(".close-modal");
    const acceptTermsBtn = document.getElementById("acceptTermsBtn");

    let passwordVisible = false;

    // Alternar visibilidad de contraseña
    togglePassword.addEventListener("click", () => {
        passwordVisible = !passwordVisible;
        passwordInput.type = passwordVisible ? "text" : "password";
        togglePassword.textContent = passwordVisible ? "👁️‍🗨️" : "👁️";
        togglePassword.setAttribute("aria-label", passwordVisible ? "Ocultar contraseña" : "Mostrar contraseña");
    });

    // Mostrar y cerrar modal de términos
    showTerms.addEventListener("click", (e) => {
        e.preventDefault();
        termsModal.style.display = "flex";
        document.body.style.overflow = "hidden";
    });

    closeModal.addEventListener("click", () => {
        termsModal.style.display = "none";
        document.body.style.overflow = "auto";
    });

    window.addEventListener("click", (e) => {
        if (e.target === termsModal) {
            termsModal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });

    acceptTermsBtn.addEventListener("click", () => {
        termsModal.style.display = "none";
        document.body.style.overflow = "auto";
    });

    // Validar fuerza de contraseña
    passwordInput.addEventListener("input", () => {
        const value = passwordInput.value;
        const strength = getPasswordStrength(value);

        if (strength === "débil") {
            strengthBar.style.backgroundColor = "var(--weak-color)";
            strengthText.textContent = "Seguridad: Débil";
            strengthText.style.color = "var(--weak-color)";
        } else if (strength === "media") {
            strengthBar.style.backgroundColor = "var(--medium-color)";
            strengthText.textContent = "Seguridad: Media";
            strengthText.style.color = "var(--medium-color)";
        } else {
            strengthBar.style.backgroundColor = "var(--strong-color)";
            strengthText.textContent = "Seguridad: Fuerte";
            strengthText.style.color = "var(--strong-color)";
        }
    });

    function getPasswordStrength(password) {
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        const mediumRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;

        if (strongRegex.test(password)) return "fuerte";
        if (mediumRegex.test(password)) return "media";
        return "débil";
    }

    // Validación del formulario
    registerForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("regName").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const birthdate = document.getElementById("regBirthdate").value;
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        const acceptTerms = document.getElementById("acceptTerms").checked;

        let isValid = true;

        // Validar campos
        if (!name) {
            showError("regName", "Por favor ingresa tu nombre completo");
            isValid = false;
        } else {
            hideError("regName");
        }

        if (!email) {
            showError("regEmail", "Por favor ingresa tu correo");
            isValid = false;
        } else if (!validateEmail(email)) {
            showError("regEmail", "Correo no válido");
            isValid = false;
        } else {
            hideError("regEmail");
        }

        if (!birthdate) {
            showError("regBirthdate", "Selecciona tu fecha de nacimiento");
            isValid = false;
        } else {
            hideError("regBirthdate");
        }

        if (!password) {
            showError("regPassword", "Ingresa una contraseña");
            isValid = false;
        } else if (password.length < 6) {
            showError("regPassword", "Mínimo 6 caracteres");
            isValid = false;
        } else {
            hideError("regPassword");
        }

        if (!confirmPassword || confirmPassword !== password) {
            showError("regConfirmPassword", "Las contraseñas no coinciden");
            isValid = false;
        } else {
            hideError("regConfirmPassword");
        }

        if (!acceptTerms) {
            alert("Debes aceptar los Términos y Condiciones");
            isValid = false;
        }

        if (isValid) {
            simulateRegister(email);
        } else {
            registerForm.classList.add("shake");
            setTimeout(() => registerForm.classList.remove("shake"), 500);
        }
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

    function simulateRegister(email) {
        const submitBtn = registerForm.querySelector("button[type='submit']");
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Registrando...";
        submitBtn.disabled = true;

        setTimeout(() => {
            alert(`¡Registro exitoso! Bienvenido a CineStar, ${email}`);
            window.location.href = "index.html";
        }, 1500);
    }
});
