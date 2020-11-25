import { useState, useEffect } from "react";
import { Row, Col, Radio, Button, Spin } from "antd";
import { fetchData } from "../api/api";
import { TableContent } from "../components/table/table";
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  ReloadOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { openNotification } from "../utils/notification";

export const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [viewMode, setViewMode] = useState("tabular_view");
  // state = {
  //   contacts_list: [],
  //   view_mode: "tabular_view",
  //   loading: false,
  // };

  useEffect(() => {
    const getContacts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://randomuser.me/api/?results=100");
        const { results } = await response.json();
        setContacts(results);
        setIsLoading(false);
        setIsError(false);
      } catch (e) {
        setIsLoading(false);
        setIsError(true);
      }
    };
    getContacts();
  }, []);

  // getContacts = () => {
  //   this.setState({ loading: true }, () => {
  //     fetchData({
  //       params: {
  //         results: 150,
  //       },
  //     })
  //       .then((data) =>
  //         this.setState({
  //           contacts_list: data,
  //           loading: false,
  //         })
  //       )
  //       .catch(() => {
  //         openNotification("error");
  //         return this.setState({
  //           loading: false,
  //         });
  //       });
  //   });
  // };

  // onChangeViewMode = (e) =>
  //   this.setState({ view_mode: e.target.value }, () =>
  //     localStorage.setItem("view_mode", this.state.view_mode)
  //   );

  // componentDidMount() {
  //   this.getContacts();
  //   localStorage.setItem("view_mode", this.state.view_mode);
  // }

  // const { contacts_list, view_mode, loading } = this.state;
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
                icon={isLoading ? <LoadingOutlined /> : <ReloadOutlined />}
                // onClick={this.getContacts}
              />
              {/* <Radio.Group value={view_mode} onChange={this.onChangeViewMode}>
                <Radio.Button value="tiled_view">
                  <AppstoreOutlined />
                </Radio.Button>
                <Radio.Button value="tabular_view">
                  <UnorderedListOutlined />
                </Radio.Button>
              </Radio.Group> */}
            </div>
          </Col>
        </Row>
        <Spin spinning={isLoading}>
          <TableContent contacts_list={contacts} />
        </Spin>
      </Col>
    </Row>
  );
};
