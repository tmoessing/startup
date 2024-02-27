'use strict';

function register() {
    let email = document.getElementById("email").value;
    // if (!validateNewRegister(email)) {
    //     document.getElementById("email").value = "";
    //     document.getElementById("fname").value = "";
    //     document.getElementById("lname").value = "";
    //     document.getElementById("password").value = "";
    //     document.getElementById("confirmPassword").value = "";

    //     alert("Email already used to register");
    //     return;
    // }

    let fname  = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    // Validate that required fields are not empty
    if (!fname || !lname || !email || !password || !confirmPassword) {
        alert("Please fill out all required fields.");
        return;
    }

    let UserDataObject = createUserDataObject(fname, lname, email, password);

    if (!validatePassword(password, confirmPassword)){
        // Clear Password Boxes
        document.getElementById("password").value = "";
        document.getElementById("confirmPassword").value = "";

        alert("Password's do not Match");
        return;
    }

        
    let UserID = newUserID();

    // Update Current Users
    localStorage.setItem("currentUser", JSON.stringify({[UserID]: UserDataObject}));
    // Appends to User Data
    let retrievdUserDataObject = JSON.parse(localStorage.getItem("userData"));
    let newUserDataObject = retrievdUserDataObject;
    
    Object.assign(newUserDataObject, {[UserID]: UserDataObject});
    localStorage.setItem("userData", JSON.stringify(newUserDataObject));
    window.location.href = "plan_event.html";

}

function validatePassword(password, confirmPassword) {
    if (password === confirmPassword){
        return true;
    } else {
        return false 
    }
}

function createUserDataObject(fname, lname, email, password) {
    let currentDate =  new Date().toISOString().split('T')[0];
    let referral_source;
    let account_status;
    let last_login_date = new Date().toISOString().split('T')[0];
    let timezone;

    let username = email;
    let gender;
    let phone;
    let birthday;
    
    let user_current_events;
    let total_events_created;
    let total_events_joined;

    let UserDataObject = {
        usermeta:{
            account_creation_date: currentDate,
            referral_source: referral_source,
            account_status: account_status,
            last_login_date: last_login_date,
            timezone: timezone
        },
        userinformation:{
            username: username,
            first_name: fname,
            last_name: lname,
            gender: gender,
            email: email,
            phone: phone,
            birthday: birthday,
            password: password
        },
        userstatistics:{
            user_current_events: {},
            total_events_created: total_events_created,
            total_events_joined: total_events_joined
        }
    }

    return UserDataObject;
}

function newUserID() {
    let retrievdUserDataObject = JSON.parse(localStorage.getItem("userData"));
    retrievdUserDataObject["total_users"] += 1;
    localStorage.setItem("userData", JSON.stringify(retrievdUserDataObject));
    return retrievdUserDataObject["total_users"];
}

// function validateNewRegister(email) {
//     let retrievdUserDataObject = JSON.parse(localStorage.getItem("userData"));
//     for (let userID in retrievdUserDataObject) {
//         let userData = retrievdUserDataObject[userID]
//         if (typeof UserData === 'object') {
//             if (userData.hasOwnProperty('userinformation')){
//                 let desiredUserDataTitle = userData.hasOwnProperty('userinformation')
//                 if (desiredUserDataTitle.hasOwnProperty('email')) {
//                     let emailstored = desiredUserDataTitle.hasOwnProperty('email')
//                     if (emailstored === email) {
//                         return false;
//                     }
//                 }
//             }

//         }
//     }
//     return true;
// }