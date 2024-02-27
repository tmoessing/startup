function logIn () {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let retrievdUserDataObject = JSON.parse(localStorage.getItem("userData"));

    for (let user in retrievdUserDataObject){
        if (user[userinformation]) {
            if (user[userinformation][username] == email){
                if (user[userinformation][username] == email){
                    userID = user[userinformation][]
            }
        }

    }

    

    // window.location.href = "plan_event.html";
}
