import React, { Component } from 'react';
import BudgetChart from '../charts/BudgetChart.js'
import SpentChart from '../charts/SpentChart.js'
import RadarChart from '../charts/RadarChart.js'
import InvestmentChart from '../charts/InvestmentChart.js';
import { Card, CardGroup } from "react-bootstrap";
import ProgressBars from '../charts/ProgressBars.js';



class BudgetBreakdown extends Component{
    state = {
        budgets:this.props.budgets,
        totals: [],
        incomeSurplus: null,
        diff: [],
        investment: false,
        yearlyReturn: [],
        ages: [],
        totalReturn: false
    }

    _isMounted = false;

    componentDidMount = () => {
        this._isMounted = true;
        this.calculateTotals()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.budgets !== this.props.budgets) {
            this.setState({
                budgets: this.props.budgets
            }, this.calculateTotals)
        }
    }

    calculateTotals = () => {
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
        let newState = {
                totals: [...arr],
                diff: [...arr2]
        }
        this.checkIncome(newState)
    }

    checkIncome = (obj) => {
        let total = Math.round(this.props.user.income-((obj.totals.reduce ((acc, spent) => acc + spent.amount, 0))))
        let investment = this.calculateInvestment(obj.totals, this.state.budgets[1].amount)
        let excess = Math.round(investment * -1)
        let investmentData = this.calculateReturn((excess))
        this.setState({
            incomeSurplus: total,
            investment: investment,
            totals: [...obj.totals],
            diff: [...obj.diff],
            yearlyReturn: [...investmentData.yearlyReturn],
            ages: [...investmentData.ages],
            totalReturn: investmentData.totalReturn
        },()=> {console.log(this.state)})
    }

    calculateInvestment = (totals, food) => {
        let investment = 0
        investment = (((totals[4].amount + (totals[1].amount - food) + totals[5].amount + totals[6].amount +  totals[8].amount)-(this.props.user.income * 0.3)) *-1)
        if (investment === 0) investment = -200
        return investment
    }

    calculateReturn = (num) => {
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

    handleClick = () => {
        window.scrollTo(0, 0);
        this.props.history.push('/resources')
    }

    componentWillUnmount = () => {
        this._isMounted = false
    }

    totalSpent = () => {
        return Math.round(this.state.totals.reduce((acc, total) => acc + total.amount, 0))
    }


    render(){
    return (
        <div >
                <br/>
                {this.state.investment ? <h3 className="darkgreen">My Spending Snapshot</h3> : <h1 className="display-4">Compiling data...</h1>}
                {this.state.totals.length > 0 ? 
                (<div >
                <CardGroup fluid="lg">
                <Card bg="white"  >
                <Card.Body>
                <SpentChart  total={this.totalSpent()} totals={this.state.totals} />

                <BudgetChart income={this.props.user.income} budgets={this.state.budgets.slice(0,6)}/>

                </Card.Body>
                </Card>
                <Card bg="white"  >
                <Card.Body>
                <RadarChart budgets={this.state.budgets.slice(0,6)} totals={this.state.totals.slice(0,6)} />
                <br/>
                <ProgressBars surplus={this.state.incomeSurplus} income={this.props.user.income} budgets={this.state.budgets} totals={this.state.totals} />
                </Card.Body>
                </Card>
                </CardGroup><br/>
                <div className="jumbotron rounded-lg col-10 py-2 mt-2 bg-white mx-auto " >

                <Card bg="white"  >
                <Card.Body>
                <InvestmentChart handleClick={this.handleClick} totalReturn={this.state.totalReturn} excess={(Math.round(this.state.investment * -1))} yearlyReturn={this.state.yearlyReturn} ages={this.state.ages} />
   
                </Card.Body>
                </Card>
                </div>
                </div>) 
                : null}

     
        </div>
    );
    }

}

export default BudgetBreakdown