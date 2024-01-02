import React, { useState, useReducer, useEffect, useRef } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
    Card,
    CardHeader,
    CardContent,
    Snackbar,
    TextField, Button
} from "@mui/material";
import io from "socket.io-client";
import theme from "../project1/theme";
const Lab15Client = () => {
    const initialState = { msg: "", roomMsg: "" };
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);
    const effectRan = useRef(false);
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
        if (effectRan.current) return; // React 18 Strictmode runs useEffects twice in development`
        serverConnect();
        effectRan.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const serverConnect = () => {
        try {
            // connect to server locally
            const socket = io.connect("localhost:5000", {
                forceNew: true,
                transports: ["websocket"],
                autoConnect: true,
                reconnection: false,
                timeout: 5000,
            });

            socket.on("connect_error", () => {
                setSnackbarMessage("can't get connection - try later!");
                setOpen(true);

            });

            socket.emit("join", { name: name, room: room }, (err) => { });
            socket.on("welcome", onWelcome);
            socket.on("newclient", newClientJoined);
            setState({ socket: socket });
            if (socket.io._readyState === "opening")
                // we'll see this if server is down or it'll get overwritten if its up
                setState({ msg: "trying to get connection..." });

        } catch (err) {
            console.log(err);
            setState({ msg: "some other problem occurred" });
        }
    };
    const onWelcome = (welcomeMsgFromServer) => {
        setSnackbarMessage(welcomeMsgFromServer);
        setState({ msg: welcomeMsgFromServer });
        setOpen(true);
    };
    const newClientJoined = (joinMsgFromServer) => {
        setSnackbarMessage(joinMsgFromServer);
        setState({ roomMsg: joinMsgFromServer });
        setOpen(true);
    };


    const handleClick = () => {
        serverConnect();
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleRoomChange = (event) => {
        setRoom(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const emptyorundefined =
        name === undefined ||
        name === "" ||
        room === undefined ||
        room === "";
    return (
        <ThemeProvider theme={theme}>
            <Card className="card">
                <CardHeader
                    title="Lab 15 - Socket.io"
                    sx={{ textAlign: "center", fontVariant: "h6" }}
                />
                <CardContent>

                    <div>
                        <TextField
                            label="Username"
                            value={name}
                            onChange={handleNameChange}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <TextField
                            label="Room Name"
                            value={room}
                            onChange={handleRoomChange}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClick}
                            disabled={emptyorundefined}
                        //disabled={isButtonDisabled}
                        >
                            Join
                        </Button>
                    </div>

                    {state.roomMsg ? (
                        <div style={{ paddingTop: "2vh" }}>{state.roomMsg}</div>
                    ) : null}

                </CardContent>
            </Card>
            <Snackbar
                open={open}
                message={snackbarMessage}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                autoHideDuration={6000}
                onClose={handleClose}
            />
        </ThemeProvider>
    );
};
export default Lab15Client;