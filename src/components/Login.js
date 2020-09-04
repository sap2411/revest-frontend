import React from 'react';
import { api } from '../services/api';
import { trackPromise } from 'react-promise-tracker'

class Login extends React.Component {
  state = {
    error: false,
    fields: {
      email: this.props.email ? this.props.email : '',
      password: this.props.password ? this.props.password : ''
    }
  };

  handleChange = e => {
    const updated = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: updated });
  };

  handleSubmit = e => {
    e.preventDefault();
    trackPromise(
    api.auth.login({user: this.state.fields}).then(res => {
      if (!res.message) {
        localStorage.setItem("token", res.jwt);
        this.props.onLogin(res.user.data.attributes);
        if(res.user.data.relationships.transactions.data.length > 0) this.props.history.push('/statistics')
        else this.props.history.push('/home');
      } else {
        this.setState({ error: true });
      }
    }));
  };

  render() {
    const { fields } = this.state;
    return (
        <div className="card col-4 my-5 mx-auto px-0 rounded-lg text-center">
          <form className="card-body" onSubmit={this.handleSubmit}>
            <div className="form-group col-sm text-left">
              <h3 >Welcome Back</h3>
              <p>Don't have an account? <span className="p green" onClick={() => this.props.history.push('/create-account')}><u>sign up</u></span></p>
            </div>
            <div className="form-group col-sm">
              <input type='email' className="form-control" 
                name="email"
                placeholder="Email"
                value={fields.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group col-sm">
              <input className="form-control" 
                name="password"
                type="password"
                placeholder="Password"
                value={fields.password}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group col-sm" >
            <button type="submit" className="btn btn-block btn-success p"> <i className="fas fa-sign-in-alt"></i>
              <span> Submit</span>
            </button>
            </div>
            <div className="form-group col-sm" >
            {this.state.error && <h2>Invalid Credentials</h2>}
            </div>
          </form>
        </div>
    );
  }
}

export default Login;