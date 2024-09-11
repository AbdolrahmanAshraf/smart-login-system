const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const signupSection = document.getElementById('signup-section');
const loginSection = document.getElementById('login-section');
const signupErrorMessage = document.getElementById('signup-error-message');
const loginErrorMessage = document.getElementById('login-error-message');

// email and password regex
function isValidEmail(email) {
    var emailPattern = /^[a-zA-Z0-9._%+-]+@(yahoo|gmail)\.com$/;
    return emailPattern.test(email);
}

function isValidPassword(password) {
    var passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
}

// function for email check in in local storage
function emailExists(email) {
    return localStorage.getItem(email) !== null;
}

// Signup Form Submission

function handleSignup(event) {
    event.preventDefault();

    const firstname = document.getElementById('firstname-input').value;
    const email = document.getElementById('signup-email-input').value;
    const password = document.getElementById('signup-password-input').value;
    const repeatPassword = document.getElementById('repeat-password-input').value;

    signupErrorMessage.innerText = '';

    if (!isValidEmail(email)) {
        signupErrorMessage.innerText = 'Invalid email!';
        return false;
    }

    if (!isValidPassword(password)) {
        signupErrorMessage.innerText = 'Password must be at least 8 characters long, include at least one letter, one number, and one special character!';
        return false;
    }

    if (password !== repeatPassword) {
        signupErrorMessage.innerText = 'Passwords do not match!';
        return false;
    }

    if (emailExists(email)) {
        signupErrorMessage.innerText = 'Email is already used!';
        return false;
    }

    localStorage.setItem(email, JSON.stringify({ firstname, password }));

    document.getElementById('signup-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
    return false;
}


// Login Form Submission

function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('login-email-input').value;
    const password = document.getElementById('login-password-input').value;

    loginErrorMessage.innerText = '';

    if (!isValidEmail(email)) {
        loginErrorMessage.innerText = 'Invalid email!';
        return false;
    }

    const userData = localStorage.getItem(email);

    if (userData) {
        const { password: storedPassword, firstname } = JSON.parse(userData);
        if (password === storedPassword) {
            localStorage.setItem('firstname', firstname);
            localStorage.setItem('currentUsername', email);

            window.location.href = 'welcome.html';
        } else {
            loginErrorMessage.innerText = 'Invalid password!';
        }
    } else {
        loginErrorMessage.innerText = 'Email not found!';
    }
}


// Switch between login and signup sections
function showSignup() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('signup-section').style.display = 'block';
}

function showLogin() {
    document.getElementById('signup-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
}