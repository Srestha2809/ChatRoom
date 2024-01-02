import React, { useEffect, useRef, useReducer } from "react";
import io from "socket.io-client";
import { ThemeProvider } from "@mui/material/styles";
import {
    Button,
    Toolbar,
    Card,
    AppBar,
    CardContent,
    Typography,
    TextField, CardHeader
} from "@mui/material";
import theme from "../project1/theme";
import "../App.css";
import ChatMsg from "./chatmsg"
const Scenario1Test = () => {
    const initialState = {
        chatName: "",
        roomName: "",
        status: "",
        messages: [],
        showjoinfields: true,
        isTyping: false,
        typingMsg: "",
        message: "",
    };
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);

    useEffect(() => {
        serverConnect();
    }, []);

    const serverConnect = () => {
        const socket = io.connect("localhost:5000", {
            forceNew: true,
            transports: ["websocket"],
            autoConnect: true,
            reconnection: false,
            timeout: 5000,
        });
        socket.on("nameexists", onExists);
        socket.on("welcome", addMessageToList);
        socket.on("someonejoined", addMessageToList);
        socket.on("someoneleft", addMessageToList);
        socket.on("someoneistyping", onTyping);
        socket.on("newmessage", onNewMessage);
        setState({ socket: socket });
    };

    const onTyping = msg => {
        if (msg.from !== state.chatName) {
            setState({
                typingMsg: msg.text
            });
        }
    };

    const onNewMessage = msg => {
        addMessageToList(msg);
        setState({ typingMsg: "" });
    };
    const handleJoin = () => {
        state.socket.emit("join", {
            chatName: state.chatName,
            roomName: state.roomName,
        });
    };

    const addMessageToList = (msg) => {
        let messages = state.messages;
        messages.push(msg);
        setState({
            messages: messages,
            showjoinfields: false,
            isTyping: false,
            typingMsg: "",
        });
    };

    const onExists = (msg) => {
        setState({ status: msg });
    };

    const onNameChange = (e) => {
        setState({ chatName: e.target.value, status: "" });
    };

    const onRoomChange = (e) => {
        setState({ roomName: e.target.value, status: "" });
    };

    // keypress handler for message TextField
    // keypress handler for message TextField
    const onMessageChange = e => {
        setState({ message: e.target.value });
        if (state.isTyping === false) {
            state.socket.emit("typing", { from: state.chatName }, err => { });
            setState({ isTyping: true }); // flag first byte only
        }
    };
    // enter key handler to send message
    const handleSendMessage = e => {
        if (state.message !== "") {
            state.socket.emit(
                "message",
                { from: state.chatName, text: state.message },
                err => { }
            );
            setState({ isTyping: false, message: "" });
        }
    };
    2

    return (
        <ThemeProvider theme={theme}>
            <CardContent>
                <AppBar color="primary">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            INFO3139 - SocketIO
                        </Typography>
                    </Toolbar>
                </AppBar>
            </CardContent>

            <CardContent>
                <CardHeader
                    title="Scenarios Enhanced Test"
                    sx={{ textAlign: "center", fontVariant: "h6" }}
                />
            </CardContent>
            <Card className="card">
                <CardContent>
                    {state.showjoinfields ? (
                        <div>
                            <TextField
                                onChange={onNameChange}
                                placeholder="Enter unique name"
                                autoFocus={true}
                                required
                                value={state.chatName}
                                error={state.status !== ""}
                                helperText={state.status}
                            />

                            <br />
                            <br />
                            <TextField
                                onChange={onRoomChange}
                                placeholder="Enter room name"
                                autoFocus={true}
                                required
                                value={state.roomName}
                            />
                            <br />
                            <br />
                            <Button
                                variant="contained"
                                data-testid="submit"
                                color="primary"
                                onClick={() => handleJoin()}
                                disabled={state.chatName === "" || state.roomName === ""}
                            >
                                Join
                            </Button>
                        </div>
                    ) : null}
                    {!state.showjoinfields ? (

                        <div>
                            <TextField
                                onChange={onMessageChange}
                                placeholder="type something here"
                                autoFocus={true}
                                value={state.message}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        handleSendMessage();
                                        e.target.blur();
                                    }
                                }}

                            />

                            <div className="scenario-container">
                                Messages in {state.roomName}
                                {state.messages.map((message, index) => (

                                    <ChatMsg message={message} key={index} />



                                ))}
                            </div>
                            <div>
                                <Typography color="red">{state.typingMsg}</Typography>
                            </div>

                        </div>

                    ) : null}
                </CardContent>
            </Card>
        </ThemeProvider>
    );
};
export default Scenario1Test;
