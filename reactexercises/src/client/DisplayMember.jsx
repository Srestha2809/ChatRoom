import React, { useReducer, useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Card,
  Autocomplete,
  CardHeader,
  CardContent,
  Snackbar,
  TextField,
  Typography,
  Table,
  Tab,
  Button,
} from "@mui/material";
import theme from "../project1/theme";
const DisplayMember = (props) => {
  const initialState = {
    nameBool: false,
    roleBool: false,
    name: props.data.name,
    role: props.data.role,
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [memberState, setState] = useReducer(reducer, initialState);
  const DeleteMember = async () => {
    try {
      let response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          query:
            "mutation($name: String) { deletemember(name: $name) {name,role} }",
          variables: { name: props.data.name },
        }),
      });
      let json = await response.json();
    } catch (error) {
      console.log(error);
    }
    props.refreshMembers();
  };
  const EditMember = async () => {
    try {
      let response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          query:
            "mutation($_id: String, $name: String, $role: String) { editmember(_id: $_id, name: $name, role: $role) {_id,name,role} }",
          variables: { _id: props.data._id, name: memberState.name, role: memberState.role },
        }),
      });
      let json = await response.json();
    } catch (error) {
      console.log(error);
    }
    props.refreshMembers();
  };
  const onChangeName = (e) => {
    if (e !== null) {
      setState({ nameBool: true, name: e });
    }
  };
  const onChangeRole = (e) => {
    if (e !== null) {
      setState({ roleBool: true, role: e });
    }
  };
  return (
    <CardContent>
      <br />
      <TextField
        onChange={(e) => onChangeName(e.target.value)}
        placeholder="Enter a name"
        defaultValue={props.data.name}
      ></TextField>
      <TextField
        onChange={(e) => onChangeRole(e.target.value)}
        placeholder="Enter a role"
        defaultValue={props.data.role}
      ></TextField>
      <div>
        <Button onClick={DeleteMember}>Delete Member</Button>
        <Button
          onClick={EditMember}
        >
          Edit Member
        </Button>
      </div>
    </CardContent>
  );
};
export default DisplayMember;
