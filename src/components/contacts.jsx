import React from "react";
import { Row, Col, Table, Tag, Select } from "antd";
import { fetchData } from "../api/api";
import { NATIONALITIES } from "../constants/nationalities";
// import Filters from "./filters";
// const { Option } = Select;

const columns = [
  {
    title: "Avatar",
    dataIndex: "picture",
    key: "cell",
    render: (avatar) => (
      <img className="user-icon" src={avatar.medium} alt="" />
    ),
  },
  {
    title: "Full name",
    dataIndex: "name",
    key: "full_name",
    render: (name) => (
      <a href="/#">{`${name["title"]}. ${name["first"]} ${name["last"]}`}</a>
    ),
  },
  {
    title: "Birthday",
    dataIndex: "dob",
    key: "birthday",
    render: ({ date, age }) => (
      <div>
        {new Intl.DateTimeFormat("en", {
          weekday: "long",
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }).format(new Date(date))}
        <p>{age} years</p>
      </div>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (email) => <a href={`mailto:${email}`}>{email}</a>,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
    render: ({ country, street, city, state, postcode }) => (
      <>
        <h4>/{country}/</h4>
        <p>{`${street["number"]} ${street["name"]}, ${city}, ${state} ${postcode}`}</p>
      </>
    ),
  },
  {
    title: "Nationality",
    dataIndex: "nat",
    key: "nationality",
    render: (nat) => {
      const nationality = NATIONALITIES[nat] || NATIONALITIES.UNKNOWN;

      return <Tag color={nationality.color}>{nationality.name}</Tag>;
    },
  },
];

export default class Contacts extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts_list: [],
    };
  }

  getContacts = () => {
    fetchData({
      params: {
        results: 152,
        seed: "wezom-react-redux-test",
      },
    }).then((data) =>
      this.setState({
        contacts_list: data,
      })
    );
  };

  componentDidMount() {
    this.getContacts();
  }

  handleChange = (value) => this.setState({ gender: value });

  render() {
    return (
      <>
        <Row align="center">
          <Col span={20}>
            {/* <Filters /> */}
            <div>
              {/* <Select
                onChange={this.handleChange}
                style={{ width: 120 }}
                allowClear
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="indeterminate">Indeterminate</Option>
              </Select> */}
            </div>
          </Col>
        </Row>
        <Row align="center">
          <Col span={20}>
            <Table columns={columns} dataSource={this.state.contacts_list} />
          </Col>
        </Row>
      </>
    );
  }
}
