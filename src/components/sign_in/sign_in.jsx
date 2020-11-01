import React from "react";
import { Button, Modal, Form, Input, Row, Col } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";
import UserMenu from "./user_menu";

class SignIn extends React.Component {
  isEmail = (email) => {
    const REGEXP_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return REGEXP_EMAIL.test(String(email).toLowerCase());
  };

  validateEmail = (rule, value, callback) => {
    if (value && !this.isEmail(value)) {
      callback("The email format is invalid.");
      return;
    }

    callback();
  };

  validatePassword = (rule, value, callback) => {
    if (value && value.length < 8) {
      callback("The password format is invalid.");
      return;
    }

    callback();
  };

  render() {
    const {
      loading,
      show_modal,
      user,
      setShowModal,
      handleSubmit,
      handleCancel,
      onLogout,
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
          // onOk={handleCancel}
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
            // onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  validator: this.validateEmail,
                },
              ]}
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
                  validator: this.validatePassword,
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
