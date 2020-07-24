import React, { Fragment } from "react";
import { api } from "../services/api";
import { Redirect } from "react-router-dom";

const AuthHOC = WrappedComponent => {
  return class AuthHOC extends React.Component {

    state = {
      authorized: false,
      user: []
    };

    componentDidMount() {
        this.checkLogin()
    }

    checkLogin = () => {
      console.log("checking login");
      if (!localStorage.getItem("token")) {
        console.log("no token")
        this.props.history.push("/login")
      } else {
        api.auth.getCurrentUser().then((resp) => {
          if (resp.error) {
            console.log("resp error")
            this.props.history.push("/login")
          } else {
            console.log("authorized")
            this.setState({
              authorized: true,
              user: resp.user.data.attributes
            })
          }
        });
      }
    };

    isAuthorized = () => {
      return this.state.authorized;
    };

    render() {
      return (
        <div>
          {this.isAuthorized() ? (
            <WrappedComponent {...this.props}user={this.state.user} />
          ) : (
            null
          )}
        </div>
      );
    }
  };
};

export default AuthHOC;