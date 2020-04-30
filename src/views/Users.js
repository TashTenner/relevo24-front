import React, { Component } from 'react';
import UserList from '../views/admin/UserList';

class Users extends Component {
  render() {
    return (
      <>
        <div>so here you can decide which user will be added to our employee list</div>
        <UserList />
      </>
    );
  }
}

export default Users;