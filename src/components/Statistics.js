import React, { Component } from 'react';
import AuthHOC from '../HOCs/AuthHOC.js';
import { api } from '../services/api';
import { Tabs, Tab, Button } from "react-bootstrap";
import EditBudgets from './EditBudgets.js'
import BudgetBreakdown from './BudgetBreakdown.js'
import { trackPromise } from 'react-promise-tracker'

class Statistics extends Component{
    state = {
        budgets:[]
    }

    _isMounted = false;

    componentDidMount = () => {
        this._isMounted = true;
        this.getBudgets()
    }

    getBudgets = () => {
        this._isMounted = true;
        trackPromise(
        api.auth.fetchBudgets()
        .then(res => {
            if(this._isMounted){
                this.setState({
                    budgets: [...(res.sort(function(a, b){return a.id-b.id}))]
                })
            }
        }))
    }

    getTransactions = (access_token = {}) => {
        this._isMounted = true;
        trackPromise(
        api.auth.fetchTransactions(access_token)
        .then(this.getBudgets))
    }

    componentWillUnmount = () => {
        this._isMounted = false
    }

    render(){
        return (
            <div className="jumbotron rounded-lg col-10 py-2 mt-2 bg-white mx-auto " >
                <Button onClick={() => {this.getTransactions()}} className='text-left' variant="outline-primary">Resync Bank  <i className="fas fa-sync-alt"></i></Button>{" "}
                {/* <Button className='text-left' variant="outline-primary">+</Button> */}
                <br/><br/>
                <Tabs defaultActiveKey="home" >
                    <Tab eventKey="home" title="Budget and Investment Breakdown" >
                        {!!this.state.budgets[0] ? <BudgetBreakdown history={this.props.history} budgets={this.state.budgets} user={this.props.user} /> : null}
                    </Tab>
                    {/* <Tab eventKey="habits" title="Spending Habits">
                        <SpendingHabits bugets={this.state.budgets}/>
                        </Tab> */}
                    <Tab eventKey="budgets" title="Modify Budgets and Transactions">
                        <EditBudgets getBudgets={this.getBudgets} budgets={this.state.budgets} />
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default AuthHOC(Statistics)