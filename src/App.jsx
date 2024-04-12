import React from 'react';

import {
    BrowserRouter,
    NavLink,
    Routes,
    Navigate,
    Route
} from 'react-router-dom';



// Components
import Header from './header/header.jsx'
import Footer from './footer/footer.jsx'

import Home from './home/home.jsx'
import HangoutHub from './hangout_hub/hangout_hub.jsx'
import Register from './register/register.jsx'
import Login from './login/login.jsx'
import PlanEvent from './plan_event/plan_event.jsx'

import {configureWebSocket } from './socket.js';
import logOut from './log_out.js';
configureWebSocket();

// CSS Styling
import './main.css'
import './index.css'

function App() {
    return (
        <>
            <Header />
            <BrowserRouter>
                <div className='app'>
                    <nav className="yellow-nav-bar">
                        <menu>
                            <NavLink to='/'>Home</NavLink>
                            <NavLink to='/hangout-hub'>Hangout Hub</NavLink>
                            <NavLink to='/register'>Register</NavLink>
                            <NavLink to='/log-in'>Log In</NavLink>
                            <NavLink to='/' onClick={logOut}>Log Out</NavLink>
                            <NavLink to='/plan-event'>Plan Event</NavLink>
                        </menu>
                    </nav>

                    <main>
                        <Routes>
                            <Route path='/' element={<Home />} exact />
                            <Route path='/hangout-hub' element={<HangoutHub />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/log-in' element={<Login />} />
                            <Route path='/plan-event' element={<PlanEvent />} />
                            <Route path='*' element={<Navigate to='/' replace />} />
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
            <Footer />
        </>
    )
}

export default App