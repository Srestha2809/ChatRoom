import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
    Toolbar,
    Card,
    AppBar,
    CardHeader,
    CardContent,
    Typography,
    TextField,
    Button,
} from "@mui/material";
import theme from "./theme";
import "../App.css";
// An example of a React Functional Component using JSX syntax
const lab11 = () => {
    const [message, setMessage] = useState('');
    const [word, setWord] = useState('');
    const submit = event => {
        event.preventDefault();
        setMessage(`${message} ${word}`);
        setWord('');
    }
    const clearMsg = () => {
        setMessage('');
    }
    return (
        <ThemeProvider theme={theme}>
            <AppBar color="secondary" style={{ marginBottom: "5vh" }}>
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        INFO3139 - Lab11
                    </Typography>
                </Toolbar>
            </AppBar>
            <Card className="card">
                <CardHeader title="String Builder" />
                <CardContent>
                    <Typography variant="h6" color="inherit">
                        String Builder
                    </Typography>
                    <Typography variant="body1" color="inherit">
                        The Message is:
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: "1vh", marginBottom: "1vh" }}>
                        {message}
                    </Typography>
                    <TextField
                        id="word"
                        placeholder="Add Word"
                        value={word}
                        onChange={e => setWord(e.target.value)}
                        size="small"
                    />

                </CardContent>
                <Button data-testid="addbutton" type="submit" variant="contained" color="primary" onClick={submit} style={{ marginRight: "1vh", marginLeft: "1vh" }} >Submit</Button>
                <Button type="reset" variant="contained" color="primary" onClick={clearMsg}>Clear Msg</Button>
            </Card>
        </ThemeProvider>

    );
};
export default lab11;