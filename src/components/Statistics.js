import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Plaid from './Plaid.js';
import AuthHOC from '../HOCs/AuthHOC.js';
import { api } from '../services/api';
import BudgetChart from '../charts/BudgetChart.js'
import SpentChart from '../charts/SpentChart.js'
import RadarChart from '../charts/RadarChart.js'
import InvestmentChart from '../charts/InvestmentChart.js';
import { Tabs, Tab } from "react-bootstrap";




class Statistics extends Component{
    state = {
        budgets:[],
        transactions: [],
        totals: [],
        incomeSurplus: null,
        diff: [],
        investment: false,
        yearlyReturn: [],
        ages: [],
        totalReturn: false
    }

    componentDidMount = () => {
        this.getBudgets()
        // this.getUserTransactions()
        // this.calculateTotals()
    }

    renderBudgets = () => {
        let i = -1
        return this.state.budgets.map(budget => {
            i++
            return <p>{budget.category.name}: budget:{budget.amount} spent:{this.state.totals[i].amount}</p>
        })
    }

    calculateTotals = (stateData) => {
        let arr2 = []
        let arr = stateData.budgets.map(budget => {
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
        let newState = {
                totals: [...arr],
                diff: [...arr2],
                budgets: [...stateData.budgets],
                transactions: [...stateData.transactions]
        }
        this.checkIncome(newState)
    }

    getBudgets = () => {
        api.auth.fetchBudgets()
        .then(res => {
            // this.setState({
            //     budgets: [...res]
            // }, this.calculateTotals)
            this.getUserTransactions(res)
        })
        .catch(console.log)
    }

    getUserTransactions = (budgets) => {
        api.auth.fetchCreatedTransactions()
        .then(resp => {
            let newState = {
                transactions: [...resp],
                budgets: [...budgets]
            }
            this.calculateTotals(newState)
        })
        .catch(console.log)
    }

    checkIncome = (obj) => {
        console.log("contain totals?", obj)
        let total = Math.round(100*(obj.totals.reduce ((acc, spent) => acc + spent.amount, 0)))/100
        let investment = this.calculateInvestment(obj.diff)
        console.log(total, this.props.user.income)
        let excess = Math.round(investment * -1)
        let investmentData = this.calculateReturn((excess))
        this.setState({
            incomeSurplus: total,
            investment: investment,
            totals: [...obj.totals],
            diff: [...obj.diff],
            budgets: [...obj.budgets],
            transactions: [...obj.transactions],
            yearlyReturn: [...investmentData.yearlyReturn],
            ages: [...investmentData.ages],
            totalReturn: investmentData.totalReturn
        })
    }

    calculateInvestment = (input) => {
        let investment = 0
        input.forEach(diff => diff.amount < 0 ? (investment = diff.amount + investment): null)
        if (investment == 0) investment = -200
        return investment
    }

    calculateReturn = (num) => {
        // let ageTillSixty = 60 - this.props.user.age
        let total = num
        let arr = [num]
        let ageArr = []
        for(let i = this.props.user.age; i < 60; i++){
            total = (Math.round(total + (total*0.07)) + num)
            ageArr.push(i)
            arr.push(total)
        }
        let obj = {
            yearlyReturn: [...arr],
            ages: [...ageArr, 60],
            totalReturn: total
        }
        return obj
    }

    displayInsights = () => {
        let excess = Math.round(this.state.investment * -1)
        return <div><p><br/>We have determined that this month you have spent approximately ${excess} dollars in excess across several budgets. If you were to cut back and invest that excess in a low risk index fund each month, you could see it grow to a ${this.state.totalReturn} dollar return on that one investment by the time you turn 60</p><InvestmentChart yearlyReturn={this.state.yearlyReturn} ages={this.state.ages} /></div>
    }

    handleClick = () => {
        console.log('clicked')
        this.props.history.push('/resources')
    }

    render(){
    return (
        <div className="jumbotron rounded-lg col-11 py-5 mt-2 bg-white mx-auto text-center" >
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
            <Tab eventKey="home" title="Home">
                {this.state.investment ? <h1 className="display-4">Budget Breakdown</h1> : <h1 className="display-4">Compiling data...</h1>}
                {this.state.totals.length > 0 ? 
                (<div >{this.renderBudgets()}
                <BudgetChart  budgets={this.state.budgets.slice(0,6)}/>
                <SpentChart  totals={this.state.totals} />
                <RadarChart budgets={this.state.budgets.slice(0,6)} totals={this.state.totals.slice(0,6)} /></div>) 
                : null}
            </Tab>
            <Tab eventKey="food" title="Food">
                <p>hi</p>
            </Tab>
            <Tab eventKey="investment" title="Investment">
                {this.state.investment ? this.displayInsights() : null}
                <button className="btn btn-block btn-success p" onClick={this.handleClick}>Investment Resources</button>    
            </Tab>
        </Tabs>
     
        </div>
    );
    }

}


export default AuthHOC(Statistics)