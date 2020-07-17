import React from 'react';
import {Link} from 'react-router-dom';

const About = (props) => {

    return (
        <div className="jumbotron rounded-lg col-6 py-5 mt-5 bg-white mx-auto text-center">
            <h1 className="display-4">Welcome to Revest </h1>
            <p className="lead">The best place to check your spending and realize your financial potential!</p>
            <hr className="my-4"/>
                <div><Link exact to="/create-account" title="Create Account">
                <button className="btn btn-primary btn-lg mx-4" type="button">
                    <i className="fas fa-user-plus"></i>
                    <span className="d-none d-sm-none d-md-inline"> Create Account</span>
                </button>
            </Link>
            <Link exact to="/login" title="Create Account">
                <button className="btn btn-primary btn-lg mx-4" type="button">
                    <i className="fas fa-user-plus"></i>
                    <span className="d-none d-sm-none d-md-inline"> Log In</span>
                </button>
            </Link></div>
        </div>
    )
}

export default About