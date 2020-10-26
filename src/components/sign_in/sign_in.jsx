import React from "react";
import { Button, Modal, Form, Input } from "antd";
import { LoginOutlined } from "@ant-design/icons";

export default class SignIn extends React.Component {
  state = {
    loading: false,
    modalVisible: false,
  };

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }

  handleSubmit = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, modalVisible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    return (
      <>
        <Button type="link" onClick={() => this.setModalVisible(true)}>
          <LoginOutlined /> Sign In
        </Button>
        <Modal
          title="Sign In"
          centered
          visible={this.state.modalVisible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          footer={[
            <Button
              key="submit"
              htmlType="submit"
              type="primary"
              loading={this.state.loading}
              onClick={this.handleOk}
            >
              Submit
            </Button>,
            <Button key="back" onClick={this.handleCancel}>
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
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
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

            {/* <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item> */}
          </Form>
        </Modal>
      </>
    );
  }
}
