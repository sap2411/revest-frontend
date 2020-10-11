import React, { Component } from 'react'
import { api } from '../services/api';
import { trackPromise } from 'react-promise-tracker'

export default class EditTransaction extends Component{
    state = {
        budget_id: this.props.budget.id,
        button: 'Update Transaction'
    }

    handleSubmit = event => {
        event.preventDefault()
        trackPromise(
        api.auth.updateTransaction(this.state, this.props.transaction.id)
        .then(this.handleFetchResponse))
    }
    
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
            button: 'Update Transaction'
        })
    }

    handleFetchResponse = response => {
        if (response.error) {
         } else{
            // Redirect via state update
            this.setState({button: 'Updated'}, () => {this.props.getBudgets()})
        }  
    }

    renderOptions = () => {
        return this.props.budgets.map(budg => {
            return <option key={budg.id} value={budg.id}>{budg.name}</option>
        })
    }

    render(){
        return(
            <div >
                <form className="card-body" onSubmit={event => this.handleSubmit(event)}>
                    <div className="form-group col-sm">
                        <label className="text-left">Transaction - {this.props.transaction.name} | Date: {this.props.transaction.date.split("T")[0]} | Amount: ${(this.props.transaction.amount * -1)}</label><br/>
                        <label className="text-left">Budget Category</label>{" "}
                        <select id="categories" name="budget_id" onChange={event => this.handleChange(event)}>
                            <option value={this.props.budget.id} >{this.props.budget.category.name}</option>
                            {this.renderOptions()}
                        </select>{" "}
                        <button type="submit"  className="btn btn-success p">
                            <span className="d-none d-sm-none d-md-inline"> {this.state.button}</span>
                        </button>
                    </div>
                    <div className="form-group col-sm">
                    </div>
                </form>
            </div>
        )
    }
}