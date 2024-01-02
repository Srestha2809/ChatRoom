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

const Scenario1Test = () => {
  const initialState = {
    chatName: "",
    roomName: "",
    status: "",
    messages: [],
    showjoinfields: true,
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
    setState({ socket: socket });
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

  return (
    <ThemeProvider theme={theme}>
      <CardContent>
        <AppBar color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Lab 18 INFO3139 - SocketIO
            </Typography>
          </Toolbar>
        </AppBar>
      </CardContent>

      <CardContent>
        <CardHeader
          title="Scenarios 1 and 2 Test"
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
              <h4>Current Messages</h4>
              {state.messages.map((message, index) => (
                <Typography style={{ marginLeft: "5vw" }} key={index}>
                  {message}
                </Typography>
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};
export default Scenario1Test;
