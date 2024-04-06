import React from 'react';

import Header from './header/header.jsx'
import Footer from './footer/footer.jsx'

import './index.css'
import './main.css'

function App() {
    return (
        <>
            <Header />
            <nav class="yellow-nav-bar">
                <menu>
                    <a href="html_files/hangout_hub.html">Hang Out Hub</a>
                    <a href="html_files/register.html">Register</a>
                    <a href="html_files/log_in.html">Log In</a>
                    <a href="..\index.html">Log Out</a>
                    <a href="html_files/plan_event.html">Plan Event</a>
                </menu>
            </nav>

            <Footer />
        </>
    )
}

export default App