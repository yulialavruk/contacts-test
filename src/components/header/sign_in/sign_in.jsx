import React from "react";
import { Button, Modal, Form, Input, Row, Col } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";
import UserMenu from "../user_menu";
import { validateEmail, validatePassword } from "./validate";

class SignIn extends React.Component {
  render() {
    const {
      loading,
      show_modal,
      user,
      setShowModal,
      handleSubmit,
      handleCancel,
      onLogout,
      onChange,
    } = this.props;
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
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            layout="vertical"
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  validator: validateEmail,
                },
              ]}
              onChange={onChange}
            >
              <Input placeholder="Email" type="email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  validator: validatePassword,
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Row>
              <Col span={15}>
                <Button
                  htmlType="submit"
                  type="primary"
                  size="large"
                  style={{ width: "100%" }}
                  loading={loading}
                >
                  Sign In
                </Button>
              </Col>
              <Col span={9}>
                <Button
                  type="link"
                  size="large"
                  style={{ width: "100%" }}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal>
      </>
    );
  }
}

export default SignIn;
