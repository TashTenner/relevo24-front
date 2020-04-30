import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EmployeeProfile extends Component {
  state = {
    employeeId: ""
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    try {
      const employeeId = id
      // console.log(id)
      this.setState({
        employeeId
      })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { employeeId } = this.state;
    return (
      <div>
        <div>link to change role:</div>
        <br></br>
        <Link to={`/employees/${employeeId}/update-role`}>update role</Link>
        <br></br>
        <Link to={`/employees/${employeeId}/add-shift`}>add shifts</Link>
        <div>underneath you see all shifts of the employee:</div>
      </div>
    );
  }
}

export default EmployeeProfile;