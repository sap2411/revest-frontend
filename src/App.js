import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AccountForm from './components/AccountForm.js';
import Navbar from './components/Navbar.js';
import About from './components/Welcome.js';
import Home from './components/Home.js';
import Login from './components/Login.js';
import { api } from "./services/api";
import Plaid from './components/Plaid.js';
import Statistics from './components/Statistics.js';
import Resources from './components/Resources.js';
import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css';

class App extends Component {

  constructor(props){
    super(props)
    this.state={
      auth: {
      user: {}
    }
    }
  }

  login = data => {
    const updatedState = { ...this.state.auth, user: {id: data.id,  first_name: data.first_name, age: data.age }};
    this.setState({ auth: updatedState });
  };

  logout = () => {
    localStorage.removeItem("token");
    localStorage.clear()
    this.setState({ auth: { user: {} } });
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      api.auth.getCurrentUser().then(user => {
        console.log(user)
        const updatedState = { ...this.state.auth, user: user.user.data.attributes };
        this.setState({ auth: updatedState });
      });
    }
  }



  render() {
    return (
    <Router>
      <div>
        <Navbar user={this.state.auth.user} handleLogOut={this.logout} />
        <Route exact path="/" component={() => <About user={this.state.auth.user} />} />
        <Route exact path="/plaid" component={() => <Plaid user={this.state.auth.user} />} />
        <Route exact path="/login" render={props => <Login {...props}  onLogin={this.login} />} />
        <Route exact path="/Home" render={props => <Home {...props}  user={this.state.auth.user} />} />
        <Route exact path="/create-account" component={props => <AccountForm {...props} user={this.state.auth.user} loggedIn={this.login} />} />
        <Route exact path="/statistics" component={props => <Statistics {...props} user={this.state.auth.user}  />} />
        <Route exact path="/resources" component={props => <Resources {...props} user={this.state.auth.user}  />} />
        {/* <Route exact path="/edit-account" component={() => <AccountForm  user={this.state.user} />} /> */}
      </div>
    </Router>
    );
  }
}

export default App;
