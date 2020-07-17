import React from 'react';
import {Link} from 'react-router-dom';
import Plaid from './Plaid.js';
import AuthHOC from '../HOCs/AuthHOC.js';

const Home = (props) => {

    return (
        <div className="jumbotron rounded-lg col-6 py-5 mt-5 bg-white mx-auto text-center" >
            <h1 className="display-4">You're logged in and ready to go</h1>
            <p className="lead">The next step is to connect your bank account so we can work our magic</p>
            <hr className="my-4"/>
            <Plaid />
        </div>
    )
}

export default AuthHOC(Home)