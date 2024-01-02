import React, { useReducer, useEffect, useCallback } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Button
} from "@mui/material";
import "../App.css";
import LogInModal from '../login/loginmodal';
import SignUpModal from '../login/signupmodal';

const HomePage = () => {
    const initialState = {
        visibleLog: false,
        visibleSign: false,
        loggedIn: false,
    };
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);

    const closeLogModel = () => {
        setState({ visibleLog: false })
    };
    const closeSignModel = () => {
        setState({ visibleSign: false })
    };
    const logIn = () => {
        setState({ loggedIn: true })
    }
    const logInButton = () => {
        setState({ visibleLog: true });
    }
    const signUpButton = () => {
        setState({ visibleSign: true });
    }
    return (
        <div>
            <LogInModal visible={state.visibleLog} onCancel={closeLogModel} onLoginHandle={logIn}></LogInModal>
            <SignUpModal visible={state.visibleSign} onCancel={closeSignModel}></SignUpModal>
            <Card className="card">
                <CardContent>
                    <Typography style={{ marginTop: 30 }} variant="h5" color="primary">
                        Backlog Sprint Compass
                    </Typography>
                    <Typography variant="h7" color="primary" style={{ textAlign: "right" }}>
                        <p>&copy;INFO3112 - DHS</p>
                    </Typography>
                    <Button onClick={logInButton}>Login</Button>
                    <Button onClick={signUpButton}>Sign Up</Button>
                </CardContent>
            </Card>
        </div>
    );
};
export default HomePage