import React from "react";
import { Popover, Button } from "antd";
import { Link } from "react-router-dom";

export default class UserMenu extends React.Component {
  render() {
    return (
      <Popover
        content={
          <div>
            <div>
              <Link to="/profile">Profile</Link>
            </div>
            <div>
              <Link to="/" onClick={this.props.onLogout}>
                Logout
              </Link>
            </div>
          </div>
        }
      >
        <Button type="link">
          Hello! {this.props.user[0].name.title}.{" "}
          {this.props.user[0].name.first} {this.props.user[0].name.last}
        </Button>
        <img
          src={this.props.user[0].picture.thumbnail}
          alt=""
          className="user-icon"
        />
      </Popover>
    );
  }
}
