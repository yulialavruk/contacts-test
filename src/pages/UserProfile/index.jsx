import React from "react";
import { Profile } from "../../components/Profile";

export const UserProfile = ({ user }) => (
  <div className="profile">
    <h1 className="profile__title">Profile</h1>
    <Profile contact={user} />
  </div>
);
