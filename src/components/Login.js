import React from 'react';
import { api } from '../services/api';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false,
      fields: {
        email: '',
        password: ''
      }
    };
  }

  handleChange = e => {
    const updated = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: updated });
  };

  handleSubmit = e => {
    e.preventDefault();
    api.auth.login({user: this.state.fields}).then(res => {
      if (!res.message) {
        localStorage.setItem("token", res.jwt);
        this.props.onLogin(res.user.data.attributes);
        this.props.history.push('/');
      } else {
        this.setState({ error: true });
      }
    });
  };

  render() {
    const { fields } = this.state;
    return (
      <div>
        <div className="card col-3 my-5 mx-auto px-0 rounded-lg text-center">
          <form className="card-body" onSubmit={this.handleSubmit}>
            <div className="form-group col-sm">
            <h2>Log In</h2>
            </div>
            <div className="form-group col-sm">
              <input
                name="email"
                placeholder="Email"
                value={fields.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group col-sm">
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={fields.password}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group col-sm" >
            <button type="submit" className="btn btn-block btn-success p">
              Submit
            </button>
            </div>
            <div className="form-group col-sm" >
            {this.state.error ? <h2>Invalid Credentials</h2> : null}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;