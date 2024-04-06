const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const cfg = require('../dbConfig.json');

async function getUserByToken(token) {
    const userCollection = await connect_to_UserInformation();
    return userCollection.findOne({ token: token });
  }

async function connect_to_EventHub() {
    const url = `mongodb+srv://${cfg.userName}:${cfg.password}@${cfg.hostname}`;
    const client = new MongoClient(url);
    const db = client.db('eventHub');
    const eventCollection = db.collection('events');

    // Test Connection
    client
        .connect()
        .then(() => db.command({ ping: 1 }))
        // .then(() => console.log(`Connected to Event Database`))
        .catch((ex) => {
          console.log(`Error with ${url} because ${ex.message}`);
          process.exit(1);
        });
    
    return eventCollection
}

async function connect_to_UserInformation() {
    const url = `mongodb+srv://${cfg.userName}:${cfg.password}@${cfg.hostname}`;
    const client = new MongoClient(url);
    const db = client.db('usersInformation');
    const userCollection = db.collection('users');

    // Test Connection
    client
        .connect()
        .then(() => db.command({ ping: 1 }))
        // .then(() => console.log(`Connected to User Database`))
        .catch((ex) => {
          console.log(`Error with ${url} because ${ex.message}`);
          process.exit(1);
        });
    
    return userCollection
}

async function createEvent(event) {
    const eventCollection =  await connect_to_EventHub();

    await eventCollection.insertOne(event);
}

async function pullEvents() {
    const eventCollection = await connect_to_EventHub();
    const cursor = eventCollection.find();

    const event_list = await cursor.toArray();

    await removeOldEvents(event_list);

    const new_cursor = eventCollection.find();
    const new_events = await new_cursor.toArray();
    

    return new_events;
}

// Authetication

async function getUser(email) {
    const userCollection = await connect_to_UserInformation();
    return userCollection.findOne({email:email});
}

async function createUser(username, email, password) {
    const userCollection = await connect_to_UserInformation();

    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        username: username,
        email:email,
        password: passwordHash,
        token: uuid.v4(),
    }
    
    await userCollection.insertOne(user);

    return user;
}

module.exports = {
    createEvent,
    pullEvents,
    getUser,
    createUser, 
    getUserByToken
};


// Clean up Events
async function removeOldEvents(event_list) {
	let currentDate = new Date();
	let currentYear = currentDate.getFullYear();
	let currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
	let currentDay = String(currentDate.getDate()).padStart(2, '0');

	let currentTime = new Date();
	let currentHour = currentTime.getHours();
	let currentMinute = currentTime.getMinutes();

    let events_to_remove = []

	// Look at each event
	for (let event of event_list) {
		let [eventYear, eventMonth, eventDay] = event["Date"].split('-').map(Number);
		let [eventHour, eventMinute] = event["Time"].split(":").map(Number);

		if (currentYear < eventYear) {
			continue;
		} else if (currentYear > eventYear) {
            events_to_remove.push(event)
		} else {
			// currentYear is equal to eventYear, check month
			if (currentMonth < eventMonth) {
				continue;
			} else if (currentMonth > eventMonth) {
				// event has already occurred this month
                events_to_remove.push(event)
			} else {
				// currentMonth is equal to eventMonth, check day
				if (currentDay < eventDay) {
					continue;
				} else if (currentDay > eventDay) {
					// event has already occurred today
                    events_to_remove.push(event)
				} else {
					// currentDay is equal to eventDay, check hour
					if (currentHour < eventHour) {
						continue;
					} else if (currentHour > eventHour) {
						// event has already occurred this hour
                        events_to_remove.push(event)
					} else {
						// currentHour is equal to eventHour, check minute
						if (currentMinute < eventMinute) {
							continue;
						} else if (currentMinute > eventMinute) {
							// event has already occurred this minute
                            events_to_remove.push(event)
						} else {
							// The event is happening right now!
						}
					}
				}
			}
		}
	}

    delete_events(events_to_remove);
}

async function delete_events(events_to_remove) {
    let eventCollection = await connect_to_EventHub();
    await eventCollection.deleteMany({ _id: { $in: events_to_remove.map(event => event._id) } }    );
}