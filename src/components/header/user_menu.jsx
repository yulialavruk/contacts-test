import React from "react";
import { Popover, Button } from "antd";
import { Link } from "react-router-dom";

export const UserMenu = ({ user, onLogout }) => (
  <Popover
    content={
      <div>
        <div>
          <Link to="/profile">Profile</Link>
        </div>
        <div>
          <Link to="/" onClick={onLogout}>
            Logout
          </Link>
        </div>
      </div>
    }
  >
    <Button type="link">
      Hello! {user.name.title}. {user.name.first} {user.name.last}
    </Button>
    <img src={user.picture.thumbnail} alt="" className="user-icon" />
  </Popover>
);
