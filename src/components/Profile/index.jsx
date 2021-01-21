import React from "react";
import { Row, Col } from "antd";

export const Profile = ({ contact }) => {
  return (
    <Row align="center">
      <Col span={8}>
        <img src={contact.picture.large} alt="" className="profile__picture" />
      </Col>
      <Col span={8}>
        <h2>
          {contact.name.title}. {contact.name.first} {contact.name.last}
          <span> ({contact.dob.age}) years</span>
        </h2>
        <a href="/#">{contact.email}</a>
        <div>
          <a href="/#">{contact.cell}</a>
        </div>
        <p>/{contact.location.country}/</p>
        <p>{contact.location.city}</p>
      </Col>
    </Row>
  );
};
