import React, { Component } from "react";

class SearchUser extends Component {
  handleChange = event => {
    this.props.search(event.target.value);
  };

  render() {
    return (
      <div>
        <input onChange={this.handleChange} placeholder="Search"></input>
      </div>
    );
  }
}

export default SearchUser;