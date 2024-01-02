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
  TableRow,
  TableCell,
  TableBody,
  Tab,
  Button,
} from "@mui/material";
import DisplayMember from "./DisplayMember";
import theme from "../project1/theme";
const ManageMembers = () => {
  const initialState = {
    members: [],
    nameBool: false,
    roleBool: false,
    name: "",
    role: "",
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [memberState, setState] = useReducer(reducer, initialState);
  useEffect(() => {
    getMembers();
  }, []);
  const getMembers = async () => {
    try {
      let response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          query:
            "query {members{_id,name,role}}"
        }),
      });
      let json = await response.json();
      setState({ members: json.data.members });
    } catch (error) {
      console.log(error);
    }
  }
  const addMember = async () => {
    try {
      let response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          query:
            "mutation($name: String, $role: String) { addmember(name: $name, role: $role) {name,role} }",
          variables: { name: memberState.name, role: memberState.role },
        }),
      });
      let json = await response.json();
    } catch (error) {
      console.log(error);
    }
    getMembers();
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
    <ThemeProvider theme={theme}>
      <Card className="card">
        <CardHeader
          title="Manage Members"
          style={{ color: theme.palette.primary.main, textAlign: "center", marginTop: 20 }}
        />
        <CardContent>
          <br />
          <TextField
            onChange={(e) => onChangeName(e.target.value)}
            placeholder="Enter the member name"
          ></TextField>
          <TextField
            onChange={(e) => onChangeRole(e.target.value)}
            placeholder="Enter the member role"
          ></TextField>
        </CardContent>
        <Button
          disabled={!memberState.roleBool || !memberState.nameBool}
          onClick={addMember}
        >
          Add Member
        </Button>
        <CardContent>
          <Table>
            <TableBody>
              {memberState.members.map((item) => (
                <TableRow key={item.name}>
                  <TableCell><DisplayMember data={item} refreshMembers={getMembers} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};
export default ManageMembers;
