import { useEffect, useRef } from "react";
import { ListItem } from "@mui/material";
import Triangle from "./triangle";
const Bubble = (props) => {
    const userRef = useRef(null);
    useEffect(() => {
        userRef.current.scrollIntoView();
    }, []);

    const alignBubble = props.isOwnMessage ? "right" : "left";
    const alignTriangle = props.isOwnMessage ? "auto 0 0 auto" : "0 auto auto 0";

    return (
        <ListItem ref={userRef} >
            <div className={`userBubble ${props.isOwnMessage ? "ownMessage" : ""}`} style={{ backgroundColor: props.message.color }}>
                <div className="timestamp" style={{ fontSize: "12px" }}>
                    <span >
                        {props.message.from} says</span>
                    <span style={{ marginLeft: "60px" }}>room:{props.roomName}
                    </span>
                    <br />
                    <span style={{ marginLeft: "100px" }}>@{props.message.timestamp}</span>
                </div>
                <br />
                <div style={{ fontWeight: "bolder" }}>{props.message.chatName} {props.message.roomName}
                    {props.message.text}</div>

            </div>
            <Triangle
                isOwnMessage={props.isOwnMessage}
                color={props.message.color}
                align={alignTriangle}
            />
        </ListItem>
    );

};
export default Bubble;
