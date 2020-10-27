import React from "react";
import { Button, Modal, Form, Input } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";
import UserMenu from "./user_menu";

const SignIn = ({
  loading,
  show_modal,
  user,
  setShowModal,
  handleSubmit,
  handleCancel,
  onLogout,
}) => {
  return (
    <>
      {user ? (
        <>
          <UserMenu user={user} onLogout={onLogout} />
          <Redirect
            to={{
              pathname: "/profile",
            }}
          />
        </>
      ) : (
        <Button type="link" onClick={() => setShowModal(true)}>
          <LoginOutlined /> Sign In
        </Button>
      )}
      <Modal
        title="Sign In"
        centered
        visible={show_modal}
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            htmlType="submit"
            type="primary"
            loading={loading}
            onClick={handleSubmit}
          >
            Submit
          </Button>,
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          name="basic"
          initialValues={{
            remember: true,
          }}
          // onFinish={this.onFinish}
          // onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SignIn;
