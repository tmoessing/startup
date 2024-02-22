function logIn () {
    const email = document.getElementById("floatingInput").value;
    const password = document.getElementById("Password").value;

    const userInfo = {email: email, password: password}

    localStorage.setItem("UserName", email);
}