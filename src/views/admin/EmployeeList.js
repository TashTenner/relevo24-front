// schedule > employees (employeeList)> employee's profile > either add shifts / delete shifts or 
// change role from employee to admin

import React, { Component } from "react";
import { Link } from 'react-router-dom';
import employeeService from '../../services/employeeService';
import SearchPerson from '../../components/SearchPerson';

class EmployeeList extends Component {
  state = {
    employees: [],
    loading: true,
  }

  async componentDidMount() {
    try {
      const employees = await employeeService.getAllEmployees()
      this.setState({
        employees,
        loading: false
      })
    } catch (error) {
      console.log(error);
    }
  }

  search = item => {
    const foundEmployee = this.state.employees.filter(employee => {
      return employee.username.toLowerCase().search(item) !== -1;
    });
    this.setState({
      employees: [...foundEmployee]
    });
  };

  render() {
    const { employees, loading } = this.state;
    return (
      <div>
        <SearchPerson search={this.search} />
        <h1>Employees</h1>
        {!loading && employees.map((employee) => {
          return (
            <div key={employee._id}>
              {/* <Link to={`/employees/${employee._id}/update-role`}>{employee.username}</Link> */}
              <Link to={`/employees/${employee._id}/profile`}>{employee.username}</Link>
            </div>
          )
        })}
        {loading && <div>loading...</div>}
      </div>
    );
  }
}

export default EmployeeList;