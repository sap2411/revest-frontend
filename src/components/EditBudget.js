import React, { Component } from 'react'
import { api } from '../services/api';
import EditTransaction from './EditTransaction';

export default class EditBudget extends Component{
    state = {
        amount: this.props.budget.amount,
        button: 'Update Budget',
        show: false
    }

    handleSubmit = event => {
        event.preventDefault()
        api.auth.updateBudget(this.state, this.props.budget.id)
        .then(this.handleFetchResponse)
    }
    
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
            button: 'Update Budget'
        })
    }

    handleFetchResponse = response => {
        console.log(response)
        if (response.error) {
         } else{
            // Redirect via state update
            this.setState({button: 'Updated'})
        }  
    }
    renderTransactions = () => {
        return this.props.budget.transactions.map(transaction => {
            return(
                <EditTransaction getBudgets={this.props.getBudgets} budgets={this.props.budgets} budget={this.props.budget} transaction={transaction}/>
            )
        })
    }

    showTransactions = () => {
        let flip = !this.state.show
        this.setState({
            show: flip
        })
    }

    render(){
        return(
            <div >
                <form className="card-body" onSubmit={event => this.handleSubmit(event)}>
                    <div className="form-group col-sm">
                        <label className="text-left">Budget Amount: </label><br/>
                        $<input type="number" className="form" name="amount" value={this.state.amount} onChange={event => this.handleChange(event)}/>{" "}
                        <button type="submit"  className="btn btn-success p">
                            <i className="fas fa-chart-pie"></i> 
                            <span className="d-none d-sm-none d-md-inline"> {this.state.button}</span>
                        </button> 
                    </div>
                </form>
                <div className="form-group col-sm">
                        <button className="btn btn-success p" onClick={this.showTransactions}>{this.state.show ? 'Hide' : 'Show'} Transactions</button>
                        {this.state.show ? this.renderTransactions() : null}
                </div>
            </div>
        )
    }
}