import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import PrivateView from './views/PrivateView';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';

import Navbar from "./components/Navbar";
import Body from "./components/Body";

import Landing from "./views/Landing";
import Dashboard from "./views/Dashboard";
import Schedule from "./views/Schedule";

import ErrorPage from "./views/ErrorPage";

// import Notifications from "./components/Notifications";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.min.css'; 

import { withAuth } from './context/AuthContext';
import { withTheme } from './context/ThemeContext';

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';

// import { theme, GlobalStyle } from "./styles";
// import { ThemeProvider } from "styled-components";

class App extends Component {
  render() {
    // const { handleLogout } = this.props;
    return (
      // <ThemeProvider theme={actualTheme}>
      //   <GlobalStyle />
      <>
        {/* <button onClick={handleLogout}>logout</button> */}
        <Router>
          <Body />
          <Navbar />
          <Switch>
            <AnonRoute exact path="/login" component={Login} />
            <AnonRoute exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/private" component={PrivateView} />

            <Route exact path="/" component={Landing} />

            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/schedule" component={Schedule} />

            {/* <Route exact path="/add" component={Name} /> */}
            {/* <PrivateRoute exact path="/admin/name/:id/edit" component={Name} /> */}

            <Route path="*" component={ErrorPage} />
          </Switch>
        </Router>
      </>
      // </ThemeProvider>
    );
  }
}

export default withAuth(withTheme(App));