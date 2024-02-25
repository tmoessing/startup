// Set limits for input boxes
let currentDateandTime =  new Date().toISOString().split('T')[0]
console.log(currentDateandTime)
document.getElementById('date').min = currentDateandTime

function newEvent() {
    let event_ID = Math.random();
    let event_activity = document.getElementById("activity").value;
    let event_date = document.getElementById("date").value;
    let event_time = document.getElementById("time").value;
    let event_location = document.getElementById("location").value;

    let EventObject = createEventObject(event_activity, event_date, event_time, event_location);

    let storedValue = localStorage.getItem("eventData");
    if (storedValue !== null) {
        let retrievdEventObject = JSON.parse(storedValue);

        let newEventObject = retrievdEventObject;

        Object.assign(newEventObject, {[event_ID]: EventObject});

        localStorage.setItem("eventData", JSON.stringify(newEventObject));

    } else {
        let newEventObject = {[event_ID]: EventObject};
        localStorage.setItem("eventData", JSON.stringify(newEventObject));
    }
        window.location.href = "hangout_hub.html";
    }

function createEventObject(event_activity, event_date, event_time, event_location) {
    return EventObject = {
        event_activity: event_activity,
        event_date: event_date,
        event_time: event_time,
        event_location: event_location,
    };
}

