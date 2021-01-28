import React from "react";
import { Row, Col } from "antd";
import { CopyToClipboardText } from "../CopyToClipboardText";

export const Profile = ({ contact }) => {
  return (
    <Row type="flex" align="center">
      <Col className="p-15">
        <img src={contact.picture.large} alt="" className="profile__picture" />
      </Col>
      <Col className="p-15">
        <h2>
          {contact.name.title}. {contact.name.first} {contact.name.last}
          <span> ({contact.dob.age} years)</span>
        </h2>

        <CopyToClipboardText text={contact.email}>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </CopyToClipboardText>
        <div>
          <CopyToClipboardText text={contact.cell}>
            <a href={`tel:${contact.cell}`}>{contact.cell}</a>
          </CopyToClipboardText>
        </div>
        <div>
          <CopyToClipboardText
            text={`[${contact.location.country}] ${contact.location.street["number"]} ${contact.location.street["name"]}, ${contact.location.city}, ${contact.location.state} ${contact.location.postcode}`}
          >
            <div>
              <h4>/{contact.location.country}/</h4>
              <p>{`${contact.location.street["number"]} ${contact.location.street["name"]}, ${contact.location.city}, ${contact.location.state} ${contact.location.postcode}`}</p>
            </div>
          </CopyToClipboardText>
        </div>
      </Col>
    </Row>
  );
};
