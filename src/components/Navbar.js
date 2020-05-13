import React, { Component } from "react";
import { withAuth } from "../context/AuthContext";
import { withTheme } from "../context/ThemeContext";
import { NavLink } from "react-router-dom";
// import styled from 'styled-components';
// .navbar-burger span:nth-child(1)

class Navbar extends Component {
  render() {
    const { user, handleLogout, theme, changeTheme } = this.props;

    return (
      <section>
        <nav>
          <ul>
            <li>
              {user ? <NavLink to="/dashboard">Dashboard</NavLink> : <div></div>}
            </li>
            <li>
              {user && user.role !== "admin" ? <NavLink to="/team">Team</NavLink> : <div></div>}
            </li>
            <li>
              {user && user.role !== "admin" ? <NavLink to="/profile">Profile</NavLink> : <div></div>}
            </li>
            <li>
              {user && user.role === "admin" ? <NavLink to="/schedule">Schedule</NavLink> : <div></div>}
            </li>
            <li>
              {user && user.role === "admin" ? <NavLink to="/users">Users</NavLink> : <div></div>}
            </li>
            <li>
              {user && user.role === "employee" ? <NavLink to="/payfit">API Payfit</NavLink> : <div></div>}
            </li>
            <li>
              {user ? <button
                onClick={changeTheme}
                style={{
                  backgroundColor: theme.foreground,
                  color: theme.color,
                }}
              >changeTheme</button> : <div></div>}
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

export default withAuth(withTheme(Navbar));