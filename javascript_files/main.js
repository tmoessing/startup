let eventID = 0;
let eventTitle
let eventDate
let eventTime
let eventLocation
let eventDescription

function onPageLoad() {
    let storedValue = localStorage.getItem("eventData");
    if (storedValue !== null) {
        console.log("Database already created")
    } else {
        let userData = {total_users: 0};
        let eventData = [];
        // localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("eventData", JSON.stringify(eventData));
    }
    }
