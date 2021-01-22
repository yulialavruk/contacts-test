import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Modal, Form, Input, Row, Col } from "antd";
import { validateEmail, validatePassword } from "./validate";
import { openNotification } from "../notification";

export const SignInModal = ({ isShowModal, setUser, setIsShowModal }) => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(false);

  const onChange = (e) => setEmail(e.target.value);

  const handleSubmit = () => {
    const getUser = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://randomuser.me/api/?seed=${email}&results=1`
        );

        const { results } = await response.json();
        localStorage.setItem("seed_key", email);
        setUser(results[0]);
        history.push("/profile");
      } catch (e) {
        openNotification("error");
      } finally {
        setIsLoading(false);
        setIsShowModal(false);
      }
    };
    getUser();
  };

  const handleCancel = () => {
    setIsShowModal(false);
  };

  return (
    <Modal
      title="Sign In"
      centered
      visible={isShowModal}
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
              loading={isLoading}
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
  );
};
