import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Home() {
    const navigate = useNavigate();

    function logIn() {
        navigate('./log-in');
    }

    function register() {
        navigate('./register')
    }

    const [quote, setQuote] = useState({ content: '', author: '' });

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response = await fetch('https://api.quotable.io/random');
                if (!response.ok) {
                    throw new Error('Failed to fetch quote');
                }
                const data = await response.json();
                setQuote({ content: data.content, author: data.author });
            } catch (error) {
                console.error('Error fetching quote:', error);
                setQuote({ content: "TOUGH", author: "Tyler" });
            }
        };

        fetchQuote();
    }, []);

    return (
        <>
            <section className="homepage">
                <div className="description">
                    <p>We Should Hang Out is an exciting online platform designed exclusively for college students seeking vibrant social connections. Discover like-minded peers who share your interests, whether it's exploring new places, enjoying great food, staying active, or engaging in meaningful conversations. With user-friendly features, our platform makes planning meetups and group activities a breeze, fostering real-world friendships and unforgettable memories. Join us today and redefine your college experience by connecting with fellow students who are ready to make the most of every moment.</p>
                </div>

                <div id="homepage-buttons">
                    <div className="box-button">
                        <a onClick={logIn}>Log In</a>
                    </div>
                    <div className="box-button">
                        <a onClick={register}>Register</a>
                    </div>
                </div>

                <div className="picture">
                    <img alt="Friends Looking off in the distance" src="/media_files/friends.jpg" width="500" />
                </div>
                <p>_____________________________________</p>
                <div id="quote">
                    <p className="author"> {quote.content} </p>
                    <p className="quote"> {quote.author} </p>
                </div>
            </section>
        </>
    )
}

export default Home