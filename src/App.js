import React from "react";
import logo from "./logo.svg";
import logo_icon from "./assets/logo.png";
import { Layout, Row, Col } from "antd";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { fetchData } from "./api/api";
import SignIn from "./components/header/sign_in/sign_in";
import { Profile } from "./components/pages/profile";
import Contacts from "./components/pages/contacts";
import "./App.css";

const { Header, Content, Footer } = Layout;

class App extends React.Component {
  state = {
    loading: false,
    show_modal: false,
    user: null,
    email: "",
  };

  onChange = (e) => this.setState({ email: e.target.value });

  setShowModal = (show_modal) => {
    this.setState({ show_modal });
  };

  handleSubmit = () => {
    this.setState({ loading: true }, () => {
      fetchData({
        params: {
          seed: this.state.email,
          results: 1,
        },
      }).then((data) => {
        localStorage.setItem("seed_key", this.state.email);
        return this.setState({
          loading: false,
          show_modal: false,
          user: data,
        });
      });
    });
  };

  handleCancel = () => {
    this.setState({ show_modal: false });
  };

  onLogout = () => {
    this.setState({ user: null });
  };

  render() {
    const { loading, show_modal, user, email } = this.state;
    return (
      <BrowserRouter>
        <div className="App">
          <Layout className="layout">
            <Header className="header">
              <Row gutter={30}>
                <Col span={3}>
                  <img src={logo_icon} alt="logo" className="logo-icon" />
                </Col>
                <Col span={11} align="start">
                  <Link to="/">Home</Link>
                  {user ? <Link to="/contacts"> Contacts</Link> : ""}
                </Col>
                <Col span={10} align="end">
                  <SignIn
                    loading={loading}
                    show_modal={show_modal}
                    user={user}
                    email={email}
                    onChange={this.onChange}
                    setShowModal={this.setShowModal}
                    handleSubmit={this.handleSubmit}
                    handleCancel={this.handleCancel}
                    onLogout={this.onLogout}
                  />
                </Col>
              </Row>
            </Header>
            <Content className="main">
              <Route exact path="/">
                <img src={logo} className="App-logo" alt="logo" />
              </Route>
              <Route path="/contacts">
                <Contacts />
              </Route>
              <Route path="/profile">
                <Profile user={user && user[0]} />
              </Route>
            </Content>
            <Footer>2020 © Wezom React-Redux Test</Footer>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
