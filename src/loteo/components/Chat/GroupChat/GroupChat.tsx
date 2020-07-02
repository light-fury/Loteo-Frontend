import React, {useState, useEffect} from "react";
import chat from "../chat";

const GroupChat = () => {
    const [messageText, setMessageText] = useState(null);
    const [groupMessage, setGroupMessage] = useState(Array);
    const [user, setUser] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const GUID = "testgroup";

    const sendMessage = () => {
        chat.sendGroupMessage(GUID, messageText).then(
            message => {
                console.log("Message sent successfully:", message);
                setMessageText(null);
                chat.getGroupMessages("testgroup", () => console.log("work")).then(res =>
                    setGroupMessage([...groupMessage, ...res])
                );
            },
            error => {
                console.log(error);
                if (error.code === "ERR_NOT_A_MEMBER") {
                    chat.joinGroup(GUID).then(() => {
                        sendMessage();
                    });
                }
            }
        );
    };
    const handleSubmit = event => {
        event.preventDefault();
        sendMessage();
        event.target.reset();
    };
    const handleChange = event => {
        setMessageText(event.target.value);
    };
    const getUser = () => {
        chat.getLoggedinUser()
            .then(user => {
                console.log("user details:", {user});
                setUser(user);
            })
            .catch(({error}) => {
                if (error.code === "USER_NOT_LOGED_IN") {
                    setIsAuthenticated(false);
                }
            });
    };
    const messageListener = () => {
        chat.addMessageListener((data, error) => {
            if (error) {
                return console.log(`error: ${error}`);
            }
            chat.getGroupMessages("testgroup", () => console.log("work")).then(res =>
                setGroupMessage([...groupMessage, ...res])
            );
        });
    };

    useEffect(() => {
        getUser();
        messageListener();
        chat.getGroupMessages("testgroup", () => console.log("work")).then(res =>
            setGroupMessage([...groupMessage, ...res])
        );
    }, []);

    if (!isAuthenticated) {
        return <></>;
    }
    return (
        <div className="chatWindow">
            <ul className="chat" id="chatList">
                {groupMessage.map((data: any) => (
                    <div key={data.id}>
                        {user && user.uid === data.sender.uid ? (
                            <li className="self">
                                <div className="msg">
                                    <p>{data.sender.uid}</p>
                                    <div className="message"> {data.data.text}</div>
                                </div>
                            </li>
                        ) : (
                            <li className="other">
                                <div className="msg">
                                    <p>{data.sender.uid}</p>
                                    <div className="message"> {data.data.text} </div>
                                </div>
                            </li>
                        )}
                    </div>
                ))}
            </ul>
            <div className="chatInputWrapper">
                <form onSubmit={handleSubmit}>
                    <input
                        className="textarea input"
                        type="text"
                        placeholder="Enter your message..."
                        onChange={handleChange}
                    />
                </form>
            </div>
        </div>
    );
};
export default GroupChat;
