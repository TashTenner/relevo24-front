import axios from "axios";

class WorkingDayService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true
    });
  }

  getAllWorkingDays() {
    return this.axios.get("/api/workingdays").then(({ data: workingDays }) => workingDays);
  }

  getWorkingDayById(id) {
    return this.axios.get(`/api/workingdays/${id}`).then(({ data: workingDay }) => workingDay);
  }

}

const workingDayService = new WorkingDayService();

export default workingDayService;