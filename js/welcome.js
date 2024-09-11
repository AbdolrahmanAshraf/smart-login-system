// Function handling welcome message
function displayWelcomeMessage() {
    const firstname = localStorage.getItem('firstname');
    const welcomeMessage = document.getElementById('welcome-message');
    if (firstname) {
        welcomeMessage.innerText = `Welcome, ${firstname}!`;
    } else {
        welcomeMessage.innerText = 'Welcome!';
    }
}

// Function handling logout
function handleLogout() {
    localStorage.removeItem('firstname');
    localStorage.removeItem('currentUsername');
    window.location.href = 'index.html';
}

window.onload = displayWelcomeMessage;