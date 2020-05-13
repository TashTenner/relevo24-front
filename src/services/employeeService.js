import axios from "axios";

class EmployeeService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true
    });
  }

  getAllEmployees() {
    return this.axios.get("/api/employees").then(({ data: employees }) => employees);
  }

  getEmployeeById(id) {
    return this.axios.get(`/api/employees/${id}`).then(({ data: employee }) => employee);
  }

  updateEmployeeRole(employee) {
    return this.axios
      .put(`/api/employees/${employee._id}/update-role/`, employee)
      .then(({ data: employee }) => employee);
  }

  updateEmployee(employee) {
    return this.axios
      .put(`/api/employees/${employee._id}/update`, employee)
      .then(({ data: employee }) => employee);
  }

  deleteEmployee(employee) {
    return this.axios
      .delete(`/api/employees/${employee._id}/delete`, employee)
      .then(({ data: employee }) => employee);
  }

}

const employeeService = new EmployeeService();

export default employeeService;