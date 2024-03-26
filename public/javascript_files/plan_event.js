// Simulate Message Notifications
// setInterval(() => {
//     const randomTime = getRandomTime();
//     const notificationContainer  = document.querySelector('.notification-section');

//     const newNotification = document.createElement('aside');
//     newNotification.className = '.notification';
//     newNotification.innerHTML = `<p><span class="user">Caden</span> planned Basketball at ${randomTime}</p>`;
//     notificationContainer.appendChild(newNotification);

//     if (notificationContainer.children.length > 4) {
//         notificationContainer.removeChild(notificationContainer.children[0])
//     }

//     notificationContainer.style.display = 'block';

//   }, 5000);


// function getRandomTime() {
//     const hours = Math.floor(Math.random() * 24);
//     const minutes = Math.floor(Math.random() * 60);

//     // Ensure leading zeros for single-digit hours/minutes
//     const formattedHours = hours < 10 ? '0' + hours : hours;
//     const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

//     return `${formattedHours}:${formattedMinutes}`;
// }

function getPlayerName() {
    return localStorage.getItem('userName') ?? 'Mystery player';
}

// Set limits for input boxes
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
let currentDay = String(currentDate.getDate()).padStart(2, '0');
currentDate = currentYear + "-" + currentMonth + "-" + currentDay;

document.getElementById('date').min = currentDate

if (document.getElementById("date").value === currentDate) {
    let currentTime = new Date();
    let currenthour = currentTime.getHours();
    let currentminute = currentTime.getMinutes();
    currentTime = currenthour + ":" + currentminute;

    alert("Please don't schedule a time that has already happened")
}



function newEvent() {
    let event_activity = document.getElementById("activity").value;
    let event_date = document.getElementById("date").value;
    let event_time = document.getElementById("time").value;
    let event_location = document.getElementById("location").value;

    if (!event_activity || !event_date || !event_time || !event_location) {
        alert("Please fill out all required fields.");
        return;
    }

    if (document.getElementById("date").value === currentDate) {
        let currentTime = new Date();
        let currentHour = currentTime.getHours();
        let currentMinute = currentTime.getMinutes();

        let [eventHour, eventMinute] = event_time.split(":").map(Number);

        if (currentHour < eventHour) {
        } else if (currentHour > eventHour) {
            // event has already occurred this hour
            alert("Please don't schedule a time that has already happened");
            return;
        } else {
            // currentHour is equal to eventHour, check minute
            if (currentMinute < eventMinute) {
            } else if (currentMinute > eventMinute) {
                // event has already occurred this minute
                alert("Please don't schedule a time that has already happened");
                return;
            } else {
                alert("Please don't schedule a time that has already happened");
                return;
            }
        }
    }

    let EventObject = createEventObject(event_activity, event_date, event_time, event_location);



    serverCreateEvent(EventObject)
    
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

function storeEvent() {
    let currentUserObject = JSON.parse(localStorage.getItem("currentUser"));
    currentUserObject[user_statisticsz][total_events_created] += 1;
    usersEvents = currentUserObject[user_statisticsz][user_current_events]
}

async function serverCreateEvent(EventObject) {
    const response = await fetch('/api/create-event', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(EventObject),
        });

    if (response.ok) {
        broadcastEvent(getPlayerName(), EventCreatedEvent, EventObject.Activity)
        window.location.href = "hangout_hub.html";
    } else {
        if (response.status == 401) {
            alert(`⚠ Unauthorized to make an event. Please Log in or Create an Account`)
            window.location.href = "log_in.html";
        }
    }
}

function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    // socket.onopen = (event) => {
    //   displayMsg('system', 'game', 'connected');
    // };
    // socket.onclose = (event) => {
    //   displayMsg('system', 'game', 'disconnected');
    // };
    socket.onmessage = async (event) => {
      const msg = JSON.parse(await event.data.text());
      if (msg.type === EventCreatedEvent) {
        displayMsg('user', msg.user, `${msg.activity}`);
      } 
    //   else if (msg.type === GameStartEvent) {
    //     // this.displayMsg(getPlayerName(), msg.user, `started a new game`);
    //   }
    };
}

function displayMsg(cls, from, msg) {
    const notificationContainer  = document.querySelector('.notification-section');

    const newNotification = document.createElement('aside');
    newNotification.className = '.notification';
    newNotification.innerHTML = `<p><span class="user">${user}</span> planned ${event}</p>`;
    notificationContainer.appendChild(newNotification);

    if (notificationContainer.children.length > 4) {
        notificationContainer.removeChild(notificationContainer.children[0])
    }

    notificationContainer.style.display = 'block';
};

function broadcastEvent(from, type, value) {
    const event = {
      user: user,
      type: type,
      activity: activity,
    };
    socket.send(JSON.stringify(event));
};
