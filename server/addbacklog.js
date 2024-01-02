import * as cfg from "./config.js";
import * as dbRtns from "./db_routines.js";
const backlogJSON = `[
                        {
                            "sprint": "1",
                            "asa":"Team Member",
                            "iwantto":"Capture/Maintain basic project information",
                            "sothatican": "Facilitate information collection",
                            "re": 3,
                            "rc": 780.00,
                            "member": "Srestha Bharadwaj",
                            "actualhour": 2,
                            "subtask": [
                                {
                                    "description": "Create a project information form to capture the basic project information (e.g., project name, description, start date, end date, etc.)",
                                    "actualhour": 1,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Add the ability to edit project information after it has been submitted",
                                    "actualhour": 1,
                                    "reestimate": 0
                                }
                            ],
                            "reestimate": 0
                        },
                        {
                            "sprint": "1",
                            "asa":"Team Member",
                            "iwantto":"Maintain a list of team members assigned to the project",
                            "sothatican": "Track estimated and actual times for each team member",
                            "re": 2,
                            "rc": 520.00,
                            "member": "Logan Wall",
                            "actualhour": 0.5,
                            "subtask": [
                                {
                                    "description": "Implement a feature to add team members to the project and assign their roles (e.g., developer, designer)",
                                    "actualhour": 0.25,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Add the ability to edit team member information after it has been added",
                                    "actualhour": 0.25,
                                    "reestimate": 0
                                }
                            ],
                            "reestimate": 0
                        },
                        {
                            "sprint": "1",
                            "asa":"Team Member",
                            "iwantto":"Capture/Maintain the product backlog including relative estimates (and estimated costs)",
                            "sothatican": "Establish a benchmark for comparison purposes",
                            "re": 2,
                            "rc": 520.00,
                            "member": "Huigon Shin",
                            "actualhour": 2,
                            "subtask": [
                                {
                                    "description": "Create a product backlog form to capture the product backlog items (e.g., features, enhancements, bug fixes, etc.)",
                                    "actualhour": 1,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Add the ability to edit product backlog items after they have been submitted",
                                    "actualhour": 1,
                                    "reestimate": 0
                                }
                            ],
                            "reestimate": 0
                        },
                        {
                            "sprint": "2",
                            "asa":"Team Member",
                            "iwantto":"Identify which user stories are going to be included in a given Sprint",
                            "sothatican": "Have an understanding what user stories will be part of a planned Sprint",
                            "re": 1,
                            "rc": 260.00,
                            "member": "Srestha Bharadwaj",
                            "actualhour": 4,
                            "subtask": [
                                {
                                    "description": "Design a user interface to display a list of available user stories",
                                    "actualhour": 1,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Design a dashboard to provide an overview of the selected user stories and the progress made towards completing them",
                                    "actualhour": 1,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Create the functionality to send and store this information to a database",
                                    "actualhour": 1,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Implement a functionality to show the list of user stories included in a planned Sprint",
                                    "actualhour": 1,
                                    "reestimate": 0
                                }
                            ],
                            "reestimate": 0
                        },
                        {
                            "sprint": "2",
                            "asa":"Team Member",
                            "iwantto":"At the end of a Sprint (for each team member) capture the actual number of hours worked and an estimate of time to complete each subtask",
                            "sothatican": "Track time spent by each team member on any given user story and provide a metric for the work remaining",
                            "re": 1,
                            "rc": 260.00,
                            "member": "Srestha Bharadwaj",
                            "actualhour": 4,
                            "subtask": [
                                {
                                    "description": "Create a dashboard to view the user stories",
                                    "actualhour": 1,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Create the functionality in the dashboard to add or modify a subtask",
                                    "actualhour": 1,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Implement a feature to view all subtasks for a user story in a Sprint Plan",
                                    "actualhour": 1,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Implement a database schema to store Sprint Plans, user stories, and their subtasks",
                                    "actualhour": 1,
                                    "reestimate": 0
                                }
                            ],
                            "reestimate": 0
                        },
                        {
                            "sprint": "2",
                            "asa":"PMO",
                            "iwantto":"Generate a Summary report for each team member based upon actual hours worked by User Story",
                            "sothatican": "Understand the contributions of each team member",
                            "re": 2,
                            "rc": 520.00,
                            "member": "Huigon Shin",
                            "actualhour": 8,
                            "subtask": [
                                {
                                    "description": "Design a user interface having member list with Autocomplete to select one of members to show and modify user stories",
                                    "actualhour": 2,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Design a user interface to input actual hours worked by each team member on a particular user story",
                                    "actualhour": 3,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Develop a functionality to generate a summary report for each team member based on the actual hours worked by them on different user stories",
                                    "actualhour": 1,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Save user stories having actual hours worked to the database",
                                    "actualhour": 2,
                                    "reestimate": 0
                                }
                            ],
                            "reestimate": 0
                        },
                        {
                            "sprint": "2",
                            "asa":"PMO",
                            "iwantto":"Generate a Sprint summary report (that reports the status, time spent, and any re-estimates for each user story and related subtasks",
                            "sothatican": "Understand the progress that is being made as it relates to the project deliverables",
                            "re": 3,
                            "rc": 780.00,
                            "member": "Logan Wall",
                            "actualhour": 12,
                            "subtask": [
                                {
                                    "description": "Load the data from the database",
                                    "actualhour": 2,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Design an interface to display the user stories by the team member",
                                    "actualhour": 3,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Create the functionality to allow for editing of the status, time and re-estimates for each user story and it's related subtasks",
                                    "actualhour": 2,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Create the functionality to save the data to the database",
                                    "actualhour": 1,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Design a system to create and display the report",
                                    "actualhour": 2,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Allow for the user to sort the report",
                                    "actualhour": 2,
                                    "reestimate": 0
                                }
                            ],
                            "reestimate": 0
                        },
                        {
                            "sprint": "3",
                            "asa":"Team Member",
                            "iwantto":"Copy any incomplete user stories (and only incomplete subtasks) from a completed sprint to a future sprint",
                            "sothatican": "Minimize the amount of information that needs to be moved from one Sprint to another",
                            "re": 1,
                            "rc": 260.00,
                            "member": "Srestha Bharadwaj",
                            "actualhour": 0,
                            "subtask": [
                                {
                                    "description": "Add a Completed value to the task inside the database",
                                    "actualhour": 0,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Add a SprintCompleted value to the subtask inside the database",
                                    "actualhour": 0,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Add a SubtaskCompleted value to the subtask inside the database",
                                    "actualhour": 0,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Update the schema to allow for these new values",
                                    "actualhour": 0,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Update the front end to allow for new values to be entered",
                                    "actualhour": 0,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Update the query to return these new values",
                                    "actualhour": 0,
                                    "reestimate": 0
                                }
                            ],
                            "reestimate": 0
                        },
                        {
                            "sprint": "3",
                            "asa":"PMO",
                            "iwantto":"Create a dashboard to display critical percentages associated with the project",
                            "sothatican": "Have a better understanding of the quality of my estimates and efficiency of my project team",
                            "re": 2,
                            "rc": 520.00,
                            "member": "Logan Wall",
                            "actualhour": 0,
                            "subtask": [
                                {
                                    "description": "Create new front to receive data",
                                    "actualhour": 0,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Create a UI for the dashboard",
                                    "actualhour": 0,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Create the functionality to calculate the task completion percent",
                                    "actualhour": 0,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Create the functionality to calculate the sprint completion percentage",
                                    "actualhour": 0,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Create the functionality to load the data from the database",
                                    "actualhour": 0,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Create the functionality to display the team's time efficacy",
                                    "actualhour": 0,
                                    "reestimate": 0
                                }
                            ],
                            "reestimate": 0
                        },
                        {
                            "sprint": "3",
                            "asa":"Team Member/PMO",
                            "iwantto":"Authenticate users of the application using an email address and password",
                            "sothatican": "Ensure that only authorized users are able to use the application",
                            "re": 2,
                            "rc": 520.00,
                            "member": "Huigon Shin",
                            "actualhour": 0,
                            "subtask": [
                                {
                                    "description": "Create the UI sign up or sign in",
                                    "actualhour": 0,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Add the email to the member's database information",
                                    "actualhour": 0,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Add the password to the member's database information",
                                    "actualhour": 0,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Create the functionality to check the entered email and password match a user in the database",
                                    "actualhour": 0,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Create the functionality to prevent users from accessing other pages without being signed in",
                                    "actualhour": 0,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Create the functionality to allow a new user to sign up",
                                    "actualhour": 0,
                                    "reestimate": 0
                                },
                                {
                                    "description": "Create the functionality to check the email format when signing up or in",
                                    "actualhour": 0,
                                    "reestimate": 0
                                }
                            ],
                            "reestimate": 0
                        }
                    ]`;
const addBacklogs = async () => {
    let backlogs = JSON.parse(backlogJSON);
    try {
        const db = await dbRtns.getDBInstance();
        //clean out collection before adding new users
        let results = await dbRtns.deleteAll(db, cfg.backlogCollection);
        console.log(
            `deleted ${results.deletedCount} documents from the ${cfg.backlogCollection} collection`
        );
        results = await dbRtns.addMany(db, cfg.backlogCollection, backlogs);
        console.log(
            `added ${results.insertedCount} documents to the ${cfg.backlogCollection} collection`
        );
        process.exit(0);
    } catch (err) {
        console.log("Error: " + err);
        process.exit(1);
    }
};
addBacklogs();