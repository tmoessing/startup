import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import loadEvents from './hangout_hub.js';

import './hangout_hub_page.css';
import './hangout_hub_table.css';
import './loader.css';


function HangoutHub() {
    const navigate = useNavigate();
    const [eventsLoaded, setEventsLoaded] = useState(false);

    useEffect(() => {
        loadEvents(navigate)
            .then(()=> {
                    setEventsLoaded(true);
            });
    });



    return (
        <>
            <section className="hangout_hub_table">
                <div id="title">
                    <h2>Hangout Hub</h2>
                </div>
                <div id="event-table">
                    <span className={`loader ${eventsLoaded ? 'hide' : ''}`}></span>
                    <table className={eventsLoaded ? 'show' : 'hide'}>
                        {/* Table content */}
                    </table>
                </div>
            </section>
        </>
    )
}

export default HangoutHub