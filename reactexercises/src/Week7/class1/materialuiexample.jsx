import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
    AppBar,
    Toolbar,
    Autocomplete,
    Card,
    CardHeader,
    CardContent,
    Typography,
    TextField,
} from "@mui/material";
import theme from "../../Week6/theme";
import "../../App.css";
import MenuIcon from "@mui/icons-material/Menu";
const Lab12 = () => {
    const [message, setMessage] = useState('');

    const onChange = (e, selectedOption) => {
        selectedOption
            ? setMessage(`${message} ${selectedOption}`)
            : setMessage("");
    };
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>

                    <Typography>INFO3139 Exercises - Lab12</Typography>
                </Toolbar>
            </AppBar>
            <Card className="card">
                <CardHeader title="Sentence Builder using - Autocomplete"
                    style={{ textAlign: "center" }} />
                <CardContent>

                    <Autocomplete
                        id="pickWords"
                        options={pickWords}
                        getOptionLabel={(option) => option}
                        style={{ width: 300 }}
                        onChange={onChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                id="input"
                                placeholder="pick a word"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                    <p />
                    <Typography variant="body2" style={{ marginTop: "1vh", marginBottom: "1vh" }}>
                        {message}
                    </Typography>

                </CardContent>
            </Card>
        </ThemeProvider>

    );
};
const pickWords = ['Hey', 'I', 'built', 'a', 'sentence.', 'Srestha Bharadwaj'];
export default Lab12;
