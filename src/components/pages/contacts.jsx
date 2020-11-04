import React from "react";
import { Row, Col, Radio, Button, Tooltip, Spin } from "antd";
import { fetchData } from "../../api/api";
import { TableContent } from "../table/table";
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  ReloadOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { openNotification } from "../../utils/notification";

export default class Contacts extends React.Component {
  state = {
    contacts_list: [],
    view_mode: "tabular_view",
    loading: false,
  };

  getContacts = () => {
    this.setState({ loading: true }, () => {
      fetchData({
        params: {
          results: 150,
        },
      })
        .then((data) =>
          this.setState({
            contacts_list: data,
            loading: false,
          })
        )
        .catch(() => {
          openNotification("error");
          return this.setState({
            loading: false,
          });
        });
    });
  };

  onChangeViewMode = (e) =>
    this.setState({ view_mode: e.target.value }, () =>
      localStorage.setItem("view_mode", this.state.view_mode)
    );

  componentDidMount() {
    this.getContacts();
    localStorage.setItem("view_mode", this.state.view_mode);
  }

  render() {
    const { contacts_list, view_mode, loading } = this.state;
    return (
      <Row align="center">
        <Col span={20}>
          <Row justify="space-between">
            <Col>
              <h1 align="left">Contacts</h1>
            </Col>
            <Col>
              <div>
                <Button
                  type="dashed"
                  shape="circle"
                  icon={loading ? <LoadingOutlined /> : <ReloadOutlined />}
                  onClick={this.getContacts}
                />
                <Radio.Group value={view_mode} onChange={this.onChangeViewMode}>
                  <Radio.Button value="tiled_view">
                    <AppstoreOutlined />
                  </Radio.Button>
                  <Radio.Button value="tabular_view">
                    <UnorderedListOutlined />
                  </Radio.Button>
                </Radio.Group>
              </div>
            </Col>
          </Row>
          <Spin spinning={loading}>
            <TableContent contacts_list={contacts_list} />
          </Spin>
        </Col>
      </Row>
    );
  }
}
