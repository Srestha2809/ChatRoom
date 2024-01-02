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
import DisplayBacklog from "./DisplayBacklog";
import theme from "../project1/theme";
const SprintSummaryReport = () => {
  const initialState = {
    backlogs: [],
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [backlogState, setState] = useReducer(reducer, initialState);
  useEffect(() => {
    getBacklogs();
  }, []);
  const getBacklogs = async () => {
    try {
      let response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          query:
            "query {getbacklog{_id,sprint,asa,iwantto,sothatican,re,rc,member,actualhour,subtask{description,actualhour,reestimate},reestimate}}",
        }),
      });
      let json = await response.json();
      setState({ backlogs: json.data.getbacklog });
    } catch (error) {
      console.log(error);
    }
  };
  const tableStyle = {
    border: "none"
  }
  return (
    <ThemeProvider theme={theme}>
      <Card className="card">
        <CardHeader
          title="Sprint Summary Report"
          style={{ color: theme.palette.primary.main, textAlign: "center", marginTop: 20 }}
        />
        <CardContent>
          {backlogState.backlogs.map((item, index) => (
            <CardContent>
              <div>
                Backlog Item # {index + 1}: Sprint {item.sprint}
              </div>
              <div>
                Developed By: {item.member}
              </div>
              <div>
                Relative Estimate (1 is 4 hours): {item.re}
              </div>
              Relative Cost: ${item.rc}
              <div>
                As a {item.asa} I want to {item.iwantto} so that I can{" "}
                {item.sothatican}
              </div>
              <div>
                <Table style={tableStyle}>
                  <TableBody>
                    <TableRow key={item._id}>
                      <TableCell><h3>Description</h3></TableCell>
                      <TableCell>Total Time to Develop: {item.actualhour}</TableCell>
                      <TableCell>Re-estimate Hours: {item.reestimate}</TableCell>
                    </TableRow>
                    {item.subtask.map((subtask) => (
                      <TableRow>
                        <TableCell>{subtask.description}</TableCell>
                        <TableCell>{subtask.actualhour}</TableCell>
                        <TableCell>{subtask.reestimate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          ))}
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};
export default SprintSummaryReport;
