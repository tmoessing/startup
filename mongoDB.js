const { MongoClient } = require('mongodb');

const cfg = require('./dbCongfig.json');

async function createEvent(event) {
    const url = `mongodb+srv://${cfg.userName}:${cfg.password}@${cfg.hostname}`;
    const client = new MongoClient(url);
    const db = client.db('weshouldhangout');
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
    
      await eventCollection.insertOne(event);
}

let event = {
    Activity: "Basketball",
    Date: "2024-03-16",
    Time: "12:00",
    Location: "Courts"
};

createEvent(event);

