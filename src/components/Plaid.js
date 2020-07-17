import { PlaidLink } from "react-plaid-link";
import React from "react";

const Plaid = props => {
    const onSuccess = (token, metadata) => {
      console.log(token, metadata)
    };
  
    return (
      <PlaidLink
        clientName="Revest"
        env="sandbox"
        product={['auth', 'transactions']}
        publicKey='PUBLIC_KEY'
        onSuccess={onSuccess}
      >
        Connect a bank account
      </PlaidLink>
    );
  };
  export default Plaid;