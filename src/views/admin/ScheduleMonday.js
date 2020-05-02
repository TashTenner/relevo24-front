import React, { Component } from 'react';
import workingDayService from '../../services/workingDayService';

class ScheduleMonday extends Component {
  state = {
    workingDays: [],
    // employeeId: "",
    // employeesTeam: []
  }

  async componentDidMount() {
    // const { match: { params: { id } } } = this.props;
    try {
      // const employeeId = id
      const workingDays = await workingDayService.getAllWorkingDays()
      // const employeesTeam = workingDays.employeesTeam
      this.setState({
        workingDays,
        // employeeId,
        // employeesTeam
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
      </>
    );
  }
}

export default ScheduleMonday;