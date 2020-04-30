import React, { Component } from 'react';
import EmployeeList from './EmployeeList';

class Employees extends Component {
  render() {
    return (
      <>
        <div>here you have all your employees and feel free to change their schedules</div>
        <EmployeeList />
      </>
    );
  }
}

export default Employees;