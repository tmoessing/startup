'use strict';

function register() {
    let email = document.getElementById("email").value;

    let fname  = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    // Validate that required fields are not empty
    if (!fname || !lname || !email || !password || !confirmPassword) {
        alert("Please fill out all required fields.");
        return;
    }

    // let UserDataObject = createUserDataObject(fname, lname, email, password);

    if (!validatePassword(password, confirmPassword)){
        // Clear Password Boxes
        document.getElementById("password").value = "";
        document.getElementById("confirmPassword").value = "";

        alert("Password's do not Match");
        return;
    }

    let UserObject = createUserDataObject(fname, lname, email, password);
    
    DB_create_User(UserObject);

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

    // let username = email;
    // let gender;
    // let phone;
    // let birthday;
    
    // let user_current_events;
    // let total_events_created;
    // let total_events_joined;

    let UserDataObject = {
        first_name: fname,
        last_name: lname,
        email: email,
        password: password,
        account_creation_date: currentDate,
        
        // usermeta:{
        //     referral_source: referral_source,
        //     account_status: account_status,
        //     last_login_date: last_login_date,
        //     timezone: timezone
        // },
        // userinformation:{
        //     username: username,
        //     gender: gender,
        //     phone: phone,
        //     birthday: birthday,
        // },
        // userstatistics:{
        //     user_current_events: {},
        //     total_events_created: total_events_created,
        //     total_events_joined: total_events_joined
        // }
    }

    return UserDataObject;
}

async function DB_create_User(UserObject) {
    const response = await fetch('/api/auth/create', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(UserObject),
    });
    if (response.ok) {
        window.location.href = "plan_event.html";
    } else {
        const body = await response.json();
        alert(`⚠ Error: ${body.msg}`)
        document.getElementById("email").value = "";
        document.getElementById("fname").value = "";
        document.getElementById("lname").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confirmPassword").value = "";
    }
}