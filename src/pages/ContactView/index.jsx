import React from "react";
import { useLocation } from "react-router-dom";
import { Profile } from "../../components/Profile";

export const ContactView = () => {
  const location = useLocation();

  const { propsContact } = location;
  return (
    <div className="profile">
      <h1 className="profile__title">Contact View</h1>
      <Profile contact={propsContact} />
    </div>
  );
};
