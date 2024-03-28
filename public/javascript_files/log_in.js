function logIn () {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let users_credentials = {
        email: email,
        password: password
    };

    db_user_login(users_credentials);
}


async function db_user_login(users_credentials) {
    const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(users_credentials),
    });

    if (response.ok) {
        console.log(users_credentials.email);
        const user = await fetch(`/api/user/${users_credentials.email}`, {
            method: 'GET',
            headers: {'content-type': 'application/json'},
        })
        userinfo = await user.json();

        localStorage.setItem('userName', userinfo.username);
        window.location.href = "plan_event.html";

    } else {
        const body = await response.json()
        alert(`⚠ Error: ${body.msg}`)
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
    }
}
