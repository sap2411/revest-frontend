import React, {Component} from 'react';
import { Redirect } from "react-router-dom";
import { api } from '../services/api';

class AccountForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            first_name: !!this.props.user.id ? this.props.user.first_name : '',
            last_name: !!this.props.user.id ? this.props.user.last_name : '',
            email: !!this.props.user.id ? this.props.user.email : '',
            password: '',
            age: !!this.props.user.id ? this.props.user.age : '',
            income: !!this.props.user.id ? this.props.user.income : '',
            fetchMessages: false,
            passwordC: '',
            redirect: null
        }
    } 

    handleSubmit = event => {
        event.preventDefault()
        api.auth.createNewUser(this.state)
        .then(this.handleFetchResponse)
        // this.createNewUser(this.state)
    }
    
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // createNewUser = userData => {
    //     const options = {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({user: userData})
    //     }
    //     fetch('http://localhost:3001/api/v1/users', options)
    //     .then(resp => resp.json())
    //     .then(this.handleFetchResponse)
    // }

    handleFetchResponse = response => {
        console.log(response)
        if (response.error) {
            // Set error messages
            this.setState({fetchMessages: response.error})
         } else{
            localStorage.setItem("token", response.jwt)

            // Redirect via state update
            this.setState({redirect: '/home'})
            // Fake log in user
            this.props.loggedIn(response.user.data.attributes)
        }  
    }

    match = () => {
        return this.state.password === this.state.passwordC
    }

    render () {
        // Redirect function used after form submit
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div className="card col-4 my-5 mx-auto px-0 rounded-lg text-center">
                <form className="card-body" onSubmit={event => this.handleSubmit(event)}>
                    <div className="form-group col-sm text-left">
                        <h3>{!!this.props.user.id ? 'Edit' : 'Create'} Account</h3>
                        {!!this.props.user.id ? null : <h7>Already have an account? <span className="p" onClick={() => this.props.history.push('/login')}><u>sign in</u></span></h7>}
                    </div>
                    <div className="form-group col-sm">
                        <input type="text" className="form-control" placeholder="First Name" name="first_name" value={this.state.first_name} onChange={event => this.handleChange(event)}/>
                    </div>
                    <div className="form-group col-sm">
                        <input type="text" className="form-control" placeholder="Last Name" name="last_name" value={this.state.last_name} onChange={event => this.handleChange(event)}/>
                    </div>
                    <div className="form-group col-sm">
                        <input type="email" className="form-control" placeholder="Email Address" name="email" value={this.state.email} onChange={event => this.handleChange(event)}/>
                    </div>
                    <div className="form-group col-sm">
                        <input type="number" step="0.01" className="form-control" placeholder="Monthly Income" name="income" value={this.state.income} onChange={event => this.handleChange(event)}/>
                    </div>
                    <div className="form-group col-sm">
                        <input type="number" className="form-control" placeholder="Age" name="age" value={this.state.age} onChange={event => this.handleChange(event)}/>
                    </div>
                    <div className="form-group col-sm">
                        <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={event => this.handleChange(event)}/>
                    </div>
                    <div className="form-group col-sm">
                        <input type="password" className="form-control" placeholder="Password Confirmation" name="passwordC" value={this.state.passwordC} onChange={event => this.handleChange(event)}/>
                    </div>

                    <div className="form-group col-sm">
                    {this.state.password === this.state.passwordC && !!this.state.password ? 
                        <button type="submit" className="btn btn-block btn-success p">
                            {!!this.props.user.id ? <i className="fas fa-user-edit"></i> : <i className="fas fa-user-plus"></i>}
                            <span className="d-none d-sm-none d-md-inline"> {!!this.props.user.id ? 'Edit' : 'Create'} Account</span>
                        </button> 
                        :
                        <button type="submit" disabled className="btn btn-block btn-success p">
                            {!!this.props.user.id ? <i className="fas fa-user-edit"></i> : <i className="fas fa-user-plus"></i>}
                            <span className="d-none d-sm-none d-md-inline"> {!!this.props.user.id ? 'Edit' : 'Create'} Account</span>
                        </button> 
                    }   
                    </div>
        
                    {/* Conditionally render via && operator acting as if statement */}
                    {this.state.fetchMessages &&
                        <div className="d-flex justify-content-center">
                            <ul className="list-unstyled text-danger">
                                {<li key={1}>{this.state.fetchMessages}</li>}
                            </ul>
                        </div>
                    }
                </form>

            </div>
        )
    }
}

export default AccountForm