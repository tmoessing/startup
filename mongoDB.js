const { MongoClient } = require('mongodb');

const cfg = require('./dbCongfig.json');

async function connect2Mongo() {
    const url = `mongodb+srv://${cfg.userName}:${cfg.password}@${cfg.hostname}`;
    const client = new MongoClient(url);
    const db = client.db('eventHub');
    const eventCollection = db.collection('events');

    // Test Connection
    client
        .connect()
        .then(() => db.command({ ping: 1 }))
        .then(() => console.log(`Connected to Database`))
        .catch((ex) => {
          console.log(`Error with ${url} because ${ex.message}`);
          process.exit(1);
        });
    
    return eventCollection
}

async function createEvent(event) {
    const eventCollection =  await connect2Mongo();

    await eventCollection.insertOne(event);
}

async function pullEvents() {
    const eventCollection = await connect2Mongo();
    
    const cursor = eventCollection.find();
    const events = await cursor.toArray();

    console.log(events);
}

let event = {
    Activity: "Basketball",
    Date: "2024-03-16",
    Time: "12:00",
    Location: "Courts"
};

// createEvent(event);
pullEvents();