import React, { Component } from "react";

import TableRow from "./TableRow";

import FirebaseContext from "../utils/FirebaseContext";

import StudentService from "../services/StudentService";

const ListPage = () => (
  <FirebaseContext.Consumer>
    {context => <List firebase={context} />}
  </FirebaseContext.Consumer>
);

class List extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = { students: [], loading: false };
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({ loading: true });

    StudentService.list(this.props.firebase.getFirestore(), students => {
      if (students) {
        if (this._isMounted) {
          this.setState({ students: students, loading: false });
        }
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  mountTable() {
    if (!this.state.students) return;
    return this.state.students.map((est, i) => {
      return (
        <TableRow
          students={est}
          key={i}
          deleteElementById={this.deleteElementById}
          firebase={this.props.firebase}
        />
      );
    });
  }

  generateContent() {
    if (this.state.loading) {
      return (
        <tr>
          <td colSpan="6" style={{ textAlign: "center" }}>
            <div className="spinner-border text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </td>
        </tr>
      );
    } else {
      return this.mountTable();
    }
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>List Students</h3>

        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Course</th>
              <th>IRA</th>
              <th colSpan="2"></th>
            </tr>
          </thead>
          <tbody>{this.generateContent()}</tbody>
        </table>
      </div>
    );
  }
}

export default ListPage;
