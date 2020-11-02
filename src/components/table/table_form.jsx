import React from "react";
import { Form, Row, Col, Select, Input, Checkbox, Button } from "antd";
import { NATIONALITIES } from "../../constants/nationalities";
// import Filters from "./filters";
const { Option } = Select;
const { Search } = Input;

const children = [];
for (let key in NATIONALITIES) {
  children.push(<Option key={key}>{NATIONALITIES[key].name}</Option>);
}

export const TableForm = ({
  onChangeSearch,
  handleChange,
  handleChangeNat,
}) => (
  <Form layout="inline">
    <Row>
      <Col>
        <Row>
          <Col>
            <Form.Item label="">
              <Search
                placeholder="Search by full name"
                allowClear
                onChange={onChangeSearch}
                style={{ width: 200, margin: "0 10px" }}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="">
              <Select onChange={handleChange} style={{ width: 120 }} allowClear>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="indeterminate">Indeterminate</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="">
              <Select
                mode="multiple"
                allowClear
                style={{ width: 150 }}
                placeholder="Please select"
                onChange={handleChangeNat}
              >
                {children}
              </Select>
            </Form.Item>
          </Col>
          {/* <Col>
            <Form.Item label=""></Form.Item>
          </Col> */}
        </Row>
      </Col>
      <Col>
        <Button></Button>
      </Col>
    </Row>
  </Form>
);
