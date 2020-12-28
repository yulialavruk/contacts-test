import { useState } from "react";
import { useContacts } from "./useContacts";
import { useDataViewMode } from "./useDataViewMode";
import { Row, Col, Button, Spin } from "antd";
import { DATA_VIEW_MODES } from "./constants";
import { ToggleDataViewMode } from "./ToggleDataViewMode";
import { ContactsFilters } from "./ContactsFilters";
import { ContactsTable } from "./ContactsTable";
import { ContactsGrid } from "./ContactsGrid";
import { ContactsStatistic } from "./ContactsStatistic";
import { ReloadOutlined, LoadingOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const { Title } = Typography;

const initialState = {
  search: "",
  gender: null,
  nat: [],
};

export const Contacts = () => {
  const contacts = useContacts();
  const [dataViewMode, setDataViewMode] = useDataViewMode();
  const [{ search, gender, nat }, setFilters] = useState(initialState);

  const getDataByFilters = (contacts, { search, gender, nat }) => {
    let data = [...contacts];

    if (search) {
      data = data.filter((contact) =>
        (contact.name.first + contact.name.last)
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (gender) {
      data = data.filter((contact) => contact.gender === gender);
    }

    if (nat.length) {
      data = data.filter((contact) => nat.indexOf(contact.nat) !== -1);
    }

    return data;
  };

  const dataByFilters = getDataByFilters(contacts.data, {
    search,
    gender,
    nat,
  });

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={2}>Contacts</Title>
        </Col>
        <Col>
          <div>
            <Button
              className="btn-reload"
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
      <ContactsFilters
        setFilters={setFilters}
        search={search}
        gender={gender}
        nat={nat}
      />
      <Spin spinning={contacts.isLoading}>
        {dataViewMode === DATA_VIEW_MODES.TABLE ? (
          <ContactsTable data={dataByFilters} />
        ) : (
          <ContactsGrid data={contacts.isLoading === false && dataByFilters} />
        )}
      </Spin>
      <ContactsStatistic data={dataByFilters} />
    </>
  );
};
