import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Schedule extends Component {
  render() {
    return (
      <>
        <div>change shifts of your employees</div>
        <div>add notes to the calendar</div>
        <div>add sick leave / holidays of your employees</div>
        <Link to={`/employees`}>employees</Link>
        <br></br>
        <Link to={`/schedule/monday`}>Monday</Link>
      </>
    );
  }
}

export default Schedule;