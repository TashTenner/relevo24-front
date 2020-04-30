import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../context/AuthContext';

function AnonRoute({ component: Comp, isLoggedin, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoggedin ? (
          <Comp {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/private",
                // to profile or to dashboard
              }}
            />
          )
      }
    />
  );
}

export default withAuth(AnonRoute);
