import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Plaid from './Plaid.js';
import AuthHOC from '../HOCs/AuthHOC.js';
import { api } from '../services/api';

class Statistics extends Component{
    state = {
        budgets:[]
    }

    componentDidMount = () => {
        api.auth.fetchBudgets()
        .then(res => {
            this.setState({
                budgets: [...res]
            })
        })
        .catch(console.log)
    }

    renderBudgets = () => {
        console.log(this.state.budgets)
        return this.state.budgets.map(budget => {
            let spent = 0
            if (budget.transactions.length > 0) spent = Math.round(100*(budget.transactions.reduce ((total, transaction) => total + transaction.amount, 0)))/100
            return <p>{budget.category.name}: budget:{budget.amount} spent:{spent}</p>
        })
    }

    render(){
    return (
        <div className="jumbotron rounded-lg col-6 py-5 mt-5 bg-white mx-auto text-center" >
            <h1 className="display-4">Compiling data...</h1>
            {!!this.state.budgets ? this.renderBudgets() : null}
        </div>
    );
    }

}


export default AuthHOC(Statistics)