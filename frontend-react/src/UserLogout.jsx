import React from 'react';
import { useLoginUsername } from './UserStore';

function UserLogout() {

    const { getLoginUsername } = useLoginUsername();

    const loginUsername = getLoginUsername();

    document.getElementById("loginlogout").innerHTML = "Login";

    return (
        <div className="container mt-5">
            <h2>Logout</h2>
            <header className="bg-primary text-white text-center py-5">
                <div className="container">
                    <h1 className="display-4">Bye, {loginUsername}! <br></br> Thank you for visiting e-BookStore</h1>
                    <a href="/login" className="btn btn-light btn-lg">Re-login again!</a>
                </div>
            </header>
        </div>
  );
}

export default UserLogout;
