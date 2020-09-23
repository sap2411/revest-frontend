import React, {Component} from 'react';
import { Redirect } from "react-router-dom";
import { api } from '../services/api';
import { trackPromise } from 'react-promise-tracker'

class AccountForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            age: '',
            income: '',
            fetchMessages: false,
            passwordC: '',
            redirect: null,
            continue: false
        }
    } 

    handleSubmit = event => {
        event.preventDefault()
        trackPromise(
        api.auth.createNewUser(this.state)
        .then(this.handleFetchResponse))
    }

    handleContinue = () => {
        const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if(this.state.password.match(pasw)){
        let flip = !this.state.continue
        this.setState({continue: flip})
        }else{
            this.setState({
                fetchMessages: ["Password must be 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"]
            })
        }
    }
    
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSkip = () => {
        // assign default data if the user doesnt input income or age
        this.setState({
            age: 21,
            income: 3000
        }, () => {
            api.auth.createNewUser(this.state)
            .then(this.handleFetchResponse)
        })
    }

    handleFetchResponse = response => {
        if (response.errors) {
            // Set error messages
            if(response.errors[(response.errors.length-1)]=== "Password is invalid"){
                this.setState({
                    fetchMessages: [...response.errors, "Password requires 1 uppercase, 1 lowercase, 1 number, and 1 special character"],
                    continue: false
                })
            }else{
                this.setState({
                    fetchMessages: response.errors,
                    continue: false
                })
            }
         }else{
            localStorage.setItem("token", response.jwt)

            // Redirect via state update
            this.setState({redirect: '/home'})
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
            <div className="card col-4 my-5 mx-auto px-0 rounded-lg">
                {this.state.continue ? 
                    <form className="card-body" onSubmit={event => this.handleSubmit(event)}>
                    <div className="form-group col-sm text-left">
                        <h3>Tells us about yourself</h3>
                        <h7>So that we can customize your plan.</h7>
                    </div>
                    <div className="form-group col-sm">
                        <input type="number" step="0.01" className="form-control" placeholder="Monthly Income" name="income" value={this.state.income} onChange={event => this.handleChange(event)}/>
                    </div>
                    <div className="form-group col-sm">
                        <input type="number" className="form-control" placeholder="Age" name="age" value={this.state.age} onChange={event => this.handleChange(event)}/>
                    </div>

                    <div className="form-group col-sm">
                    <button  type="submit" className="btn btn-block btn-success p">
                            <i className="fas fa-user-plus"></i>
                            <span className="d-none d-sm-none d-md-inline"> Create Account</span>
                        </button> 
                        <h7>Optionally, you can edit this later and <span className="p green" onClick={this.handleSkip}><u>skip for now</u></span></h7>
                    </div>
                </form>
                :
                <form className="card-body" >
                    <div className="form-group col-sm text-left">
                        <h3>Create Account</h3>
                        {!!!this.props.user.id && <h7>Already have an account? <span className="p " onClick={() => this.props.history.push('/login')}><u className='green' >sign in</u></span></h7>}
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
                        <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={event => this.handleChange(event)}/>
                    </div>
                    <div className="form-group col-sm">
                        <input type="password" className="form-control" placeholder="Password Confirmation" name="passwordC" value={this.state.passwordC} onChange={event => this.handleChange(event)}/>
                    </div>
                    <div className="form-group col-sm">                   
                        <button disabled={this.state.password === this.state.passwordC && !!this.state.password ? false : true} onClick={this.handleContinue} type="submit" className="btn btn-block btn-success p">
                            {!!this.props.user.id ? <i className="fas fa-user-edit"></i> : <i className="fas fa-user-plus"></i>}
                            <span className="d-none d-sm-none d-md-inline"> Continue</span>
                        </button> 
                    </div>       
                    {/* Conditionally render via && operator acting as if statement */}
                    {this.state.fetchMessages &&
                        <div className="d-flex justify-content-center">
                            <ul className="list-unstyled text-danger">
                            {this.state.fetchMessages.map((message, index) => <li key={index}>{message}</li>)}
                            </ul>
                        </div>
                    }
                </form>}
            </div>
        )
    }
}

export default AccountForm