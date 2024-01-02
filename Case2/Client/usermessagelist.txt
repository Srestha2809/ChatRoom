import { List } from "@mui/material";
import UserMessage from "./message";
import "../App.css";
const UserList = (props) => {
    let messages = props.messages.map((message, idx) => {
        const isOwnMessage = message.from === props.chatName;
        return <UserMessage key={idx} message={message} isOwnMessage={isOwnMessage} roomName={props.roomName} />;
    });

    return <List>{messages}</List>;
};
export default UserList;