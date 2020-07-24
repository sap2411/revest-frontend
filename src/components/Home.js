import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Plaid from './Plaid.js';
import AuthHOC from '../HOCs/AuthHOC.js';
import { api } from '../services/api';

class Home extends Component {
    constructor(props){
        super(props)
        console.log(this.props.user)
        this.sate = {
            // transactions: (this.props.user.data.relationships.transactions.data.length > 0)
        }
    }

    onSuccess = (token, metadata) => {
        api.auth.plaidAuth({token: token})
        .then(resp => {
            this.getTransactions({access_token: resp.access_token})
        })
        .catch(console.log);
    };

    getTransactions = (access_token = {}) => {
        api.auth.fetchTransactions(access_token)
        .then(() => this.props.history.push('/statistics'))
        .catch(console.log)
    }


    // getBudgets = () => {
    //     api.auth.fetchBudgets()
    //     .then(res => {
    //         this.setState({
    //             budgets: [...res]
    //         }, this.calculateTotals)
    //     })
    //     .catch(console.log)
    // }

    // getUserTransactions = () => {
    //     api.auth.fetchCreatedTransactions()
    //     .then(resp => {
    //         console.log(resp)
    //         this.setState({
    //             transactions: [...resp]
    //         })
    //     })
    //     .catch(console.log)
    // }    

    render() {
        return (
        <div className="jumbotron rounded-lg col-6 py-5 mt-5 bg-white mx-auto text-center" >
            <h1 className="display-4">Let's grab your latest bank data</h1>
            <p className="lead">Click the button below and connect your bank account so we can work our magic</p>
            <hr className="my-4"/>
            {this.props.user.has_connection ? <button className="btn btn-block btn-success p" onClick={() => {this.getTransactions()}}>Connect Bank</button> : <Plaid transactions={true} onSuccess={this.onSuccess}/>}
        </div>
        );
    }
}

export default AuthHOC(Home)