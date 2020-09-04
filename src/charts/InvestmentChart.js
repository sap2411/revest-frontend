import React, {Fragment} from 'react';
import { Bar } from "react-chartjs-2";
import { OverlayTrigger, Popover} from "react-bootstrap"
  
export default function InvestmentChart({ yearlyReturn, ages, excess, totalReturn, handleClick }) {

  const options = {
    maintainAspectRatio: true,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            // width: 150,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Investment Growth",
      fontSize: 20,
    },
  
    hover: {
      mode: "nearest",
      intersect: false,
    },
    tooltips: {
      custom: false,
      mode: "nearest",
      intersect: false,
    },
    animation: {
      duration: 3000
    }
  };

  const data = {
    labels: ages.map((age) => `${age}`),

    datasets: [
      {
        label: "Investment Worth Each Year",
        backgroundColor: "#18eda4",
        hoverBackgroundColor: "#19ffaf",
        data: yearlyReturn.map((amount) => amount),
      },
    ],
  };

  // error handling if the user isnt over spending
  const adjustedInvestment = () => {
    if (excess > 0) return (<>exceeded several budgets. After calculating any excess spending and factoring in any surpluses, we have identified an investible excess of roughly {" "}
      <OverlayTrigger
          key={'top'}
          placement={'top'}
          overlay={
            <Popover id={`popover-positioned-top`}>
              <Popover.Title as="h3">{`How'd you get this number?`}</Popover.Title>
              <Popover.Content>
              We see that you have over spent in several categories identified in the doughnut graph and 50/30/20 chart. We have taken that into account as well as your monthly income, and current savings, and used that to calculate an investment goal that could be achievable.
              </Popover.Content>
            </Popover>
          }
    >
       <u className="darkgreen">${excess}</u>
    </OverlayTrigger>.</>)
    
    return (<>stayed very close to your budgets! After calculating any excess spending and savings surplus, we have identified an investible excess of roughly {" "}
      <OverlayTrigger
          key={'top'}
          placement={'top'}
          overlay={
            <Popover id={`popover-positioned-top`}>
              <Popover.Title as="h3">{`How'd you get this number?`}</Popover.Title>
              <Popover.Content>
              We see that your budgeting has been pretty good this month, so our next job is to make sure youre not just letting too much of your savings sit idly by. We have factored in excess savings and where you may come too close to the red in some budgets, and generated an investment goal that still leaves you with a healthy amount of savings on hand. 
              </Popover.Content>
            </Popover>
          }
    >
       <u className="darkgreen">${(-1* excess)}</u>
    </OverlayTrigger>.</>)
  }

  return (
    <div>
      <h3 className="darkgreen">Let’s Put Your Money to Work</h3>
      <h5><br/>We have determined that this month you have {adjustedInvestment()} If you were to cut back and invest that excess in a low risk index fund every month, it could grow to a {" "}
      <OverlayTrigger
          key={'top'}
          placement={'top'}
          overlay={
            <Popover id={`popover-positioned-top`}>
              <Popover.Title as="h3">{`How'd you get this number?`}</Popover.Title>
              <Popover.Content>
              Historically Vanguard reports around a 7% return on investment annually with their index funds such as the SMP 500. More information is avalible if you click the button below.
              </Popover.Content>
            </Popover>
          }
    >
       <u className="darkgreen">${totalReturn}</u>
    </OverlayTrigger>
        {" "}return by the time you turn 60. </h5>
      <Bar width={400} height={200}  data={data} options={options} /><br/>
      <h5>Ready to learn more about investing? For more information on this graph - click below! We’ve also got you covered with our handpicked guides and resources! </h5>
      <button className="btn btn-success p" onClick={handleClick}>Investment Resources</button>    
    </div>
  );
}

