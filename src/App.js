import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import PrivateView from './views/PrivateView';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';

import Navbar from "./components/Navbar";
// import MapHome from "./views/map/MapHome";

import ErrorPage from "./views/ErrorPage";

// import Notifications from "./components/Notifications";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.min.css'; 

import { withAuth } from './context/AuthContext';

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
          <Navbar />
          <Switch>
            <AnonRoute exact path="/login" component={Login} />
            <AnonRoute exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/private" component={PrivateView} />

            {/* <Route exact path="/" component={Home} /> */}

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

export default withAuth(App);