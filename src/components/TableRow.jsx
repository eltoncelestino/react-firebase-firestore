import React, { Component } from "react";
import { Link } from "react-router-dom";

import StudentService from "../services/StudentService";

export default class TableRow extends Component {
  constructor(props) {
    super(props);
    this.deleteStudents = this.deleteStudents.bind(this);
  }

  deleteStudents(id, name) {
    let res = window.confirm(`Want to delete ${name}, id: ${id}?`);

    if (res) {
      StudentService.delete(
        this.props.firebase.getFirestore(),
        message => {
          if (message === "Success") console.log(`${name} deleted.`);
        },
        id
      )
    }
  }

  render() {
    return (
      <tr>
        <td>{this.props.students._id}</td>
        <td>{this.props.students.name}</td>
        <td>{this.props.students.course}</td>
        <td>{this.props.students.IRA}</td>
        <td style={{ textAlign: "center" }}>
          <Link
            to={"/edit/" + this.props.students._id}
            className="btn btn-outline-primary"
          >
            Edit
          </Link>
        </td>
        <td style={{ textAlign: "center" }}>
          <button
            onClick={() =>
              this.deleteStudents(
                this.props.students._id,
                this.props.students.name
              )
            }
            className="btn btn-outline-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}
