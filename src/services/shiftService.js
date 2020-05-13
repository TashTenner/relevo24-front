import axios from "axios";

class ShiftService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true
    });
  }

  getAllShifts() {
    return this.axios.get("/api/shifts").then(({ data: shifts }) => shifts);
  }

  getShiftById(id) {
    return this.axios.get(`/api/shifts/${id}`).then(({ data: shift }) => shift);
  }

  addShift(timeStart, timeEnd, workingDayId, userId) {
    return this.axios
      .post(`/api/shifts/add`, { timeStart, timeEnd, workingDayId, userId })
      .then(({ data }) => data);
  }

  updateShift(shiftId, timeStart, timeEnd, workingDayId) {
    return this.axios
      .put(`/api/shifts/${shiftId}/update`, { timeStart, timeEnd, workingDayId })
      .then(({ data }) => data);
  }

  deleteShift(id) {
    return this.axios
      .delete(`/api/shifts/${id}/delete`)
      .then(({ data: shifts }) => shifts);
  }

}

const shiftService = new ShiftService();

export default shiftService;