'use strict';

function register() {
    let fname  = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    let UserDataObject = createUserDataObject(fname, lname, email, password);

    // validatePassword(password, confirmPassword)
    console.log(JSON.stringify(UserDataObject));

    localStorage.setItem("UserDataObject", JSON.stringify(UserDataObject));

    let retrievedUserDataObject = JSON.parse(localStorage.getItem("UserDataObject"));
    console.log(retrievedUserDataObject);
}

function validatePassword(password, confirmPassword) {
    if (password === confirmPassword){
        return;
    } else {
        alert("ERROR!");
        
    }
    


}



function createUserDataObject(fname, lname, email, password) {
    let userID = Math.random()
    let currentDate =  new Date().toISOString().split('T')[0];
    let referral_source;
    let account_status;
    let last_login_date = new Date().toISOString().split('T')[0];
    let timezone;

    let username;
    let gender;
    let phone;
    let birthday;
    
    let user_current_events;
    let total_events_created;
    let total_events_joined;

    let UserDataObject = {
        usermeta:{
            userID: userID,
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
            user_current_events: user_current_events,
            total_events_created: total_events_created,
            total_events_joined: total_events_joined
        }
    }

    return UserDataObject;
}