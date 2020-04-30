import React, { Component } from 'react';
import employeeService from '../../services/employeeService';

class EmployeeToEmployee extends Component {
  state = {
    employee: {},
    loading: true,
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    try {
      const employee = await employeeService.getEmployeeById(id)
      this.setState({
        employee,
        loading: false,
      })
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
      })
    }
  }

  handleChange = (e) => {
    const { employee } = this.state;
    console.log(employee);

    this.setState({
      employee: {
        ...employee,
        [e.target.name]: e.target.value,
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { employee } = this.state;
    const { history: { push } } = this.props;
    console.log(employee);
    employeeService.updateEmployeeRole(employee)
      .then(() => {
        push(`/schedule`)
      })
      .catch(() => { })
  }

  render() {
    const { employee: { role, username }, loading } = this.state;

    return (
      <div>
        Update the role of the employee to admin:
        {loading && <div>Loading...</div>}
        {!loading && (
          <>
            <div>{username}</div>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="role">role</label>
              <select type="text" name="role" id="role" onChange={this.handleChange}>
                <option defaultValue={role}>{role}</option>
                <option value="admin">admin</option>
              </select>
              {/* <input type="text" name="role" id="role" value={role} onChange={this.handleChange} /> */}
              <button type="submit">change role</button>
            </form>
          </>
        )}
      </div>
    );
  }
}

export default EmployeeToEmployee;