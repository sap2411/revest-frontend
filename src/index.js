import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';


// allow loading animation to appear during fetches
const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();
    return (
      promiseInProgress && 
      <div
        style={{
          width: "100%",
          height: "100",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
      </div>
   );  
  }

ReactDOM.render(
  <div>
    <App />
    <LoadingIndicator/>
    </div>,
  document.getElementById('root')
);

serviceWorker.unregister();
