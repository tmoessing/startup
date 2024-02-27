function logIn () {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Check if User Exists
    let potenital_password = localStorage.getItem(email);

    if (potenital_password !== null) {
        if (potenital_password === password) {
            localStorage.setItem("currentUser", email);

            window.location.href = "hangout_hub.html";
        } else {
            alert("Incorrect Password");
            document.getElementById("password").value = "";
        }
    } else { 
        alert("No user found. Please Create an Account")
        window.location.href = "register.html";
    }
    

    // window.location.href = "plan_event.html";
}
