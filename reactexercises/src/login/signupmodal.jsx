import React, { useState } from 'react';
import { db, auth } from './firebaseconfig';
import { ref, set } from 'firebase/database';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from "@mui/material";

const SignUpModal = ({ visible, onCancel }) => {
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [password, setPassword] = useState("");
    const [errormsg, setErrorMsg] = useState("");

    const errorMessage = 'Enter input';

    const handleSignup = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(function (_firebaseUser) {
                if (auth.currentUser && auth.currentUser.uid) {
                    var userId = auth.currentUser.uid;
                    console.log(userId);
                    set(ref(db, 'users/' + userId), {
                        name: fullname,
                        email: email,
                    });
                    // Reset input fields
                    setEmail("");
                    setFullname("");
                    setPassword("");
                    // Close modal
                    onCancel();
                }
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
        
                if (errorCode == 'auth/weak-password') {
                    console.log('The password is too weak');
                    setErrorMsg('The password is too weak');
                } else if (errorCode == 'auth/invalid-email') {
                    console.log('Invalid email address');
                    setErrorMsg('Invalid email address');
                } else {
                    console.log(errorMessage);
                }
                console.log(error);
            }
            );
        
    };

    return (
        <Dialog open={visible} onClose={onCancel}>
            <DialogTitle>Sign Up</DialogTitle>
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
                    label="Full Name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    error={fullname === ""}
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
                <div style={{ textAlign: 'center' }}>{errormsg}</div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSignup} color="primary" disabled={!email || !fullname || !password}>
                    Sign Up
                </Button>
                <Button onClick={onCancel} color="secondary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SignUpModal;