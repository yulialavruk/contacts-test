import { useContacts } from "./useContacts";
import { useDataViewMode } from "./useDataViewMode";
import { Row, Col, Button, Spin } from "antd";
import { DATA_VIEW_MODES } from "./constants";
import { ToggleDataViewMode } from "./ToggleDataViewMode";
import { ContactsTable } from "./ContactsTable";
import { ReloadOutlined, LoadingOutlined } from "@ant-design/icons";

export const Contacts = () => {
  const contacts = useContacts();
  const [dataViewMode, setDataViewMode] = useDataViewMode();

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
              <ToggleDataViewMode
                dataViewMode={dataViewMode}
                setDataViewMode={setDataViewMode}
              />
            </div>
          </Col>
        </Row>
        <Spin spinning={contacts.isLoading}>
          {dataViewMode === DATA_VIEW_MODES.TABLE ? (
            <ContactsTable contacts_list={contacts.data} />
          ) : (
            <div>grid</div>
          )}
        </Spin>
      </Col>
    </Row>
  );
};
