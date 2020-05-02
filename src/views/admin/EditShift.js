import React, { Component } from 'react';
import shiftService from '../../services/shiftService';
import workingDayService from '../../services/workingDayService';
import { withAuth } from '../../context/AuthContext';

class EditShift extends Component {
  state = {
    userId: "",
    workingDayId: "",
    timeStart: "",
    timeEnd: "",
    workingDays: [],
    loading: true,
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    try {
      const shift = await shiftService.getShiftById(id)
      const workingDays = await workingDayService.getAllWorkingDays()

      const timeStart = shift.timeStart
      const timeEnd = shift.timeEnd
      const userId = shift.employee._id
      const workingDayId = shift.day._id
      this.setState({
        timeStart,
        timeEnd,
        userId,
        workingDayId,
        workingDays,
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
    const { timeStart, timeEnd, workingDayId, userId } = this.state;
    this.setState({
      [e.target.name]: e.target.value,
    })
    console.log(timeStart, timeEnd, workingDayId);
    console.log(this.props.match.params.id)
    console.log(userId)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { timeStart, timeEnd, workingDayId, userId } = this.state;
    const shiftId = this.props.match.params.id;
    const { history: { push } } = this.props;
    console.log(timeStart, timeEnd, workingDayId, shiftId, userId);
    shiftService
      .updateShift(shiftId, timeStart, timeEnd, workingDayId)
      .then(() => { push(`/employees/${userId}/profile`); })
      .catch(error => console.log(error))
  };

  render() {
    const { timeStart, timeEnd, workingDays, loading } = this.state;

    return (

      <div>
        {loading && <div>Loading...</div>}
        {!loading && (
          <>
            <div>update shift</div>

            <form onSubmit={this.handleSubmit}>

              <label htmlFor="timeStart">timeStart</label>
              <input type="text" name="timeStart" id="timeStart" value={timeStart} placeholder="00:00" onChange={this.handleChange} />

              <label htmlFor="timeEnd">timeEnd</label>
              <input type="text" name="timeEnd" id="timeEnd" value={timeEnd} placeholder="00:00" onChange={this.handleChange} />

              <label htmlFor="day">Day</label>
              <select type="text" name="workingDayId" id="workingDayId" onChange={this.handleChange}>
                {workingDays.map((workingDay) => {
                  return (
                    <option key={workingDay._id} value={workingDay._id}>{workingDay.dayName}</option>
                  )
                })}
              </select>
              <button type="submit">update shift</button>
            </form>
          </>
        )}
      </div>
    );
  }
}

export default withAuth(EditShift);