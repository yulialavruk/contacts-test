import React from "react";
import { Row, Col } from "antd";
import { fetchData } from "../../api/api";
import { TableContent } from "../table/table";

export default class Contacts extends React.Component {
  state = {
    contacts_list: [],
  };

  getContacts = () => {
    fetchData({
      params: {
        results: 152,
        seed: "wezom-react-redux-test",
      },
    }).then((data) =>
      this.setState({
        contacts_list: data,
      })
    );
  };

  componentDidMount() {
    this.getContacts();
  }

  render() {
    const { contacts_list } = this.state;
    return (
      <Row align="center">
        <Col span={20}>
          <TableContent contacts_list={contacts_list} />
        </Col>
      </Row>
    );
  }
}
