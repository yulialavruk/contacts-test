import React from "react";
import { Select } from "antd";

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

export default class Filters extends React.Component {
  render() {
    return (
      <div>
        <Select onChange={handleChange} style={{ width: 120 }} allowClear>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="indeterminate">Indeterminate</Option>
        </Select>
      </div>
    );
  }
}
