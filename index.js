const mongoDB = require('./mongoDB.js');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');



// Create an HTTP service using Node.js and Express
const express = require('express');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(cookieParser());

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));


// Your backend provides service endpoints

// Get Events
app.get('/pull-events', (req, res) => {
    // Get rid of old events
    removeOldEvents()

    res.send(event_list);
});

// Create Event
app.post('/create-event', (req, res) => {
    updateEventList(req.body, event_list);

    res.send(event_list);
    });

// Authentication
app.post('/auth/create', async (req, res) => {
	if (await mongoDB.getUser(req.body.email)) {
		res.status(409).send({ msg: 'An account is already associated with this email' });
	} else {
		const user = await mongoDB.createUser(req.body.email, req.body.password);

		setAuthCookie(res, user.token);

		res.send({
			id: user._id,
		});
	}
});

app.post('/auth/login', async (req, res) => {
	const user = await mongoDB.getUser(req.body.email);
	if (user) {
		if (await bcrypt.compare(req.body.password, user.password)) {
			setAuthCookie(res, user.token);
			res.send({id:user._id});
			return;
		}
	}
	res.status(401).send({msg: 'Unauthorized'});
});

function setAuthCookie(res, authToken) {
	res.cookie('token', authToken, {
		secure: true,
		httpOnly: true,
		sameSite: 'strict',
	});
}

app.get('/user/me', async (req, res) => {
	authToken = req.cookies['token'];
	const user = await mongoDB.connect_to_UserInformation().findOne({token: authToken});
	if (user) {
		res.send({ email: user.email });
		return;
	}
	res.status(401).send({msg: 'Unauthorized'})
});

//Frontend served up using Express static middleware

// Return application default page if the path is unknown
app.use((_req, res) => {
	res.sendFile('index.html', { root: 'public' });
  });
  
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
  });



// Event Storage
let event_list = [];

// Update Events
function updateEventList(event, event_list) {
    // event_list.push(event);
	mongoDB.createEvent(event);

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