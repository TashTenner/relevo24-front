import React, { Component } from 'react';
import userService from '../../services/userService';

class UserToEmployee extends Component {
  state = {
    user: {},
    loading: true,
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    try {
      const user = await userService.getUserById(id)
      this.setState({
        user,
        loading: false,
      })
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
      })
    }
  }

  handleChange = (e) => {
    const { user } = this.state;
    console.log(user);

    this.setState({
      user: {
        ...user,
        [e.target.name]: e.target.value,
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { user } = this.state;
    const { history: { push } } = this.props;
    console.log(user);
    userService.updateUserRole(user)
      .then(() => {
        push(`/schedule`)
      })
      .catch(() => { })
  }

  render() {
    const { user: { role, username }, loading } = this.state;

    return (
      <div>
        Update the role of the user to so him/her in employees:
        {loading && <div>Loading...</div>}
        {!loading && (
          <>
            <div>{username}</div>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="role">role</label>
              <select type="text" name="role" id="role" onChange={this.handleChange}>
                <option defaultValue={role}>{role}</option>
                <option value="employee">employee</option>
              </select>
              {/* <input type="text" name="role" id="role" value={role} onChange={this.handleChange} /> */}
              <button type="submit">change role</button>
            </form>
          </>
        )}
      </div>
    );
  }
}

export default UserToEmployee;