import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Plaid from './Plaid.js';
import AuthHOC from '../HOCs/AuthHOC.js';

class Home extends Component {
    constructor(props){
        super(props)
    }

    // onSuccess = (token, metadata) => {
    //     // const authToken = localStorage.getItem("token");
    //     // this.toggleLoader();
    //     // axios
    //     //   .post(
    //         `${url}/authlogin`,
    
    //         { token },
    //         {
    //           headers: {
    //             Authorization: `Bearer ${authToken}`,
    //           },
    //         }
    //       )
    //       .then((response) => {
    //         console.log("RESPONSE", response);
    //         return response.data;
    //       })
    //       .then(({ access_token }) => {
    //         localStorage.setItem("access_token", access_token);
    //         return this.fetchTransactions(access_token, authToken);
    //       })
    //       .catch((err) => console.log(err));
    //   };

    render() {
        return (
        <div className="jumbotron rounded-lg col-6 py-5 mt-5 bg-white mx-auto text-center" >
            <h1 className="display-4">You're logged in and ready to go</h1>
            <p className="lead">The next step is to connect your bank account so we can work our magic</p>
            <hr className="my-4"/>
            <Plaid />
        </div>
        );
    }
}

export default AuthHOC(Home)