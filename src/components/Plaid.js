import { PlaidLink } from "react-plaid-link";
import React from "react";

const Plaid = props => {
  return (
    <PlaidLink
      clientName="Revest"
      env="sandbox"
      product={['auth', 'transactions']}
      publicKey={'6cf382bf1795dfca8f747b347c1947'}
      onSuccess={props.onSuccess}
    >
      <i className="fa fa-credit-card" aria-hidden="true"></i>
      <span className="d-none d-sm-none d-md-inline"> Link Your Account</span> 
    </PlaidLink>
  );
};

export default Plaid;