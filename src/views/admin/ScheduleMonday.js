import React, { Component } from 'react';
import workingDayService from '../../services/workingDayService';
import ScheduleTest from "./ScheduleTest";

class ScheduleMonday extends Component {
  state = {
    workingDays: []
  }

  async componentDidMount() {
    try {
      const workingDays = await workingDayService.getAllWorkingDays()
      this.setState({
        workingDays
      })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { workingDays } = this.state;

    return (
      <>
        <div>all employees who work on Monday</div>
        <div>
          <br></br>
          <div>
            <table>
              <tbody>
                {workingDays.filter((day) => day.dayName === 'Monday').map((workingDay) => {
                  return workingDay.shifts.map((shift) => (
                    <tr key={shift._id}>
                      {/* <td>{workingDay.dayName}</td> */}
                      <td>{shift.employee.username}</td>
                      <td>{shift.timeStart}</td>
                      <td>{shift.timeEnd}</td>
                    </tr>
                  ))
                })}
              </tbody>
            </table>
          </div>
        </div>
        <ScheduleTest />
      </>
    );
  }
}

export default ScheduleMonday;