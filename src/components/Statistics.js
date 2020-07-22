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
        totals: [],
        incomeSurplus: null,
        diff: [],
        investment: false
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
        let arr2 = []
        let arr = this.state.budgets.map(budget => {
            let obj = {}
            let obj2 = {}
            let spent = 0
            if (budget.transactions.length > 0) spent = Math.round(100*(budget.transactions.reduce ((total, transaction) => total + transaction.amount, 0)))/100
            obj.name = budget.category.name
            obj.amount = spent
            obj2.name = budget.category.name
            obj2.amount = (budget.amount - spent)
            arr2.push(obj2)
            return obj
        })
        this.setState((prevState) => ({
                totals: [...prevState.totals, ...arr],
                diff: [...arr2]
        }), this.checkIncome)
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

    checkIncome = () => {
        let total = Math.round(100*(this.state.totals.reduce ((acc, spent) => acc + spent.amount, 0)))/100
        let investment = this.calculateInvestment()
        console.log(total, this.props.user.income)
        this.setState({
            incomeSurplus: total,
            investment: investment
        })
    }

    calculateInvestment = () => {
        let investment = 0
        this.state.diff.forEach(diff => diff.amount < 0 ? (investment = diff.amount + investment): null)
        console.log(investment)
        return investment
    }

    calculateReturn = (num) => {
        let ageTillSixty = 60 - this.props.user.age
        let total = num
        for(let i = 0; i < ageTillSixty; i++){
        total = total + (total*0.07)
        }
        return Math.round(total)
    }

    displayInsights = () => {
        let excess = Math.round(this.state.investment * -1)
    return <p>We have determined that you have spent up to {excess} in excess across several budgets. If you were to cut back 10%, or ${excess / 10} of this excess and invest it in a low risk index fund, you could stand to have a ${this.calculateReturn(excess)} return on that one investment when you turn 60</p>
    }

    render(){
    return (
        <div className="jumbotron rounded-lg col-6 py-5 mt-5 bg-white mx-auto text-center" >
            <h1 className="display-4">Compiling data...</h1>
            {this.state.totals.length > 0 ? this.renderBudgets() : null}
            {this.state.totals.length > 0 ? <BudgetChart  budgets={this.state.budgets.slice(0,6)} /> : null}
            {this.state.totals.length > 0 ? <SpentChart  totals={this.state.totals} /> : null}
            {this.state.totals.length > 0 ? <RadarChart budgets={this.state.budgets.slice(0,7)} totals={this.state.totals.slice(0,7)} /> : null}
            {this.state.investment ? this.displayInsights() : null}
        </div>
    );
    }

}


export default AuthHOC(Statistics)