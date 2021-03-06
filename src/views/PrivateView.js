import React from 'react';
import { withAuth } from '../context/AuthContext';

const PrivateView = ({ user }) => {
  return (
    <div>
      PrivateView
      user: {user.username}
    </div>
  );
};

export default withAuth(PrivateView);