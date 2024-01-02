import React, { Component } from "react";

class ProjectForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectName: "",
            description: "",
            startDate: "",
            endDate: "",
            // add any other fields you want to capture
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // send a POST request to the backend API endpoint to store the project information
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Project Name:
                    <input
                        type="text"
                        name="projectName"
                        value={this.state.projectName}
                        onChange={this.handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={this.state.description}
                        onChange={this.handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Start Date:
                    <input
                        type="date"
                        name="startDate"
                        value={this.state.startDate}
                        onChange={this.handleInputChange}
                    />
                </label>
                <br />
                <label>
                    End Date:
                    <input
                        type="date"
                        name="endDate"
                        value={this.state.endDate}
                        onChange={this.handleInputChange}
                    />
                </label>
                <br />
                {/* add any other fields you want to capture */}
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default ProjectForm;
