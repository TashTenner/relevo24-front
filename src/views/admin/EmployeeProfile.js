import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import employeeService from '../../services/employeeService';
import shiftService from '../../services/shiftService';

class EmployeeProfile extends Component {
  state = {
    employeeInfo: {},
    employeeId: "",
    shifts: []
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    try {
      const employeeId = id
      const employeeInfo = await employeeService.getEmployeeById(id)
      const shifts = employeeInfo.shifts
      this.setState({
        employeeInfo,
        employeeId,
        shifts
      })
    } catch (error) {
      console.log(error);
    }
  }

  deleteShift = (id) => {
    const shallowCopyShifts = [...this.state.shifts];
    const updatedShifts = shallowCopyShifts.filter(x => { return x._id !== id });
    shiftService
      .deleteShift(id)
      .then(() => {
        this.setState({ shifts: updatedShifts });
      })
      .catch(err => { });
  };

  render() {
    const { employeeId, shifts, employeeInfo } = this.state;
    return (
      <div>
        <div>link to change role:</div>
        <br></br>
        <Link to={`/employees/${employeeId}/update-role`}>update role</Link>
        <br></br>
        <Link to={`/employees/${employeeId}/add-shift`}>add shifts</Link>
        <div>underneath you see {employeeInfo.username} / employee's shifts:</div>
        <div>
          <table>
            <tbody>
              {shifts.map((shift) => {
                return (
                  <tr key={shift._id}>
                    <td>{shift.day.dayName}</td>
                    <td>{shift.timeStart}</td>
                    <td>{shift.timeEnd}</td>
                    <td>
                      <Link to={`/employees/${employeeId}/edit-shift/${shift._id}`}>
                        <button className="fa fa-edit"></button>
                      </Link>
                    </td>
                    <td><button onClick={() => this.deleteShift(shift._id)} className="fa fa-trash-o"></button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default EmployeeProfile;