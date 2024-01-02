import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { Card, CardContent, CardHeader, Typography, Avatar } from "@mui/material";

import logo from "./images/worldwidelogo.png"
const ProjectHome = () => {
    return (
        <ThemeProvider theme={theme}>
            <Card className="card">

                <CardContent sx={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
                    <Avatar src={logo} alt="logo" sx={{ width: 100, height: 100 }} />
                </CardContent>
                <CardHeader
                    title="World Wide Travel Alerts"
                    sx={{ textAlign: "center", fontVariant: "h6" }}
                />
                <CardContent >
                    <br />
                    <Typography
                        color="primary"
                        style={{ float: "right", paddingRight: "1vh", fontSize: "smaller" }}
                    >
                        &copy;Info3139 - 2023
                    </Typography>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
};
export default ProjectHome;