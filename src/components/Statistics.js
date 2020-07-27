import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Plaid from './Plaid.js';
import AuthHOC from '../HOCs/AuthHOC.js';
import { api } from '../services/api';
import BudgetChart from '../charts/BudgetChart.js'
import SpentChart from '../charts/SpentChart.js'
import RadarChart from '../charts/RadarChart.js'
import InvestmentChart from '../charts/InvestmentChart.js';
import { Tabs, Tab, Button, CardDeck, Card, CardGroup } from "react-bootstrap";
import ProgressBars from '../charts/ProgressBars.js';




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
        let total = Math.round(this.props.user.income-((obj.totals.reduce ((acc, spent) => acc + spent.amount, 0))))
        let investment = this.calculateInvestment(obj.totals, obj.budgets[1].amount)
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
        },()=> {console.log(this.state)})
    }

    calculateInvestment = (totals, food) => {
        let investment = 0
        investment = (((totals[4].amount + (totals[1].amount - food) + totals[5].amount + totals[6].amount +  totals[8].amount)-(this.props.user.income * 0.3)) *-1)
        console.log(investment, totals, food)
        // input.forEach(diff => diff.amount < 0 ? (investment = diff.amount + investment): null)
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
        return <div></div>
    }

    handleClick = () => {
        window.scrollTo(0, 0);
        this.props.history.push('/resources')
    }

    render(){
    return (
        <div className="jumbotron rounded-lg col-11 py-2 mt-2 bg-white mx-auto " >
            <Button className='text-left' variant="outline-primary">WellsFargo - 1196  <i className="fas fa-sync-alt"></i><br/>Last synced on 7/22/20</Button>{" "}
            <Button className='text-left' variant="outline-primary">+</Button>
            <br/><br/>
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
            <Tab eventKey="home" title="Spending and Investment">
                <br/>
                {this.state.investment ? <h3 >My Spending Snapshot</h3> : <h1 className="display-4">Compiling data...</h1>}
                {this.state.totals.length > 0 ? 
                (<div >
                <CardDeck>
                <Card bg="white"  style={{ width: '36rem' }}>
                <Card.Body>
                <SpentChart  totals={this.state.totals} /><br/>
                <BudgetChart  budgets={this.state.budgets.slice(0,6)}/>

                </Card.Body>
                </Card>
                <Card bg="white"  style={{ width: '36rem' }}>
                <Card.Body>
                <RadarChart budgets={this.state.budgets.slice(0,6)} totals={this.state.totals.slice(0,6)} />
                <br/>
                <ProgressBars surplus={this.state.incomeSurplus} income={this.props.user.income} budgets={this.state.budgets} totals={this.state.totals} />
                </Card.Body>
                </Card>
                </CardDeck><br/>
                
                <Card bg="white"  >
                <Card.Body>
                <InvestmentChart handleClick={this.handleClick} totalReturn={this.state.totalReturn} excess={(Math.round(this.state.investment * -1))} yearlyReturn={this.state.yearlyReturn} ages={this.state.ages} />
   
                </Card.Body>
                </Card>
                </div>) 
                : null}
            </Tab>
            <Tab eventKey="details" title="Details">
                
            </Tab>
            <Tab eventKey="budgets" title="Modify Budgets">
                
            </Tab>
            <Tab eventKey="clarify" title="Clarify Transactions">
                  
            </Tab>
        </Tabs>
     
        </div>
    );
    }

}

// {this.renderBudgets()}
export default AuthHOC(Statistics)