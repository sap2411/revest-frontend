import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AccountForm from './components/AccountForm.js';
import Navbar from './components/Navbar.js';
import About from './components/About.js';
import './App.css';

const URL = 'http://localhost:3001/'
class App extends Component {

  constructor(props){
    super(props)
    this.state={
      user: null
    }
  }

  // testFetch = () => {
  //   fetch('http://localhost:3001/api/v1/auth', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json'      
  //     },
  //     body: JSON.stringify({
  //       user: {
  //         first_name: "sylvieawoeods",
  //         last_name: "brob",
  //         income: 440.0,
  //         email: 'hi',
  //         age: 30,
  //         password: "bbb"
  //       }
  //     })
  //   })
  //   .then(r => r.json())
  //   .then(console.log)
  // }

  // componentDidMount = () => {
  //   this.testFetch()
  // }

  loggedIn = (userData) => {
    this.setState({
      user: {...userData}
    })
  }


  render() {
    return (
      <Router>
      <div>
        <Navbar user={this.state.user}/>
        <Route exact path="/" component={() => <About  />} />
        {/* <Route exact path="/log-in" component={() => <LogInForm user={this.state.user} />} /> */} */}
        <Route exact path="/create-account" component={() => <AccountForm user={this.user} loggedIn={this.loggedIn} />} />
        {/* <Route exact path="/edit-account" component={() => <AccountForm  user={this.state.user} />} /> */}
      </div>
    </Router>
    );
  }
}

export default App;
