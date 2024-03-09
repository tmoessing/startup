const express = require('express');
const app = express();

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

app.listen(3000);

app.get('/events', (req, res) => {
    // Get rid of old events
    removeOldEvents()

    res.send(event_list);
});

// app.get('/create-event', (req, res) => {
//     updateEventList(req.body, );
//     res.send(event_list))
//     });

// Event Storage
let event_list = [{"Activity":"Basketball","Date":"2024-03-26","Time":"08:42","Location":"6878 S Riverwood Way, Aurora CO 80016"},
                {"Activity":"Basketball","Date":"2023-03-26","Time":"08:42","Location":"6878 S Riverwood Way, Aurora CO 80016"},
                {"Activity":"Basketball","Date":"2024-02-26","Time":"08:42","Location":"6878 S Riverwood Way, Aurora CO 80016"},
                {"Activity":"Basketball","Date":"2024-03-07","Time":"08:42","Location":"6878 S Riverwood Way, Aurora CO 80016"},
                {"Activity":"Basketball","Date":"2024-03-08","Time":"06:42","Location":"6878 S Riverwood Way, Aurora CO 80016"},
                {"Activity":"Basketball","Date":"2024-03-08","Time":"09:10","Location":"6878 S Riverwood Way, Aurora CO 80016"},
                {"Activity":"Tennis","Date":"2024-03-26","Time":"08:42","Location":"6878 S Riverwood Way, Aurora CO 80016"},
                {"Activity":"Pickleball","Date":"2024-03-26","Time":"08:42","Location":"6878 S Riverwood Way, Aurora CO 80016"},

];

// Update Events
function updateEventList(event, event_list) {
    event_list.push(event);
}

// Clean up Events
function removeOldEvents() {
	let currentDate = new Date();
	let currentYear = currentDate.getFullYear();
	let currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
	let currentDay = String(currentDate.getDate()).padStart(2, '0');

	let currentTime = new Date();
	let currentHour = currentTime.getHours();
	let currentMinute = currentTime.getMinutes();

	// Look at each event
	for (let event of event_list) {
		let [eventYear, eventMonth, eventDay] = event["Date"].split('-').map(Number);
		let [eventHour, eventMinute] = event["Time"].split(":").map(Number);

		if (currentYear < eventYear) {
			continue;
		} else if (currentYear > eventYear) {
			event_list = event_list.filter(item => item !== event);
		} else {
			// currentYear is equal to eventYear, check month
			if (currentMonth < eventMonth) {
				continue;
			} else if (currentMonth > eventMonth) {
				// event has already occurred this month
				event_list = event_list.filter(item => item !== event);
			} else {
				// currentMonth is equal to eventMonth, check day
				if (currentDay < eventDay) {
					continue;
				} else if (currentDay > eventDay) {
					// event has already occurred today
					event_list = event_list.filter(item => item !== event);
				} else {
					// currentDay is equal to eventDay, check hour
					if (currentHour < eventHour) {
						continue;
					} else if (currentHour > eventHour) {
						// event has already occurred this hour
						event_list = event_list.filter(item => item !== event);
					} else {
						// currentHour is equal to eventHour, check minute
						if (currentMinute < eventMinute) {
							continue;
						} else if (currentMinute > eventMinute) {
							// event has already occurred this minute
							event_list = event_list.filter(item => item !== event);
						} else {
							// The event is happening right now!
						}
					}
				}
			}
		}
	}
}