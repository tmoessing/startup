const express = require('express');
const app = express();

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

app.listen(3000);

app.get('/events', (req, res) => {
    console.log("INSIDE BACKEND IT'S A PARTY");
    res.send(events);
});

app.get('/create-event', (req, res) => {
    events = updateEvents(req.body, scores);
    res.send(events);
    });

// Event Storage
let events = [{"Activity":"Basketball","Date":"2024-03-26","Time":"08:42","Location":"6878 S Riverwood Way, Aurora CO 80016"}];
function updateEvents(event, events) {

    events.push(event);

    return events;
}