import { PlaidLink } from "react-plaid-link";
import React from "react";
// import AuthHOC from '../HOCs/AuthHOC.js';

const Plaid = props => {
    const onSuccess = (token, metadata) => {
      console.log(token, metadata)
    };
    
    return (
      <PlaidLink
        clientName="Revest"
        env="sandbox"
        product={['auth', 'transactions']}
        publicKey={process.env.REACT_APP_PUBLIC_API_KEY}
        onSuccess={onSuccess}
      >
        <i className="fa fa-credit-card" aria-hidden="true"></i>
        <span className="d-none d-sm-none d-md-inline"> Click Here To Connect</span> 
      </PlaidLink>
    );
  };
  export default Plaid;