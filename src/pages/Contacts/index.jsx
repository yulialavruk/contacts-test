import { useState } from "react";
import _ from "lodash";
import { useContacts } from "./useContacts";
import { useDataViewMode } from "./useDataViewMode";
import { Row, Col, Button, Spin } from "antd";
import { DATA_VIEW_MODES } from "./constants";
import { ToggleDataViewMode } from "./ToggleDataViewMode";
import { ContactsFilters } from "./ContactsFilters";
import { ContactsTable } from "./ContactsTable";
import { ContactsStatistic } from "./ContactsStatistic";
import { ReloadOutlined, LoadingOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const { Title } = Typography;

const initialState = {
  search: "",
  gender: "",
  nat: [],
};

export const Contacts = () => {
  const contacts = useContacts();
  const [dataViewMode, setDataViewMode] = useDataViewMode();
  const [{ search, gender, nat }, setFilters] = useState(initialState);

  const nestedFilter = (targetArray, filters) => {
    var filterKeys = Object.keys(filters);
    return targetArray.filter(function (eachObj) {
      return filterKeys.every(function (eachKey) {
        if (!filters[eachKey].length) {
          return true;
        }
        return filters[eachKey].includes(eachObj[eachKey]);
      });
    });
  };

  const searchFilter = (data) => {
    return data.filter((contact) =>
      (contact.name.first + contact.name.last)
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  };

  const getList = () => {
    if (!_.isEqual({ search, gender, nat }, initialState)) {
      const filters = { gender: gender ? [gender] : [], nat };
      if (search) {
        const filteredList = nestedFilter(contacts.data, filters);
        return searchFilter(filteredList);
      }
      return nestedFilter(contacts.data, filters);
    }
    return contacts.data;
  };

  const contactsData = getList();

  // const toggleReload = () => {
  //   useContacts();
  // };

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
          <ContactsTable data={contactsData} />
        ) : (
          <div>grid</div>
        )}
      </Spin>
      <ContactsStatistic data={contactsData} />
    </>
  );
};
