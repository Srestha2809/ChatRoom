import React, { useState, useReducer, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Card,
    CardContent
} from "@mui/material";
import theme from "../project1/theme";
import "../App.css";

const ProductBackLog = (props) => {
    const GRAPHURL = "http://localhost:5000/graphql";
    const initialState = {
        backlogs: [],
        username: "",
        dataLoaded: false,
        tableList: [],
    };
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);

    const createTable = (listToTable) => {
        if (listToTable.length !== undefined && listToTable.length !== 0) {
            return (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ color: "rgba(245, 123, 35, 1)", fontWeight: "bolder" }}>As </TableCell>
                                <TableCell style={{ color: "rgba(245, 123, 35, 1)", fontWeight: "bolder" }}>I want to</TableCell>
                                <TableCell style={{ color: "rgba(245, 123, 35, 1)", fontWeight: "bolder" }}>So that I can</TableCell>
                                <TableCell style={{ color: "rgba(245, 123, 35, 1)", fontWeight: "bolder" }}>Relative Estimate</TableCell>
                                <TableCell style={{ color: "rgba(245, 123, 35, 1)", fontWeight: "bolder" }}>Relative Cost</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listToTable.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.asa}</TableCell>
                                    <TableCell>{row.iwantto}</TableCell>
                                    <TableCell>{row.sothatican}</TableCell>
                                    <TableCell>{row.re}</TableCell>
                                    <TableCell>{row.rc}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        }
    }

    useEffect(() => {
        if (!state.dataLoaded) {
            fetchBacklog();
            setState({ dataLoaded: true });
        }
    }, [state.backlogs]);

    const fetchBacklog = async () => {
        try {
            console.log(`Attempting to load backlogs from server...`);
            let response = await fetch(GRAPHURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({ query: "query{backlogs{asa, iwantto, sothatican, re, rc}}" }),
            });
            let json = await response.json();
            setState({
                backlogs: json.data.backlogs,
            });
            console.log(`${json.data.backlogs.length} Backlog data loaded`);
        } catch (error) {
            console.log(error);
            console.log(`Problem loading server data - ${error.message}`);//snackbar
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Card className="card">
                <CardContent>
                    <Typography style={{ marginTop: 30 }} variant="h5" color="primary">
                        Product Backlog
                    </Typography>
                    <Typography variant="h7" color="primary" style={{ textAlign: "right" }}>
                        <p>&copy;INFO3112 - DHS</p>
                    </Typography>
                </CardContent>
            </Card>
            <Typography variant="h6" color="secondary" style={{ textAlign: "center", margin: "10px" }}>
                Backlog List
            </Typography>
            <div>
                {createTable(state.backlogs)}
            </div>
        </ThemeProvider>
    );
};
export default ProductBackLog;