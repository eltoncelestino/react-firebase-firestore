import React, { Component } from "react";

import FirebaseContext from "../utils/FirebaseContext";
import StudentService from "../services/StudentService";

const EditPage = props => (
  <FirebaseContext.Consumer>
    {context => <Edit firebase={context} id={props.match.params.id} />}
  </FirebaseContext.Consumer>
);

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = { name: "", course: "", IRA: "" };

    this.setName = this.setName.bind(this);
    this.setCourse = this.setCourse.bind(this);
    this.setIRA = this.setIRA.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    StudentService.retrieve(
      this.props.firebase.getFirestore(),
      student => {
        if (student)
          this.setState({
            name: student.name,
            course: student.course,
            IRA: student.IRA
          });
      },
      this.props.id
    );
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
    };

    StudentService.edit(
      this.props.firebase.getFirestore(),
      message => {
        if (message === "success") console.log("Student updated");
      },
      student,
      this.props.id
    );

    this.setState({ name: "", course: "", IRA: "" });
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Edit Student</h3>
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
              value="Editar Estudante"
              className="btn btn-outline-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default EditPage;
