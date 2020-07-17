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
      if (!res.error) {
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
        {this.state.error ? <h1>Try again...</h1> : null}
        <div className="ui form">
          <form onSubmit={this.handleSubmit}>
            <div className="ui field">
              <label>email</label>
              <input
                name="email"
                placeholder="email"
                value={fields.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="ui field">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="password"
                value={fields.password}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="ui basic blue button">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;