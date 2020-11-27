import { useState } from "react";
import { useContacts } from "./useContacts";
import { Row, Col, Radio, Button, Spin } from "antd";
import { TableContent } from "./ContactsTable";
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  ReloadOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

const DATA_VIEW_MODES = {
  TABLE: "table",
  GRID: "grid",
};

export const Contacts = () => {
  const contacts = useContacts();
  const [dataViewMode, setDataViewMode] = useState(DATA_VIEW_MODES.TABLE);
  // state = {
  //   contacts_list: [],
  //   view_mode: "tabular_view",
  //   loading: false,
  // };

  // onChangeViewMode = (e) =>
  //   this.setState({ view_mode: e.target.value }, () =>
  //     localStorage.setItem("view_mode", this.state.view_mode)
  //   );

  // componentDidMount() {
  //   this.getContacts();
  //   localStorage.setItem("view_mode", this.state.view_mode);
  // }

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
                icon={
                  contacts.isLoading ? <LoadingOutlined /> : <ReloadOutlined />
                }
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
        <Spin spinning={contacts.isLoading}>
          <TableContent contacts_list={contacts.data} />
        </Spin>
      </Col>
    </Row>
  );
};
