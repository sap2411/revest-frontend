import React, {Fragment} from 'react'
import {NavLink} from 'react-router-dom';


const Navbar = ({ user, handleLogOut }) => {
    return (
        <header className="navbar navbar-expand navbar-light bg-light shadow flex-column flex-md-row bd-navbar">
            <nav className="collapse navbar-collapse" >
                <NavLink exact to="/" className="navbar-brand" title="Revest">
                    <img hieght={50} width={50} src='revest.png' alt="woops" />
                {/* <i className="fas fa-money-bill-wave"></i>
                    <span className="d-none d-sm-none d-md-inline p"> Revest </span> */}
                </NavLink>
            


                <ul className="navbar-nav ml-md-auto">
                <li className="nav-item">
                    <NavLink exact to="/resources" className="nav-link" title="Create Account">
                        <i className="fas fa-book"></i>
                        <span className="d-none d-sm-none d-md-inline p"> Investment Resources</span>
                    </NavLink>
                </li>
                    {/* Conditionally render based on user prop*/}
                    { !user.id &&
                    <Fragment>
                            <li className="nav-item">
                                <NavLink exact to="/create-account" className="nav-link" title="Create Account">
                                    <i className="fas fa-user-plus"></i>
                                    <span className="d-none d-sm-none d-md-inline p"> Create Account</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink exact to="/login" className="nav-link" title="Login">
                                    <i className="fas fa-sign-in-alt"></i>
                                    <span className="d-none d-sm-none d-md-inline p"> Login</span>
                                </NavLink>
                            </li>
                    </Fragment>
                    }

                    {/* Conditionally render based on user prop*/}
                    { !!user.id &&
                        <Fragment>
                        <li className="nav-item">
                            <NavLink exact to="/statistics" className="nav-link" title="Create Account">
                                <i className="fas fa-chart-pie"></i>
                                <span className="d-none d-sm-none d-md-inline p"> Budget Breakdown</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/home" className="nav-link" title="Create Account">
                                <i className="fas fa-landmark"></i>
                                <span className="d-none d-sm-none d-md-inline p"> Update Bank Data</span>
                            </NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink exact to="/account" className="nav-link dropdown-toggle" title="User Name" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-user-circle"></i>
                                <span className="d-none d-sm-none d-md-inline p"> {user.first_name}</span>
                            </NavLink>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <NavLink exact to="/edit-account" className="dropdown-item" ><i className="fas fa-user-edit"></i> Edit / Delete Account</NavLink>
                                <div className="dropdown-divider"></div>
                                <NavLink exact to="/login" className="dropdown-item p" onClick={handleLogOut}><i className="fas fa-sign-out-alt"></i> Logout</NavLink>
                            </div>
                        </li>
                        </Fragment>
                    }

                </ul>
            </nav>
        </header>
    )
}

export default Navbar