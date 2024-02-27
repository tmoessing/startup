// Simulate Message Notifications
setInterval(() => {
    const randomTime = getRandomTime();
    const notificationContainer  = document.querySelector('.notification-section');
    // notificationContainer .innerHTML = `<aside class="notification"><p><span class="user">Caden</span> planned Basketball at ${randomTime} </p></aside>`;
    // chatText.innerHTML;

    const newNotification = document.createElement('aside');
    newNotification.className = '.notification';
    newNotification.innerHTML = `<p><span class="user">Caden</span> planned Basketball at ${randomTime}</p>`;
    notificationContainer.appendChild(newNotification);

    if (notificationContainer.children.length > 4) {
        notificationContainer.removeChild(notificationContainer.children[0])
    }

    notificationContainer.style.display = 'block';

  }, 5000);


function getRandomTime() {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);

    // Ensure leading zeros for single-digit hours/minutes
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${formattedHours}:${formattedMinutes}`;
}


// Set limits for input boxes
let currentDateandTime =  new Date().toISOString().split('T')[0]
// console.log(currentDateandTime)
document.getElementById('date').min = currentDateandTime

function newEvent() {
    let event_activity = document.getElementById("activity").value;
    let event_date = document.getElementById("date").value;
    let event_time = document.getElementById("time").value;
    let event_location = document.getElementById("location").value;

    if (!event_activity || !event_date || !event_time || !event_location) {
        alert("Please fill out all required fields.");
        return;
    }

    // let EventObject = createEventObject(event_activity, event_date, event_time, event_location);

    // let retrievdEventObject = JSON.parse(storedValue);
    // let newEventObject = retrievdEventObject;

    // newUserDataObject["total_events"] += 1;
    // let event_ID = newUserDataObject["total_events"];

    // Object.assign(newEventObject, {[event_ID]: EventObject});

    // localStorage.setItem("eventData", JSON.stringify(newEventObject));

    // storeEvent();

    // window.location.href = "hangout_hub.html";

    

    let EventObject = createEventObject(event_activity, event_date, event_time, event_location);
    
    let retrievdEventList = JSON.parse(localStorage.getItem("eventData"));

    retrievdEventList.push(EventObject);


    localStorage.setItem("eventData", JSON.stringify(retrievdEventList));
    
    window.location.href = "hangout_hub.html";
    
}

function createEventObject(event_activity, event_date, event_time, event_location) {
    // return EventObject = {
    //     event_details:{
    //         event_activity: event_activity,
    //         event_date: event_date,
    //         event_time: event_time,
    //         event_location: event_location},
    //     event_meta_data:{
    //         event_author: getEventAuthor(),
    //         event_creation_data: new Date().toISOString().split('T')[0]
    //     }
    // };

    return EventObject = {
            Activity: event_activity,
            Date: event_date,
            Time: event_time,
            Location: event_location}
    };


function getEventAuthor() {
    let currentUserObject = JSON.parse(localStorage.getItem("currentUser"));
    user_name = currentUserObject[first_name] + "" + currentUserObject[last_name];
    return user_name;
}

function storeEvent() {
    let currentUserObject = JSON.parse(localStorage.getItem("currentUser"));
    currentUserObject[user_statisticsz][total_events_created] += 1;
    usersEvents = currentUserObject[user_statisticsz][user_current_events]
}
