'use strict';

function register() {
    let fname  = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    let UserDataObject = createUserDataObject(fname, lname, email, password);

    if (validatePassword(password, confirmPassword)){
        let retrievdUserDataObject = JSON.parse(localStorage.getItem("userData"));
        let newUserDataObject = retrievdUserDataObject;

        newUserDataObject["total_users"] += 1;
        let userID = newUserDataObject["total_users"];

        Object.assign(newUserDataObject, {[userID]: UserDataObject});

        localStorage.setItem("userData", JSON.stringify(newUserDataObject));

        localStorage.setItem("currentUser", JSON.stringify(newUserDataObject));

        window.location.href = "plan_event.html";   
        // let retrievedUserDataObject = JSON.parse(localStorage.getItem("UserDataObject"));
    } else {
        // Clear all Boxes
        document.getElementById("fname").value = "";
        document.getElementById("lname").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confirmPassword").value = "";

        alert("Password's do not Match");
    }
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