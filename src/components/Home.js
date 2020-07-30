import React, { Component } from 'react';
import Plaid from './Plaid.js';
import AuthHOC from '../HOCs/AuthHOC.js';
import { api } from '../services/api';
import { trackPromise } from 'react-promise-tracker'

class Home extends Component {
    constructor(props){
        super(props)
        console.log(this.props.user)
        this.sate = {
            // transactions: (this.props.user.data.relationships.transactions.data.length > 0)
        }
    }

    onSuccess = (token, metadata) => {
        trackPromise(
        api.auth.plaidAuth({token: token})
        .then(resp => {
            this.getTransactions({access_token: resp.access_token})
        })
        .catch(console.log));
    };

    getTransactions = (access_token = {}) => {
        trackPromise(
        api.auth.fetchTransactions(access_token)
        .then(() => this.props.history.push('/statistics'))
        .catch(console.log))
    }


    render() {
        return (
            <div>
            { this.props.user.has_connection ? 
                <div className="jumbotron rounded-lg col-6 py-5 mt-5 bg-white mx-auto text-center" >
                    <h1 className="display-4">Let's grab your latest bank data</h1>
                    <p className="lead">Click the button below to update your transaction data for the last 31 days</p>
                    <hr className="my-4"/>
                    <button className="btn  btn-success p" onClick={() => {this.getTransactions()}}>Refresh Data</button> 
                </div>
                    : 
                <div className="jumbotron rounded-lg col-6 py-5 mt-5 bg-white mx-auto text-center" >
                    <h1 className="display-4">Now let’s connect your bank account to start tracking your finances.</h1>
                    <p className="lead">You will be asked to select your bank and login securely.</p>
                    <hr className="my-4"/>
                    <Plaid transactions={true} onSuccess={this.onSuccess}/>
                </div>}
            </div>
        );
    }
}

export default AuthHOC(Home)