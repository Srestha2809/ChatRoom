import React from "react";
import "../App.css";
const ChatMsg = (props) => {
    return (

        <div

            className="scenario-message"
            style={{ backgroundColor: props.message.color, textAlign: "left" }}
        >
            <span className="timestamp">
                {props.message.from} Says @{props.message.timestamp}:
            </span>
            <br />
            {props.message.chatName}
            {props.message.roomName}
            {props.message.text}
            {console.log(props.message)}
        </div>
    );
};
export default ChatMsg;