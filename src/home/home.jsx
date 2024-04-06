import React from 'react'

function Home() {
    return (
        <>
            <section className="homepage">
                <div className="description">
                    <p>We Should Hang Out is an exciting online platform designed exclusively for college students seeking vibrant social connections. Discover like-minded peers who share your interests, whether it's exploring new places, enjoying great food, staying active, or engaging in meaningful conversations. With user-friendly features, our platform makes planning meetups and group activities a breeze, fostering real-world friendships and unforgettable memories. Join us today and redefine your college experience by connecting with fellow students who are ready to make the most of every moment.</p>
                </div>

                <div id="homepage-buttons">
                    <div className="box-button">
                        <a href="html_files/log_in.html">Log In</a>
                    </div>
                    <div className="box-button">
                        <a href="html_files/register.html">Register</a>
                    </div>
                </div>

                <div className="picture">
                    <img alt="Friends Looking off in the distance" src=" /media_files/friends.jpg" width="500"/>
                </div>
                <p>_____________________________________</p>
                <div id="quote">

                </div>
            </section>
        </>
    )
}

export default Home