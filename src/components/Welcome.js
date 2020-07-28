import React from 'react';
import {Link} from 'react-router-dom';
import { Card, CardDeck } from "react-bootstrap";

const About = (props) => {


    return (
        <div>
        <div className="jumbotron rounded-lg col-10 py-1 mt-5 bg-white mx-auto text-center">
            <h1 className="display-4"><i className="fas fa-money-bill-wave"></i> Revest </h1>
            <h5>Personal finance and investng doesn't have to be intimidating. That's why we are here to introduce these concepts to you in a personalized way</h5>
            <hr className="my-4"/>

            
       
        <Card bg="info"  text="white">
            <Card.Img variant="top" src="coin.jpg"  />
            <Card.Body>
            <Card.Text>
            Track your spending and generate a personalized introduction to investing in 3 steps:
            </Card.Text>
            </Card.Body>
        </Card><br/>
        <CardDeck>
        <Card bg="info" text="white" style={{ width: '18rem' }}>
        <Card.Img variant="top" src="bank.png" />
            <Card.Body>
                <Card.Text>
                Link your bank account to securely import your transactions.
                </Card.Text>
            </Card.Body>
        </Card>
        <Card bg="info" text="white" style={{ width: '18rem' }}>
        <Card.Img variant="top" src="pie.png" />
            <Card.Body>
                <Card.Text>
                Visualize your spending habits, and identify overspending.
                </Card.Text>
            </Card.Body>
        </Card>
        <Card bg="info" text="white" style={{ width: '18rem' }}>
        <Card.Img variant="top" src="investment.png" />
            <Card.Body>
                <Card.Text>
                Generate a long-term investing plan based off of your excess spending.
                </Card.Text>
            </Card.Body>
        </Card>
        </CardDeck>
                </div>
                {!!props.user.id ? null :
                <div className="text-center"><Link exact to="/create-account" title="Create Account">
                <button className="btn btn-primary btn-lg mx-4" type="button">
                    <i className="fas fa-user-plus"></i>
                    <span className="d-none d-sm-none d-md-inline"> Let's Get Started!</span>
                </button>
            </Link> <br/><br/></div>}
        </div>
    )
}

export default About