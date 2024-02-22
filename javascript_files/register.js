'use strict';

function register() {
    const fname  = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    validatePassword(password, confirmPassword)
}

function validatePassword(password, confirmPassword) {
    if (password === confirmPassword){
        return;
    }
    
    alert("Login successful. Welcome, " + emailbox.value + "!");
    

}