import React from 'react';
import { useNavigate } from 'react-router-dom';

import loadEvents from './hangout_hub.js';

import './hangout_hub.css';

function HangoutHub() {
    const navigate = useNavigate();

    loadEvents(navigate);

    return (
        <>
            <section className="hangout_hub_table">
                <div id="title">
                    <h2>Hangout Hub</h2>
                </div>
                <div id="table">
                    <span className="loader"></span>
                    <table>

                    </table>
                </div>
            </section>
        </>
    )
}

export default HangoutHub