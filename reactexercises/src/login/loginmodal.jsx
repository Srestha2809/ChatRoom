import React, { useState } from 'react';
import { db, auth } from './firebaseconfig';
import { ref, query, equalTo, get, orderByChild } from 'firebase/database';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from "@mui/material";
import { onLog } from 'firebase/app';

const LogInModal = ({ visible, onCancel, onLoginHandle }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errormsg, setErrorMsg] = useState("");

    const errorMessage = 'Enter input';

    const handleLogin = () => {
        let userData;
        let userId;
        signInWithEmailAndPassword(auth, email, password)
            .then(function (_firebaseUser) {
                const usersRef = ref(db, 'users');
                const emailQuery = query(usersRef, orderByChild('email'), equalTo(email));
                get(emailQuery).then((snapshot) => {
                    if (snapshot.exists()) {
                        const givenData = snapshot.val();
                        userId = Object.keys(givenData)[0];
                        userData = givenData[userId];
                        console.log('User data: ' + userData.email);
                        
                    } else {
                        console.log('No user found with the given email.');
                    }
                }).catch((error) => {
                    console.error('Error fetching user data:', error);
                });
                
                onLoginHandle(true);

                setEmail('');
                setPassword('');
                // Close modal
                onCancel();
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
        
                if (errorCode == 'auth/wrong-password') {
                    console.log('Wrong password');
                    setErrorMsg('Wrong password');
                } else if (errorCode == 'auth/invalid-email') {
                    console.log('Invalid email address');
                    setErrorMsg('Invalid email address');
                } else if (errorCode == 'auth/user-not-found') {
                    console.log('Cannot find the user');
                    setErrorMsg('Cannot find the user');
                } else {
                    console.log(errorMessage);
                }
                console.log(error);
            }
            );
        
    };

    return (
        <Dialog open={visible} onClose={onCancel}>
            <DialogTitle>Log In</DialogTitle>
            <DialogContent>
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={email === ""}
                    helperText={errorMessage}
                    margin="dense"
                    fullWidth
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={password === ""}
                    helperText={errorMessage}
                    margin="dense"
                    fullWidth
                />
                <div style={{ textAlign: 'center' }} >{errormsg}</div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleLogin} color="primary" disabled={!email || !password}>
                    Log In
                </Button>
                <Button onClick={onCancel} color="secondary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default LogInModal;