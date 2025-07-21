const passwordInput = document.querySelector(".password");
const usernameInput = document.querySelector(".username");
const messageBox = document.getElementById("mes");

passwordInput.onfocus = () => {
    messageBox.innerHTML = "Enter a strong password";
    messageBox.style.color = "red";
};

passwordInput.onblur = () => {
    const pw = passwordInput.value;
    if (validatePassword(pw)) {
        messageBox.innerHTML = "";
        messageBox.style.color = "";
    } else {
        messageBox.innerHTML = "Weak password. Must be 8+ chars, include uppercase, lowercase, number & symbol.";
        messageBox.style.color = "red";
    }
};

usernameInput.onblur = () => {
    const username = usernameInput.value;
    if (validateUsername(username)) {
        messageBox.innerHTML = "";
        messageBox.style.color = "";
    } else {
        messageBox.innerHTML = "Username must be 3-16 characters, only letters, numbers and underscores.";
        messageBox.style.color = "red";
    }
};

function validatePassword(pw) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(pw);
}

function validateUsername(name) {
    const regex = /^[a-zA-Z0-9_]{3,16}$/;
    return regex.test(name);
}
const params = new URLSearchParams(window.location.search);
const error = params.get('error');
if (error) {
    let message = "";
    if (error === "UserExists") {
      message = "usernmae is alerady use";
    } else if (error === "UserNotFound") {
      message = "username is not found";
    } else if (error === "WrongPassword") {
      message = "password not found";
    }
    messageBox.innerHTML = message;
    messageBox.style.color = "red";
}