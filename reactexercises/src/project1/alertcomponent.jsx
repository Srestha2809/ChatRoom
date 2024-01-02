import React, { useState, useReducer, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
    Avatar,
    Card,
    CardHeader,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Button
} from "@mui/material";
import theme from "./theme";
import logo from "./images/worldwidelogo.png"
const AlertGui = (props) => {
    const initialState = {
        msg: "",
        snackBarMsg: "",
        contactServer: false,
        results: [],
    };
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);
    const [showTable, setShowTable] = useState(false); // add state variable for button click

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {


            let response = await fetch("/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    query: "query { project1_setup{results} }",
                }),
            });
            let json = await response.json();
            let resArr = [];
            resArr = json.data.project1_setup.results
                .replace(/([.])\s*(?=[A-Z])/g, "$1|")
                .split("|");
            let resultsArr = resArr.map((result) => {
                return { step: result };
            });
            setState({
                results: resultsArr,
            });
            props.setSnackbarMessage("running setup...");
        } catch (error) {
            console.log(error);

            props.setSnackbarMessage(`Problem loading server data - ${error.message}`);
        }
    };



    const handleButtonClick = () => {
        setShowTable(true);
        props.setSnackbarMessage("alerts collection setup completed");
    };

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
                <CardContent>
                    <Button
                        style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}
                        onClick={handleButtonClick}>Show Table</Button>
                    {showTable && ( // use showTable state variable to conditionally display table
                        <TableContainer>
                            <Table>
                                <TableBody style={{ fontSize: 'small' }}>
                                    {state.results.map((result) => (
                                        <TableRow key={result.step}>
                                            <TableCell style={{ color: '#ff1744' }}>{result.step}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </CardContent>
            </Card>

        </ThemeProvider>
    );
};

export default AlertGui;
