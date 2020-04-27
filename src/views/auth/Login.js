import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { withAuth } from "../../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   const { username, password } = this.state;
  //   this.props.handleLogin({
  //     username,
  //     password
  //   });
  // }

  handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { username, password } = this.state;
      this.props.handleLogin({
        username,
        password,
      }).then((e) => {
        if (e.name !== 'Error') {
          toast.success(`Hi, ${username}!`);
        } else {
          toast.warn(`Error`);
        }
      });
    } catch (error) {
      console.error('Error');
      toast.error('Error');
    }
  };

  render() {
    const { username, password } = this.state;
    return (
      <>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={username} onChange={this.handleChange} />
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />
          <input type="submit" value="Login" />
        </form>
        <p>Keen to
      <Link to={"/signup"}> sign up?</Link>
        </p>
      </>
    )
  }
}

export default withAuth(Login);