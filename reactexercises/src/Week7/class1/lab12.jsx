import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
    Autocomplete,
    Card,
    CardHeader,
    CardContent,
    Typography,
    TextField,
} from "@mui/material";
import theme from "../";
import "../../App.css";
// An example of a React Functional Component using JSX syntax
const MaterialUIEx2Component = () => {
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
    const onChange = (e, selectedOption) => {
        selectedOption
            ? setMessage(`${message} ${selectedOption}`)
            : setMessage("");
    };
    return (
        <ThemeProvider theme={theme}>

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
                                label="available fruits"
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
export default MaterialUIEx2Component;