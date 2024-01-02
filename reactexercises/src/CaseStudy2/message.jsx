import React, { useEffect, useRef } from "react";
import Bubble from "./bubble";
const UserMessage = (props) => {
    const userRef = useRef(null);
    useEffect(() => {
        userRef.current.scrollIntoView(true);
    }, []);
    return (
        <div ref={userRef}>

            <Bubble message={props.message} isOwnMessage={props.isOwnMessage} roomName={props.roomName} />


        </div>
    );
};
export default UserMessage;