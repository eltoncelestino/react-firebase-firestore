import React, { Component } from "react";

import FirebaseContext from "../utils/FirebaseContext";
import StudentService from '../services/StudentService'

const CreatePage = () => (
  <FirebaseContext.Consumer>
    {context => <Create firebase={context} />}
  </FirebaseContext.Consumer>
);

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = { name: "", course: "", IRA: "" };

    this.setName = this.setName.bind(this);
    this.setCourse = this.setCourse.bind(this);
    this.setIRA = this.setIRA.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  setName(e) {
    this.setState({ name: e.target.value });
  }

  setCourse(e) {
    this.setState({ course: e.target.value });
  }

  setIRA(e) {
    this.setState({ IRA: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const student = {
      name: this.state.name, 
      course: this.state.course, 
      IRA: this.state.IRA
    }

    StudentService.create(
      this.props.firebase.getFirestore(),
      (message) => {
        if(message === 'sucess') 
          console.log(`Student ${this.state.name} successfully inserted.`)
      },
      student
    )

    this.setState({ name: "", course: "", IRA: "" });
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Create Student</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.setName}
            />
          </div>
          <div className="form-group">
            <label>Course: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.course}
              onChange={this.setCourse}
            />
          </div>
          <div className="form-group">
            <label>IRA: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.IRA}
              onChange={this.setIRA}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Student"
              className="btn btn-outline-success"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreatePage;
