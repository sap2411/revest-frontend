import { PlaidLink } from "react-plaid-link";
import React from "react";
const aws = require('aws-sdk');

let s3 = new aws.S3({
  publicKey: process.env.PUBLIC_KEY
});

const Plaid = props => {
  return (
    <PlaidLink
      clientName="Revest"
      env="development"
      product={['auth', 'transactions']}
      publicKey={s3.publicKey}
      onSuccess={props.onSuccess}
    >
      <i className="fa fa-credit-card" aria-hidden="true"></i>
      <span className="d-none d-sm-none d-md-inline"> Link Your Account</span> 
    </PlaidLink>
  );
};

export default Plaid;