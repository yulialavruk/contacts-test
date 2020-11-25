import React from "react";
import { Row, Col } from "antd";

export const Profile = ({ user }) => (
  <div className="profile">
    <h1 className="profile__title">Profile</h1>
    <Row align="center">
      <Col span={8}>
        <img src={user.picture.large} alt="" className="profile__picture" />
      </Col>
      <Col span={8}>
        <h2>
          Hello! {user.name.title}. {user.name.first} {user.name.last}
          <span> ({user.dob.age}) years</span>
        </h2>
        <a href="/#">{user.email}</a>
        <div>
          <a href="/#">{user.cell}</a>
        </div>
        <p>/{user.location.country}/</p>
        <p>{user.location.city}</p>
      </Col>
    </Row>
  </div>
);
