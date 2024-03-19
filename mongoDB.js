const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const cfg = require('./dbCongfig.json');

async function connect_to_EventHub() {
    const url = `mongodb+srv://${cfg.userName}:${cfg.password}@${cfg.hostname}`;
    const client = new MongoClient(url);
    const db = client.db('eventHub');
    const eventCollection = db.collection('events');

    // Test Connection
    client
        .connect()
        .then(() => db.command({ ping: 1 }))
        .then(() => console.log(`Connected to Event Database`))
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
        .then(() => console.log(`Connected to User Database`))
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
    const events = await cursor.toArray();

    return events;
}

// Authetication

async function getUser(email) {
    const userCollection = await connect_to_UserInformation();
    return userCollection.findOne({email:email});
}

async function createUser(email, password) {
    const userCollection = await connect_to_UserInformation();

    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
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
    createUser
};
