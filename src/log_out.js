import { useNavigate } from 'react-router-dom';

async function logOut(navigate) {
    const response = await fetch('/api/auth/logout', {
            method: 'DELETE',
            headers: {'content-type': 'application/json'},
    });

    if (response.ok) {
        localStorage.removeItem('userName');
        console.log("trying to go home")
        useNavigate('/')
    } 
}

export default logOut