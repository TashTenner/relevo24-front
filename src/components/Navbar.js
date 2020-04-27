import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
// import styled from 'styled-components';
// .navbar-burger span:nth-child(1)

class Navbar extends Component {
  render() {
    const { user, handleLogout } = this.props;

    return (
      <section>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/team">Team</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              {user && user.role === "admin" ? <NavLink to="/admin/schedule">Schedule</NavLink> : <div></div>}
            </li>
            <li>
              {user && user.role === "employee" ? <NavLink to="/employee/payfit">API Payfit</NavLink> : <div></div>}
            </li>
            <li>
              {user && user ? <NavLink onClick={handleLogout} to="/">Logout</NavLink> : <NavLink to="/login">Login</NavLink>}
            </li>
          </ul>
        </nav>
      </section>
    );
  }
}

export default withAuth(Navbar);