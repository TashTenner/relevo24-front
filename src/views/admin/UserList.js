import React, { Component } from "react";
import { Link } from 'react-router-dom';
import userService from '../../services/userService';
import SearchPerson from '../../components/SearchPerson';

class UserList extends Component {
  state = {
    users: [],
    loading: true,
  }

  async componentDidMount() {
    try {
      const users = await userService.getAllUsers()
      this.setState({
        users,
        loading: false
      })
    } catch (error) {
      console.log(error);
    }
  }

  search = item => {
    const foundUser = this.state.users.filter(user => {
      return user.username.toLowerCase().search(item) !== -1;
    });
    this.setState({
      users: [...foundUser]
    });
  };

  render() {
    const { users, loading } = this.state;
    return (
      <div>
        <SearchPerson search={this.search} />
        <h1>Users</h1>
        {!loading && users.map((user) => {
          return (
            <div key={user._id}>
              <Link to={`/users/${user._id}/update-role`}>{user.username}</Link>
            </div>
          )
        })}
        {loading && <div>loading...</div>}
      </div>
    );
  }
}

export default UserList;