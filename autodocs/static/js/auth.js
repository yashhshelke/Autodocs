// Authentication Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Tab switching
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update active form
            forms.forEach(form => {
                if (form.id === `${targetTab}-form`) {
                    form.classList.add('active');
                } else {
                    form.classList.remove('active');
                }
            });
        });
    });

    // Check URL for mode parameter
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    if (mode === 'signup') {
        document.querySelector('[data-tab="signup"]').click();
    }

    // Password visibility toggle
    const toggleButtons = document.querySelectorAll('[id^="toggle-"]');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                button.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M2 2L18 18M8.5 8.5C8.19 8.81 8 9.24 8 9.71C8 10.71 8.79 11.5 9.79 11.5C10.26 11.5 10.69 11.31 11 11"/>
            <path d="M17.94 13.57C18.62 12.82 19.18 12 19.6 11.14C19.86 10.62 20 10 20 9.29C20 8.58 19.86 7.96 19.6 7.44C18.54 5.16 15.5 2 10 2C8.77 2 7.64 2.23 6.61 2.63"/>
          </svg>
        `;
            } else {
                input.type = 'password';
                button.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7Z"/>
            <path d="M2 10C2 10 5 4 10 4C15 4 18 10 18 10C18 10 15 16 10 16C5 16 2 10 2 10Z"/>
          </svg>
        `;
            }
        });
    });

    // Password strength checker
    const signupPassword = document.getElementById('signup-password');
    const strengthFill = document.getElementById('strength-fill');
    const strengthText = document.getElementById('strength-text');

    if (signupPassword) {
        signupPassword.addEventListener('input', (e) => {
            const password = e.target.value;
            const strength = calculatePasswordStrength(password);

            strengthFill.className = 'strength-fill';

            if (password.length === 0) {
                strengthFill.style.width = '0%';
                strengthText.textContent = 'Enter a password';
            } else if (strength < 3) {
                strengthFill.classList.add('weak');
                strengthText.textContent = 'Weak password';
                strengthText.style.color = 'var(--color-danger)';
            } else if (strength < 5) {
                strengthFill.classList.add('medium');
                strengthText.textContent = 'Medium password';
                strengthText.style.color = 'var(--color-warning)';
            } else {
                strengthFill.classList.add('strong');
                strengthText.textContent = 'Strong password';
                strengthText.style.color = 'var(--color-success)';
            }
        });
    }

    function calculatePasswordStrength(password) {
        let strength = 0;

        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z\d]/.test(password)) strength++;

        return strength;
    }

    // Form submissions
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');

    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;

        // Simulate authentication
        console.log('Sign in:', { email, password });

        // Show loading state
        const submitBtn = signinForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `
      <svg class="animate-spin" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10 2V6M10 14V18M18 10H14M6 10H2M15.66 4.34L13.24 6.76M6.76 13.24L4.34 15.66M15.66 15.66L13.24 13.24M6.76 6.76L4.34 4.34"/>
      </svg>
      Signing in...
    `;
        submitBtn.disabled = true;

        // Redirect after delay
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 1500);
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        // Simulate registration
        console.log('Sign up:', { name, email, password });

        // Show loading state
        const submitBtn = signupForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `
      <svg class="animate-spin" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10 2V6M10 14V18M18 10H14M6 10H2M15.66 4.34L13.24 6.76M6.76 13.24L4.34 15.66M15.66 15.66L13.24 13.24M6.76 6.76L4.34 4.34"/>
      </svg>
      Creating account...
    `;
        submitBtn.disabled = true;

        // Redirect after delay
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 1500);
    });

    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', () => {
            const provider = button.textContent.trim();
            console.log(`Social login with ${provider}`);
            // Implement OAuth flow here
        });
    });
});
