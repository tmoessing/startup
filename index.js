const express = require('express');
const app = express();

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

app.listen(3000);

app.get('/events', (req, res) => {res.send(events);});

app.get('/create-event', (req, res) => {
    events = updateEvents(req.body, scores);
    res.send(events);
    });

// Event Storage
let events = [];
function updateEvents(event, events) {
    let found = false;

    events.push(events);

    return scores;
}