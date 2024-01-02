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
    CardContent,
    TextField,
    Button,
    Box
} from "@mui/material";
import theme from "../project1/theme";
import "../App.css";

const BasicInformation = (props) => {
    const GRAPHURL = "http://localhost:5000/graphql";
    const initialState = {
        basicInfo: [],
        dataLoaded: false
    };
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);
    const [projectname, setProjectname] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const createTable = (listToTable) => {
        if (listToTable !== undefined) {
            return (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ color: "rgba(245, 123, 35, 1)", fontWeight: "bolder" }}>Project Name </TableCell>
                                <TableCell style={{ color: "rgba(245, 123, 35, 1)", fontWeight: "bolder" }}>Description</TableCell>
                                <TableCell style={{ color: "rgba(245, 123, 35, 1)", fontWeight: "bolder" }}>Start Date</TableCell>
                                <TableCell style={{ color: "rgba(245, 123, 35, 1)", fontWeight: "bolder" }}>End Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listToTable.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.projectname}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{row.startDate}</TableCell>
                                    <TableCell>{row.endDate}</TableCell>
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
            fetchBasicInfo();
            setState({ dataLoaded: true });
        }
    }, [state.backlogs]);

    const fetchBasicInfo = async () => {
        try {
            console.log(`Attempting to load basic info from server...`);
            let response = await fetch(GRAPHURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({ query: "query{ basicinfo {_id, projectname, description, startDate, endDate } }" }),
            });
            let json = await response.json();
            setState({
                basicInfo: json.data.basicinfo,
            });
            console.log(`Basic Information data loaded`);
        } catch (error) {
            console.log(error);
            console.log(`Problem loading server data - ${error.message}`);//snackbar
        }
    };
    const handleSubmit = async () => {
        try {
            const response = await fetch(GRAPHURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    query: `mutation {
                                addBasicInfo(projectname: "${projectname}", description: "${description}", startDate: "${startDate}", endDate: "${endDate}") {
                                    projectname
                                    description
                                    startDate
                                    endDate
                                }
                            }`,
                }),
            });
            const json = await response.json();
            console.log(json);
            fetchBasicInfo();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (_id) => {
        try {
            const response = await fetch(GRAPHURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    query: `mutation {
                deleteBasicInfo(_id: "${_id}") {
                  _id
                }
              }`,
                }),
            });
            const json = await response.json();
            console.log(json);
            fetchBasicInfo();
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <ThemeProvider theme={theme}>
            <Card className="card">
                <CardContent>
                    <Typography style={{ marginTop: 30 }} variant="h4" gutterBottom>
                        Basic Information
                    </Typography>
                    <form>
                        <TextField
                            id="projectname"
                            label="Project Name"
                            value={projectname}
                            onChange={(e) => setProjectname(e.target.value)}
                            variant="outlined"
                            fullWidth
                            style={{ marginBottom: 20 }}
                        />
                        <TextField
                            id="description"
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            style={{ marginBottom: 20 }}
                        />
                        <TextField
                            id="startDate"
                            label="Start Date"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ marginRight: 20 }}
                        />
                        <TextField
                            id="endDate"
                            label="End Date"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Box marginTop={2} display="flex" justifyContent="flex-end">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                style={{ marginTop: 20 }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </form>
                    <TableContainer component={Paper} style={{ marginTop: 30 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Project Name</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Start Date</TableCell>
                                    <TableCell>End Date</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {state.basicInfo.map((info, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{info.projectname}</TableCell>
                                        <TableCell>{info.description}</TableCell>
                                        <TableCell>{info.startDate}</TableCell>
                                        <TableCell>{info.endDate}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleDelete(info._id)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
};

export default BasicInformation;