
import React, { useState } from 'react';

export function Admin() {
    // HW1: add an authentication form: username / password                 +
    // HW2: make an "authenticated" variable which works by useState        +
    //      if it's false - show the form
    const [authenticated, setAuthenticated] = useState(false);

    const authenticateUser  = (event) => {
        event.preventDefault();

        setAuthenticated(true); 
    };

    if (authenticated) {
        return <div>Welcome, you are authenticated!</div>;
    }

    return (
        <div>
            <form onSubmit={authenticateUser } method="post">

                <div className="container">
                    <label htmlFor="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" required />

                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required />

                    <button type="submit">Login</button>

                </div>

            </form>
        </div>
    );
}
