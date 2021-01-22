import React from "react";
import { Link } from "react-router-dom";
import { Table, Tag } from "antd";
import { NATIONALITIES } from "../../../constants/nationalities";
import { CopyToClipboardText } from "../../../components/CopyToClipboardText";

const columns = [
  {
    title: "Avatar",
    dataIndex: "picture",
    key: "cell",
    render: (avatar) => {
      return <img className="user-icon" src={avatar.medium} alt="" />;
    },
  },
  {
    title: "Full name",
    dataIndex: "name",
    key: "full_name",
    render: (name, data) => (
      <Link
        to={{
          pathname: `/contacts/${data.login.uuid}`,
          propsContact: data,
        }}
      >
        {`${name["title"]}. ${name["first"]} ${name["last"]}`}
      </Link>
    ),
    sorter: (a, b) =>
      `${a.name["title"]} ${a.name["first"]}`.localeCompare(
        `${b.name["title"]} ${b.name["first"]}`
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
    render: (email) => (
      <CopyToClipboardText text={email}>
        <a href={`mailto:${email}`}>{email}</a>
      </CopyToClipboardText>
    ),
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    render: (phone) => (
      <CopyToClipboardText text={phone}>
        <a href={`tel:${phone}`}>{phone}</a>
      </CopyToClipboardText>
    ),
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
    render: ({ country, street, city, state, postcode }) => (
      <>
        <CopyToClipboardText
          text={`[${country}] ${street["number"]} ${street["name"]}, ${city}, ${state} ${postcode}`}
        >
          <div>
            <h4>/{country}/</h4>
            <p>{`${street["number"]} ${street["name"]}, ${city}, ${state} ${postcode}`}</p>
          </div>
        </CopyToClipboardText>
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

export const ContactsTable = ({ data }) => {
  return (
    <>
      <Table
        columns={columns}
        size="middle"
        rowKey={(record) => record.login.uuid}
        dataSource={data}
      />
    </>
  );
};
