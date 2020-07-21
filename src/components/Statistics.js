import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Plaid from './Plaid.js';
import AuthHOC from '../HOCs/AuthHOC.js';
import { api } from '../services/api';
import BudgetChart from '../charts/BudgetChart.js'
import SpentChart from '../charts/SpentChart.js'
import RadarChart from '../charts/RadarChart.js'



class Statistics extends Component{
    state = {
        budgets:[],
        transactions: [],
        totals: []
    }

    componentDidMount = () => {
        this.getBudgets()
        this.getUserTransactions()
        // this.calculateTotals()
    }

    renderBudgets = () => {
        let i = -1
        return this.state.budgets.map(budget => {
            i++
            return <p>{budget.category.name}: budget:{budget.amount} spent:{this.state.totals[i].amount}</p>
        })
    }

    calculateTotals = () => {

        console.log(this.state.budgets)
        let arr = this.state.budgets.map(budget => {
            let obj = {}
            let spent = 0
            if (budget.transactions.length > 0) spent = Math.round(100*(budget.transactions.reduce ((total, transaction) => total + transaction.amount, 0)))/100
            obj.name = budget.category.name
            obj.amount = spent
            return obj
        })
        this.setState((prevState) => ({
                totals: [...prevState.totals, ...arr]
        }), () => {console.log(this.state.totals)})
    }

    getBudgets = () => {
        api.auth.fetchBudgets()
        .then(res => {
            this.setState({
                budgets: [...res]
            }, this.calculateTotals)
        })
        .catch(console.log)
    }

    getUserTransactions = () => {
        api.auth.fetchCreatedTransactions()
        .then(resp => {
            console.log(resp)
            this.setState({
                transactions: [...resp]
            })
        })
        .catch(console.log)
    }

    render(){
    return (
        <div className="jumbotron rounded-lg col-6 py-5 mt-5 bg-white mx-auto text-center" >
            <h1 className="display-4">Compiling data...</h1>
            {this.state.totals.length > 0 ? this.renderBudgets() : null}
            {this.state.totals.length > 0 ? <BudgetChart  budgets={this.state.budgets.slice(0,6)} /> : null}
            {this.state.totals.length > 0 ? <SpentChart  totals={this.state.totals} /> : null}
            {this.state.totals.length > 0 ? <RadarChart budgets={this.state.budgets.slice(0,7)} totals={this.state.totals.slice(0,7)} /> : null}
        </div>
    );
    }

}


export default AuthHOC(Statistics)