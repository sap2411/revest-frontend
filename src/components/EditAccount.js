import React, {Component} from 'react';
import { Redirect } from "react-router-dom";
import AuthHOC from '../HOCs/AuthHOC.js';
import { api } from '../services/api';
import { Modal, Button } from "react-bootstrap";


class EditAccount extends Component{
    state = {
        income: this.props.user.income,
        age: this.props.user.age,
        fetchMessages: false,
        show: false
    }

    handleSubmit = event => {
        event.preventDefault()
        api.auth.updateUser(this.state, this.props.user.id)
        .then(this.handleFetchResponse)
        // this.createNewUser(this.state)
    }
    
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleClick = () => {
        this.setState({
            show: true
        })
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }

    handleDelete = () => {
        this.setState({
            show: false
        })
        api.auth.deleteUser(this.props.user.id)
        .then(this.props.handleLogOut)
    }

    handleFetchResponse = response => {
        console.log(response)
        if (response.error) {
            // Set error messages
            this.setState({fetchMessages: response.error})
         } else{
            // Redirect via state update
            this.setState({redirect: '/statistics'})
            this.props.loggedIn(response.data.attributes)
        }  
    }

    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className="card col-4 my-5 mx-auto px-0 rounded-lg text-left">
                <form className="card-body" onSubmit={event => this.handleSubmit(event)}>
                    <div className="form-group col-sm text-left">
                        <h3>Edit Account </h3>
                        <h7>Or, <span className="p" onClick={this.handleClick}><u>delete your account</u></span></h7>
                    </div>
                    <div className="form-group col-sm">
                        <label className="text-left">Monthly net income</label>
                        <input type="number" step="0.01" className="form-control" placeholder="Monthly Income" name="income" value={this.state.income} onChange={event => this.handleChange(event)}/>
                    </div>
                    <div className="form-group col-sm">
                        <label className="text-left">Age</label>
                        <input type="number" className="form-control" placeholder="Age" name="age" value={this.state.age} onChange={event => this.handleChange(event)}/>
                    </div>

                    <div className="form-group col-sm">
                        <button type="submit"  className="btn btn-block btn-success p">
                            <i className="fas fa-user-edit"></i> 
                            <span className="d-none d-sm-none d-md-inline"> Edit Account</span>
                        </button> 
                    </div>
                </form>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Delete Account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you wish to delete your account?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Cancle
                    </Button>
                    <Button variant="primary" onClick={this.handleDelete}>
                        Yes, Delete
                    </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}

export default AuthHOC(EditAccount)