import React from "react";
import _ from "lodash";
import { Table, Tag } from "antd";
import { NATIONALITIES } from "../../constants/nationalities";
import { TableForm } from "./table_form";

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

export class TableContent extends React.Component {
  initialState = {
    search: "",
    gender: "",
    nat: [],
  };

  state = { ...this.initialState };

  handleChange = (value) => this.setState({ gender: value ? value : "" });
  handleChangeNat = (value) => this.setState({ nat: value });
  onChangeSearch = (e) => this.setState({ search: e ? e.target.value : "" });

  onClear = () => {
    this.setState({ ...this.initialState });
  };
  nestedFilter = (targetArray, filters) => {
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

  search = (data) => {
    const { search } = this.state;
    return data.filter((contact) =>
      (contact.name.first + contact.name.last)
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  };

  getList = () => {
    const { gender, nat, search } = this.state;
    const { contacts_list } = this.props;
    if (!_.isEqual(this.state, this.initialState)) {
      const filters = { gender: gender ? [gender] : [], nat };
      if (search) {
        const filteredList = this.nestedFilter(contacts_list, filters);
        return this.search(filteredList);
      }
      return this.nestedFilter(contacts_list, filters);
    }
    return contacts_list;
  };

  render() {
    const data = this.getList();
    const { search, gender, nat } = this.state;
    return (
      <Table
        columns={columns}
        rowKey={(record) => record.login.uuid}
        dataSource={data}
        title={() => (
          <TableForm
            onChangeSearch={this.onChangeSearch}
            handleChange={this.handleChange}
            handleChangeNat={this.handleChangeNat}
            onClear={this.onClear}
            search={search}
            gender={gender}
            nat={nat}
          />
        )}
      />
    );
  }
}
