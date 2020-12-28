import { useState } from "react";
import { Card, Pagination, Col, Row, Tag } from "antd";
import { CopyToClipboardText } from "../../../components/CopyToClipboardText";
import { NATIONALITIES } from "../../../constants/nationalities";

export const ContactsGrid = ({ data }) => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(6);

  const handlePageChange = (value, pageSize) => {
    setMinValue((value - 1) * pageSize);
    setMaxValue(value * pageSize);
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        {data &&
          data.slice(minValue, maxValue).map((contact) => (
            <Col span={8} key={contact.login.uuid}>
              <Card
                className="contacts-card"
                hoverable
                cover={
                  <img
                    className="contacts-card__img"
                    alt={`${contact.name["first"]} ${contact.name["last"]}`}
                    src={contact.picture.large}
                  />
                }
              >
                <a href="/#">{`${contact.name["title"]}. ${contact.name["first"]} ${contact.name["last"]}`}</a>
                <span> ({contact.dob.age + " years "}) </span>
                <div>
                  <CopyToClipboardText text={contact.email}>
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </CopyToClipboardText>
                </div>
                <div>
                  <CopyToClipboardText text={contact.phone}>
                    <a href={`tel:${contact.phone}`}>{contact.phone}</a>
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
                <Tag
                  color={
                    (NATIONALITIES[contact.nat] || NATIONALITIES.UNKNOWN).color
                  }
                >
                  {(NATIONALITIES[contact.nat] || NATIONALITIES.UNKNOWN).name}
                </Tag>
              </Card>
            </Col>
          ))}
      </Row>
      <Row justify="end" gutter={[8, 16]}>
        <Pagination
          defaultCurrent={1}
          total={data.length}
          size="small"
          defaultPageSize={6}
          pageSizeOptions={["6", "12", "36", "48"]}
          onChange={handlePageChange}
        />
      </Row>
    </>
  );
};
