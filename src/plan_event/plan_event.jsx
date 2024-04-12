import React, { useEffect } from 'react';
import { newEvent } from './plan_event.js';
import { useNavigate } from 'react-router-dom';

import './plan_event.css';

function PlanEvent() {
    const navigate = useNavigate();

    function createEvent() {

        let formatted_currentDate = get_formatted_currentDate();

        if (document.getElementById("date").value === formatted_currentDate) {
            let currentTime = new Date();
            let currenthour = currentTime.getHours();
            let currentminute = currentTime.getMinutes();
            currentTime = currenthour + ":" + currentminute;

            alert("Please don't schedule a time that has already happened");
        }

        newEvent(formatted_currentDate);
    }

    useEffect(() => {
        // Limits for Input Boxes
        let formatted_currentDate = get_formatted_currentDate();

        const dateInput = document.getElementById('date');
        if (dateInput) {
            dateInput.min = formatted_currentDate;
        }

    }, []);

    return (
        <>
            <section>
                <div className="plan_event_box">
                    <h2>Plan Event</h2>
                    <div className="form-floating">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="activity" name="activity" placeholder="Basketball" required />
                            <label htmlFor="activity">Activity</label>
                        </div>
                        <div className="form-floating">
                            <input type="date" className="form-control" id="date" name="date" required />
                            <label htmlFor="date">Date</label>
                        </div>
                        <div className="form-floating">
                            <input type="time" className="form-control" id="time" name="time" required />
                            <label htmlFor="time">Time</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control" id="location" name="location" placeholder="Basketball" required />
                            <label htmlFor="location">Location</label>
                        </div>
                        <button className="btn btn-primary w-100 py-2" onClick={createEvent} type="submit">Create</button>
                    </div>
                </div>
            </section>
            <section className="notification-section">
            </section>
        </>
    )
}

export default PlanEvent

function get_formatted_currentDate() {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    let currentDay = String(currentDate.getDate()).padStart(2, '0');
    let formatted_currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

    return formatted_currentDate;
}