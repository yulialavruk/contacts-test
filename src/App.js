import React from "react";
import logo from "./logo.svg";
import logo_icon from "./assets/logo.png";
import { Layout, Row, Col } from "antd";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import { fetchData } from "./api/api";
import SignIn from "./components/header/sign_in/sign_in";
import { openNotification } from "./components/notification";
import { Profile } from "./pages/Profile";
import { Contacts } from "./pages/Contacts";
import "./App.css";

const { Header, Content, Footer } = Layout;

class App extends React.Component {
  state = {
    loading: false,
    show_modal: false,
    user: null,
    email: localStorage.getItem("seed_key"),
    referrer: false,
  };

  onChange = (e) => this.setState({ email: e.target.value });

  setShowModal = (show_modal) => {
    this.setState({ show_modal });
  };

  componentDidMount() {
    const { email } = this.state;
    email &&
      fetchData({
        params: {
          seed: this.state.email,
          results: 1,
        },
      })
        .then((data) => {
          return this.setState({
            user: data[0],
          });
        })
        .catch(() => {
          openNotification("error");
        });
  }

  handleSubmit = () => {
    this.setState({ loading: true }, () => {
      fetchData({
        params: {
          seed: this.state.email,
          results: 1,
        },
      })
        .then((data) => {
          localStorage.setItem("seed_key", this.state.email);
          console.log(data);
          return this.setState({
            loading: false,
            show_modal: false,
            user: data[0],
            referrer: "/profile",
          });
        })
        .catch(() => {
          openNotification("error");
          return this.setState({
            loading: false,
            show_modal: false,
          });
        });
    });
  };

  handleCancel = () => {
    this.setState({ show_modal: false });
  };

  onLogout = () => {
    openNotification("success");
    this.setState({ user: null }, () => localStorage.removeItem("seed_key"));
  };

  render() {
    const { loading, show_modal, user, email, referrer } = this.state;
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
              <Route path="/profile">{user && <Profile user={user} />}</Route>
              {referrer && (
                <Redirect
                  to={{
                    pathname: "/profile",
                  }}
                />
              )}
            </Content>
            <Footer>2020 © Wezom React-Redux Test</Footer>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
