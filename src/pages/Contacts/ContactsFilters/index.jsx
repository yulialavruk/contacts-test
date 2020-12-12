import { useCallback } from "react";
import { Form, Row, Col, Select, Input, Checkbox, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { NATIONALITIES } from "../../../constants/nationalities";
const { Option } = Select;
const { Search } = Input;

const children = [];
for (let key in NATIONALITIES) {
  children.push(<Option key={key}>{NATIONALITIES[key].name}</Option>);
}

const initialState = {
  search: "",
  gender: "",
  nat: [],
};

export const ContactsFilters = ({ setFilters, search, gender, nat }) => {
  const handleChange = useCallback(
    (value) =>
      setFilters((prevState) => ({ ...prevState, gender: value ? value : "" })),
    [setFilters]
  );
  const handleChangeNat = useCallback(
    (value) => setFilters((prevState) => ({ ...prevState, nat: value })),
    [setFilters]
  );
  const onChangeSearch = useCallback(
    (e) =>
      setFilters((prevState) => ({
        ...prevState,
        search: e ? e.target.value : "",
      })),
    [setFilters]
  );

  const onClear = useCallback(() => {
    setFilters({ ...initialState });
  }, [setFilters]);

  return (
    <Form layout="inline" className="box">
      <Row
        className="contacts-filters box__content"
        align="middle"
        justify="center"
      >
        <Col flex="auto">
          <Row align="middle" justify="center">
            <Col lg={11} xs={24}>
              <Form.Item label="">
                <Search
                  className="contacts-filters__item"
                  size="large"
                  placeholder="Search by full name"
                  allowClear
                  onChange={onChangeSearch}
                  value={search}
                />
              </Form.Item>
            </Col>
            <Col lg={4} sm={10} xs={24}>
              <Form.Item label="">
                <Select
                  className="contacts-filters__item"
                  size="large"
                  onChange={handleChange}
                  allowClear
                  placeholder="Gender"
                  value={gender}
                >
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="indeterminate">Indeterminate</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col lg={5} sm={14} xs={24}>
              <Form.Item label="">
                <Select
                  className="contacts-filters__item"
                  size="large"
                  placeholder="Nationality"
                  mode="multiple"
                  allowClear
                  onChange={handleChangeNat}
                  value={nat}
                >
                  {children}
                </Select>
              </Form.Item>
            </Col>
            <Col lg={4} sm={7} xs={24}>
              <Form.Item className="contacts-filters__item" label="">
                <Checkbox size="large">I am creator</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col flex="100px">
          <Button type="link" onClick={onClear}>
            <CloseOutlined />
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
