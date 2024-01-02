import React, { useState, useReducer, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";

import {
    Typography,
    TextField,
    Autocomplete,
    Button,
    Card,
    CardContent,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Modal,
    Box,
} from "@mui/material";
import theme from "../project1/theme";
import "../App.css";

const MemberSummary = () => {
    const initialState = {
        username: "",
        backlogs: [],
        members: [],
        selectedMember: "",
        selectedRow: null,
        modifyModalOpen: false,
        reportModalOpen: false,
        asaToUpdate: "",
        iwanttoToUpdate: "",
        reToUpdate: 0,
        ahToUpdate: 0,
        backlogByMember: [],
    };
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);
    const [autocompleteValue, setAutoCompleteValue] = useState("");
    const GRAPHURL = "http://localhost:5000/graphql";

    const onChange = (e, selectedOption) => {
        if (selectedOption && state.members.find(item => item === selectedOption) !== null) {
            console.log("Member Selected: " + state.members.find(item => item === selectedOption));
            setState({
                selectedMember: state.members.find(item => item === selectedOption)
            })
            setAutoCompleteValue(state.selectedMember);
        }
    };

    const handleRowClick = (row) => {
        console.log('row test');
        console.log(row);
        setState({
            selectedRow: row,
            modifyModalOpen: true,
            asaToUpdate: row.asa,
            iwanttoToUpdate: row.iwantto,
            reToUpdate: row.re,
            ahToUpdate: row.actualhour
        });
    };

    const handleCloseModal = () => {
        setState({
            selectedRow: null,
            modifyModalOpen: false,
            reportModalOpen: false
        })
    }

    const handleAsaToUpdateChange = (event) => {
        console.log(event.target.value);
        setState({ ...state, asaToUpdate: event.target.value });
    }

    const handleIwanttoToUpdateChange = (event) => {
        console.log(event.target.value);
        setState({ ...state, iwanttoToUpdate: event.target.value });
    }

    const handleReToUpdateChange = (event) => {
        console.log(event.target.value);
        setState({ ...state, reToUpdate: event.target.value });
    }

    const handleAhToUpdateChange = (event) => {
        console.log(event.target.value);
        setState({ ...state, ahToUpdate: event.target.value });
    }

    const updateBacklog = async () => {
        const backlogToUpdate = {
            _id: state.selectedRow._id,
            sprint: state.selectedRow.sprint,
            asa: state.asaToUpdate,
            iwantto: state.iwanttoToUpdate,
            sothatican: state.selectedRow.sothatican,
            re: parseFloat(state.reToUpdate),
            rc: parseFloat(state.selectedRow.rc),
            member: state.selectedRow.member,
            actualhour: parseFloat(state.ahToUpdate),
            subtask: state.selectedRow.subtask,
            reestimate: parseFloat(state.selectedRow.reestimate)
        }
        console.log("update id test: " + backlogToUpdate._id);

        const { _id, sprint, asa, iwantto, sothatican, re, rc, member, actualhour, subtask, reestimate } = backlogToUpdate;
        const subtasks = state.selectedRow.subtask?.map((subtask) => ({
            description: subtask.description,
            actualhour: parseFloat(subtask.actualhour),
            reestimate: parseFloat(subtask.reestimate)
        }));
        try {
            const response = await fetch(GRAPHURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `mutation($_id: String, $sprint: String, $asa: String, $iwantto: String, $sothatican: String, $re: Float, $rc: Float, $member: String, $actualhour: Float, $subtask: [SubtaskInput], $reestimate: Float) { updatebacklog(_id: $_id, sprint: $sprint, asa: $asa, iwantto: $iwantto, sothatican: $sothatican, re: $re, rc: $rc, member: $member, actualhour: $actualhour, subtask: $subtask, reestimate: $reestimate) {_id} }`,
                    variables: {
                        _id: _id,
                        sprint: sprint,
                        asa: asa,
                        iwantto: iwantto,
                        sothatican: sothatican,
                        re: re,
                        rc: rc,
                        member: member,
                        actualhour: actualhour,
                        subtask: subtasks,
                        reestimate: reestimate,
                    },
                })
            });
            if (!response.ok) {
                throw new Error(`Server error: ${response.status} ${response.statusText}`);
            }

            const { data, errors } = await response.json();

            if (errors) {
                throw new Error(errors.map((error) => error.message).join(', '));
            }

            if (data) {
                console.log(`backlog data was updated`);
                handleCloseModal();
                fetchMembers();
                renderTable();
            } else {
                console.log(`backlog data was not updated`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const showReport = () => {
        setState({
            reportModalOpen: true,
            backlogByMember: state.backlogs.filter(item => item.member === state.selectedMember)
        });
    }

    const showModalBox = () => {
        return (
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {state.selectedRow && state.selectedRow.member ? `User Stories by ${state.selectedRow.member}` : ''}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    As a:
                </Typography>
                <TextField style={{ width: '100%' }} value={state.asaToUpdate} onChange={handleAsaToUpdateChange} />
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    I want to:
                </Typography>
                <TextField style={{ width: '100%' }} value={state.iwanttoToUpdate} onChange={handleIwanttoToUpdateChange} />
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Relative Estimate(Hour: Relative Estimate * 4):
                </Typography>
                <TextField style={{ width: '100%' }} value={state.reToUpdate} onChange={handleReToUpdateChange} />
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Actual Worked Hour:
                </Typography>
                <TextField style={{ width: '100%' }} value={state.ahToUpdate} onChange={handleAhToUpdateChange} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button style={{ width: "40%", fontSize: "12px", marginTop: "15px" }} data-testid="addbutton" variant="contained" onClick={() => updateBacklog()} disabled={!state.selectedMember}>Update</Button>
                    <Button style={{ width: "40%", fontSize: "12px", marginTop: "15px" }} data-testid="addbutton" variant="contained" onClick={() => handleCloseModal()}>Close</Button>
                </div>
            </Box>
        );
    }

    const showSummaryTable = () => {
        console.log(state.backlogByMember);
        return (
            <div>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {`Summary Report - ${state.selectedMember}`}
                    </Typography>
                    <TableContainer sx={{ maxHeight: 600 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ color: "rgba(245, 123, 35, 1)", fontWeight: "bolder" }}>Sprint</TableCell>
                                    <TableCell style={{ color: "rgba(245, 123, 35, 1)", fontWeight: "bolder" }}>User Story</TableCell>
                                    <TableCell style={{ color: "rgba(245, 123, 35, 1)", fontWeight: "bolder" }}>Relative Estimate</TableCell>
                                    <TableCell style={{ color: "rgba(245, 123, 35, 1)", fontWeight: "bolder" }}>Relative Cost</TableCell>
                                    <TableCell style={{ color: "rgba(245, 123, 35, 1)", fontWeight: "bolder" }}>Re-estimate</TableCell>
                                    <TableCell style={{ color: "rgba(245, 123, 35, 1)", fontWeight: "bolder" }}>Actual Hour Worked</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {state.backlogByMember.map((row, index) => (
                                    <React.Fragment key={index}>
                                        <TableRow>
                                            <TableCell>{row.sprint}</TableCell>
                                            <TableCell>{`As a ${row.asa}\n${row.iwantto}`}</TableCell>
                                            <TableCell>{row.re}</TableCell>
                                            <TableCell>{row.rc}</TableCell>
                                            <TableCell>{row.reestimate}</TableCell>
                                            <TableCell>{row.actualhour}</TableCell>
                                        </TableRow>
                                        {row.subtask.map((stRow, index) => (
                                            <TableRow key={index}>
                                                <TableCell></TableCell>
                                                <TableCell colSpan={3}>{stRow.description}</TableCell>
                                                <TableCell>{stRow.reestimate}</TableCell>
                                                <TableCell>{stRow.actualhour}</TableCell>
                                            </TableRow>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button style={{ marginLeft: "auto", marginright: "auto", width: "40%", fontSize: "12px", marginTop: "15px" }} data-testid="addbutton" variant="contained" onClick={handleCloseModal} >Close</Button>
                </Box>
            </div>
        )
    }

    const renderTable = () => {
        console.log(state.selectedMember);
        if (!state.selectedMember || !state.backlogs) {
            console.log('Selected member or backlog array doesn\'t exist');
            return null;
        }

        const data = state.backlogs.filter(item => item.member === state.selectedMember);
        console.log(data[0]);

        return (
            <div>

                <Typography variant="h6" color="secondary" style={{ textAlign: "center", margin: "10px" }}>
                    Click User Story to Modify
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: "rgba(245, 123, 35, 1)", fontWeight: "bolder" }}>Sprint</TableCell>
                            <TableCell style={{ color: "rgba(245, 123, 35, 1)", fontWeight: "bolder" }}>User Story</TableCell>
                            <TableCell style={{ color: "rgba(245, 123, 35, 1)", fontWeight: "bolder" }}>Relative Estimate</TableCell>
                            <TableCell style={{ color: "rgba(245, 123, 35, 1)", fontWeight: "bolder" }}>Actual Hour Worked</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index} onClick={() => !state.reportModalOpen && handleRowClick(row)} style={{ cursor: state.reportModalOpen ? "default" : "pointer", opacity: state.reportModalOpen ? 0.5 : 1 }}>
                                <TableCell>{row.sprint}</TableCell>
                                <TableCell>{'As a ' + row.asa + ' ' + row.iwantto}</TableCell>
                                <TableCell>{row.re}</TableCell>
                                <TableCell>{row.actualhour}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    };

    useEffect(() => {
        fetchMembers();
    }, []);
    const fetchMembers = async () => {
        try {
            console.log(`Attempting to load countries from server...`);
            let response = await fetch(GRAPHURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({ query: "query{ backlogs {_id, sprint, asa, iwantto, sothatican, re, rc, member, actualhour, subtask {description, actualhour, reestimate}, reestimate}}" }),
            });
            let json = await response.json();
            console.log(json);
            setState({
                backlogs: json.data.backlogs,
                members: [...new Set(json.data.backlogs.map(a => a.member))].filter(m => m !== ''),
            });
            console.log(`${json.data.backlogs.length} Backlog data loaded`);
        } catch (error) {
            console.log(error);
            console.log(`Problem loading server data - ${error.message}`);
        }
    };

    const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        overflowY: "auto"
    };

    return (
        <ThemeProvider theme={theme}>
            <Card className="card">
                <CardContent>
                    <Typography variant="h5" color="primary" style={{ marginTop: 20 }}>
                        Summary Report by Member
                    </Typography>
                    <Typography variant="h6" color="secondary" style={{ textAlign: "center", margin: "10px" }}>
                        Select Member
                    </Typography>
                    <div style={{ margin: "0 auto" }}>
                        <Autocomplete
                            id="members"
                            value={state.selectedMember}
                            options={state.members}
                            getOptionLabel={(option) => option}
                            style={{ width: "90%", margin: "10px" }}
                            onChange={onChange}
                            isOptionEqualToValue={(option, value) => option === value}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="members"
                                    label="members"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                        {renderTable()}
                    </div>
                    <Button style={{ marginLeft: "1vh", width: "60%", fontSize: "12px", margin: "15px" }} data-testid="addbutton" variant="contained" onClick={() => showReport()} disabled={!state.selectedMember}>Show Report</Button>
                </CardContent>
            </Card>
            <Modal
                open={state.modifyModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {showModalBox()}
            </Modal>

            <Modal
                open={state.reportModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {showSummaryTable()}
            </Modal>
        </ThemeProvider>
    );
};
export default MemberSummary;