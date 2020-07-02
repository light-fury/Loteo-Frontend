import React, {useState} from "react";
import chat from "../chat";
import "./chatLogin.scss";
import {Redirect} from "react-router-dom";
chat.init();

const ChatLogin = () => {
    const [username, setUserName] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = e => {
        if (username !== "") {
            e.preventDefault();
            login();
        }
    };
    const toggleIsSubmitting = () => {
        setIsSubmitting(!isSubmitting);
    };
    const login = () => {
        toggleIsSubmitting();
        chat.login(username)
            .then(user => {
                setUser(user);
                setIsAuthenticated(true);
            })
            .catch(error => {
                setErrorMessage("Please enter a valid username");
                toggleIsSubmitting();
                console.log(error);
            });
    };
    const handleInputChange = e => {
        setUserName(e.target.value);
    };
    if (isAuthenticated) {
        return (
            <Redirect
                to={{
                    pathname: "/chat",
                    state: {user}
                }}
            />
        );
    }
    return (
        <div className="chat-app">
            <h1>COMETCHAT</h1>
            <p>
                Create an account through your CometChat dashboard or login with one of our test users, superhero1,
                superhero2, etc.
            </p>
            <form className="form" onSubmit={onSubmit}>
                <input onChange={handleInputChange} type="text" />
                <span className="error">{errorMessage}</span>
                {isSubmitting ? <span>Loading</span> : <input type="submit" disabled={username === ""} value="LOGIN" />}
            </form>
        </div>
    );
};
export default ChatLogin;
