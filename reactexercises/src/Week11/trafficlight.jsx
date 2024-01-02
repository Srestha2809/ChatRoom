import React, { useEffect, useState } from "react";
import "../App.css";
import io from "socket.io-client";

const Trafficlight = (props) => {
    const [color, setColor] = useState("red");
    const [status, setStatus] = useState("connecting...");

    useEffect(() => {
        // Emit join message to server
        const socket = io.connect();
        //   const socket = io.connect("localhost:5000", {
        //     forceNew: true,
        //   transports: ["websocket"],
        // autoConnect: true,
        //  reconnection: false,
        //  timeout: 5000,
        //});
        socket.on("connect", () => {
            setStatus("connected");
            socket.emit("join", props.street);
        });
        // Handle turnLampOn message from server
        socket.on("turnLampOn", (lampData) => {
            socket.disconnect();
            handleTurnLampOn(lampData);
        });

        socket.on("disconnect", () => {
            setStatus("disconnected");
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleTurnLampOn = async (lampData) => {
        while (true) {
            await waitSomeSeconds(lampData.green, "green");
            await waitSomeSeconds(lampData.yellow, "yellow");
            await waitSomeSeconds(lampData.red, "red");
        }
    };

    const waitSomeSeconds = (waitTime, nextColorToIlluminate) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                setColor(nextColorToIlluminate);
                resolve();
            }, waitTime);
        });
    };

    const getStateColor = (c) => (color === c ? color : "white");

    return (
        <div>
            <p>{status}</p>
            <div className="light">
                <div
                    className="lamp"
                    style={{ backgroundColor: getStateColor("red"), margin: ".5rem" }}
                />
                <div
                    className="lamp"
                    style={{ backgroundColor: getStateColor("yellow"), margin: ".5rem" }}
                />
                <div
                    className="lamp"
                    style={{ backgroundColor: getStateColor("green"), margin: ".5rem" }}
                />
                <div style={{ textAlign: "center", fontName: "Helvetica" }}>
                    {props.street}
                </div>
            </div>
        </div>
    );
};

export default Trafficlight;
