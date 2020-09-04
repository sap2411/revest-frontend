import React from 'react';
import {Link} from 'react-router-dom';
import { Card, CardDeck } from "react-bootstrap";

const About = (props) => {


    return (
        <div>
            <div className="jumbotron rounded-lg col-10 py-1 mt-5 bg-white mx-auto text-center">
                <div className="container text-left">
                    <img width={500} src="laptop.png" alt="wealth growth" className="float-right"></img>
                    <h1>Personal finance and investing doesn't have to be intimidating.</h1>
                    <h3>We can help you get started with a personalized budget and resources to fit your needs.</h3>
                    <br/>
                    <h5>Our tools and resources are here to guide the beginner investor through their personal finance journey.</h5>
                    {!!props.user.id ? <><br/><br/><br/></> :
                    <div className="text-left"><br/>
                        <Link exact to="/create-account" title="Create Account">
                            <button className="btn btn-success btn-lg mx-4" type="button">
                                <i className="fas fa-user-plus"></i>
                                <span className="d-none d-sm-none d-md-inline"> Let's Get Started!</span>
                            </button>
                        </Link>
                        <Link exact to="/demo-account" title="Demo Account">
                            <button className="btn btn-success btn-lg mx-4" type="button">
                                <i className="fas fa-user-plus"></i>
                                <span className="d-none d-sm-none d-md-inline"> Use Demo Account</span>
                            </button>
                        </Link>
                    </div>}
                </div>          
                <hr className="my-4"/>
                <br/>
                <CardDeck>
                    <Card bg="success" text="white" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="bank.png" />
                        <Card.Body>
                            <Card.Text>
                            Link your bank account to securely import your transactions.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card bg="success" text="white" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="pie.png" />
                        <Card.Body>
                            <Card.Text>
                            Visualize your spending habits, and identify overspending.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card bg="success" text="white" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="investment.png" />
                        <Card.Body>
                            <Card.Text>
                            Generate a long-term investing plan based off of your excess spending.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </CardDeck>
            </div>         
        </div>
    )
}

export default About