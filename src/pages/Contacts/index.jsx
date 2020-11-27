import { useState, useEffect } from "react";
import { useContacts } from "./useContacts";
import { Row, Col, Radio, Button, Spin, Tooltip } from "antd";
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

const getInitialDataViewMode = () =>
  localStorage.getItem("dataViewMode") || DATA_VIEW_MODES.TABLE;

export const Contacts = () => {
  const contacts = useContacts();
  const [dataViewMode, setDataViewMode] = useState(getInitialDataViewMode);

  const onChangeViewMode = (e) => setDataViewMode(e.target.value);

  useEffect(() => localStorage.setItem("dataViewMode", dataViewMode), [
    dataViewMode,
  ]);

  // const toggleReload = () => {
  //   useContacts();
  // };

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
                // onClick={toggleReload}
              />
              <Radio.Group value={dataViewMode} onChange={onChangeViewMode}>
                <Tooltip title={DATA_VIEW_MODES.GRID}>
                  <Radio.Button value={DATA_VIEW_MODES.GRID}>
                    <AppstoreOutlined />
                  </Radio.Button>
                </Tooltip>
                <Tooltip title={DATA_VIEW_MODES.TABLE}>
                  <Radio.Button value={DATA_VIEW_MODES.TABLE}>
                    <UnorderedListOutlined />
                  </Radio.Button>
                </Tooltip>
              </Radio.Group>
            </div>
          </Col>
        </Row>
        <Spin spinning={contacts.isLoading}>
          {dataViewMode === DATA_VIEW_MODES.TABLE ? (
            <TableContent contacts_list={contacts.data} />
          ) : (
            <div>grid</div>
          )}
        </Spin>
      </Col>
    </Row>
  );
};
