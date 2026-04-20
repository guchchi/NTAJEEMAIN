document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const refreshBtn = document.getElementById('refresh-captcha');
    const captchaText = document.getElementById('captcha-text');
    const loginSection = document.getElementById('login-section');
    const pdfSection = document.getElementById('pdf-viewer-section');
    const backToLoginBtn = document.getElementById('back-to-login');

    // Function to generate random captcha
    function generateCaptcha() {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        captchaText.textContent = result;
        return result;
    }

    // Initialize captcha
    let currentCaptcha = generateCaptcha();

    // Refresh captcha on button click
    refreshBtn.addEventListener('click', () => {
        currentCaptcha = generateCaptcha();
        document.getElementById('captcha-input').value = '';
    });

    // Handle form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const userInputCaptcha = document.getElementById('captcha-input').value;
        const appNumber = document.getElementById('app-number').value.trim();
        const password = document.getElementById('password').value;

        // Specific credentials provided by user
        const VALID_ID = "260311209764";
        const VALID_PASS = "@yu$paul5659v";

        // Check if captcha matches
        if (userInputCaptcha !== currentCaptcha) {
            alert('Invalid CAPTCHA. Please try again.');
            currentCaptcha = generateCaptcha();
            document.getElementById('captcha-input').value = '';
            return;
        }

        // Validate credentials
        if (appNumber === VALID_ID && password === VALID_PASS) {
            console.log('Access Granted');
            
            // Switch views
            loginSection.classList.add('hidden');
            pdfSection.classList.remove('hidden');
            
            // Scroll to top
            window.scrollTo(0, 0);
        } else {
            alert('Invalid Application Number or Password. Please check your credentials.');
        }
    });

    // Handle back button
    backToLoginBtn.addEventListener('click', () => {
        pdfSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
        
        // Reset form
        loginForm.reset();
        currentCaptcha = generateCaptcha();
    });
});
