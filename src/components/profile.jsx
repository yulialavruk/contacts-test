import React from "react";
import { Row, Col } from "antd";

export default class Profile extends React.Component {
  render() {
    return (
      <div className="profile">
        <h1 className="profile__title">Profile</h1>
        <Row align="center">
          <Col span={8}>
            <img
              src={this.props.user[0].picture.large}
              alt=""
              className="profile__picture"
            />
          </Col>
          <Col span={8}>
            <h2>
              Hello! {this.props.user[0].name.title}.{" "}
              {this.props.user[0].name.first} {this.props.user[0].name.last}
              <span> ({this.props.user[0].dob.age}) years</span>
            </h2>
            <a href="/#">{this.props.user[0].email}</a>
            <div>
              <a href="/#">{this.props.user[0].cell}</a>
            </div>
            <p>/{this.props.user[0].location.country}/</p>
            <p>{this.props.user[0].location.city}</p>
          </Col>
        </Row>
      </div>
    );
  }
}
