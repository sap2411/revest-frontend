import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Plaid from './Plaid.js';

const Resources = ({ user, handleLogOut }) => {


        return (
        <div className="jumbotron rounded-lg col-6 py-5 mt-5 bg-white mx-auto text-center" >
            <h1 className="display-4">Lets get you investing!</h1>
            <p className="lead">The next step is to connect your bank account so we can work our magic</p>
            <hr className="my-4"/>
            <Plaid onSuccess={this.onSuccess}/>
        </div>
        );
}

export default Resources