import React, { Component } from 'react';
import shiftService from '../../services/shiftService';
import workingDayService from '../../services/workingDayService';
import { withAuth } from '../../context/AuthContext';

class AddShift extends Component {
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
      const workingDays = await workingDayService.getAllWorkingDays()
      const userId = id
      const workingDayId = workingDays[0]._id
      this.setState({
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
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  // handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { userId, workingDayId, timeStart, timeEnd } = this.state;
  //     const newShift = { userId, workingDayId, timeStart, timeEnd };
  //     const { history: { push } } = this.props;
  //     const response = await shiftService.addShift({
  //       timeStart,
  //       timeEnd,
  //       employee: userId,
  //       day: workingDayId,
  //     })
  //     this.setState({ storageValue: response });
  //       then(() => {
  //         push(`/employees/${userId}/profile`)
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  handleSubmit = (e) => {
    e.preventDefault();
    const { history: { push } } = this.props;
    const { timeStart, timeEnd, workingDayId, userId } = this.state;
    shiftService
      .addShift(timeStart, timeEnd, workingDayId, userId)
      .then(() => { push(`/employees/${this.state.userId}/profile`); })
      .catch(error => console.log(error))
  };

  render() {
    const { timeStart, timeEnd, workingDays, loading } = this.state;

    return (
      <div>
        {loading && <div>Loading...</div>}
        {!loading && (
          <>
            <div>add shift</div>

            <form onSubmit={this.handleSubmit}>

              <label htmlFor="timeStart">timeStart</label>
              <input type="time" name="timeStart" id="timeStart" value={timeStart} placeholder="00:00" onChange={this.handleChange} />

              <label htmlFor="timeEnd">timeEnd</label>
              <input type="time" name="timeEnd" id="timeEnd" value={timeEnd} placeholder="00:00" onChange={this.handleChange} />

              <label htmlFor="day">Day</label>
              <select type="text" name="workingDayId" id="workingDayId" onChange={this.handleChange}>
                {workingDays.map((workingDay) => {
                  return (
                    <option key={workingDay._id} value={workingDay._id}>{workingDay.dayName}</option>
                  )
                })}
              </select>
              <button type="submit">add shift</button>
            </form>
          </>
        )}
      </div>
    );
  }
}

export default withAuth(AddShift);