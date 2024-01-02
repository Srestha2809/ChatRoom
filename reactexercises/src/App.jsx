
//functional state hook component
import React, { useState, useReducer } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import theme from "./project1/theme";
import {
    Toolbar,
    AppBar,
    Menu,
    MenuItem,
    IconButton,
    Typography,
    Snackbar,
} from "@mui/material";
import HomePage from "./client/home";
import BasicInfo from "./client/basicinfomation";
import ProductBackLog from "./client/productbacklog";
import MemberSummary from "./client/membersummary";
import SprintSummary from "./client/SprintSummary";
import SprintSummaryReport from "./client/SprintSummaryReport";
import TeamMembers from "./client/TeamMembers";

const queryClient = new QueryClient();
const App = () => {
    const initialState = {
        gotData: false,
        snackbarMsg: "",
    };
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClose = () => { setAnchorEl(null); };
    const handleClick = (event) => { setAnchorEl(event.currentTarget); };

    const snackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setState({ gotData: false });
    };

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            INFO3112 - Sprint Compass
                        </Typography>
                        <IconButton
                            id="menubtn"
                            onClick={handleClick}
                            color="inherit"
                            style={{ marginLeft: "auto", paddingRight: "1vh" }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem component={NavLink} to="/home" onClick={handleClose}>
                                Home
                            </MenuItem>
                            <MenuItem component={NavLink} to="/basicinfo" onClick={handleClose}>
                                Basic Information
                            </MenuItem>
                            <MenuItem component={NavLink} to="/teammembers" onClick={handleClose}>
                                Team Members
                            </MenuItem>
                            <MenuItem component={NavLink} to="/productbacklog" onClick={handleClose}>
                                Backlog List
                            </MenuItem>
                            <MenuItem component={NavLink} to="/sprintsummary" onClick={handleClose}>
                                Sprint Summary
                            </MenuItem>
                            <MenuItem component={NavLink} to="/membersummary" onClick={handleClose}>
                                Summary Report by Member
                            </MenuItem>
                            <MenuItem component={NavLink} to="/sprintsummaryreport" onClick={handleClose}>
                                Sprint Summary Report
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/basicinfo" element={<BasicInfo />} />
                    <Route path="/productbacklog" element={<ProductBackLog />} />
                    <Route path="/membersummary" element={<MemberSummary />} />
                    <Route path="/teammembers" element={<TeamMembers />} />
                    <Route path="/sprintsummary" element={<SprintSummary />} />
                    <Route path="/sprintsummaryreport" element={<SprintSummaryReport />} />
                </Routes>
                <Snackbar
                    open={state.gotData}
                    message={state.snackbarMsg}
                    autoHideDuration={3000}
                    onClose={snackbarClose}
                />
            </ThemeProvider>
        </QueryClientProvider>
    );
};
export default App;