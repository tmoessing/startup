async function logOut() {
    const response = await fetch('/api/auth/logout', {
            method: 'DELETE',
            headers: {'content-type': 'application/json'},
    });

    if (response.ok) {
        window.location.href = "../index.html"
    } 
}