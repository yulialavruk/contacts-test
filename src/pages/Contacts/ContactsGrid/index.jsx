import { Card, Col, Row } from "antd";

export const ContactsGrid = ({ data }) => {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card
          hoverable
          // bordered={false}
          cover={<img alt="example" src={data[0].picture.large} />}
        >
          Card content
        </Card>
      </Col>
    </Row>
  );
};
