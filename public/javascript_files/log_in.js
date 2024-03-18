function logIn () {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let users_credentials = {
        email: email,
        password: password
    };

    db_user_login(users_credentials);
}


async function db_user_login(users_creditnals) {
    const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(users_creditnals),
    });

    if (response.ok) {
        window.location.href = "plan_event.html";

    } else {
        const body = await response.json()
        alert(`⚠ Error: ${body.msg}`)
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
    }
}
