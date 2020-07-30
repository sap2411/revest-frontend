import React from 'react';
import { Bar } from "react-chartjs-2";
  
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
    if (excess > 0) return `exceeded several budgets. After calculating any excess spending and factoring in any surpluses, we have identified an investible excess of roughly $${excess} .`
    return `stayed very close to your budgets! After calculating any excess spending and savings surplus, we have identified an investible excess of roughly $${(-1* excess)}.`
  }

  return (
    <div>
      <h3 className="darkgreen">Let’s Put Your Money to Work</h3>
      <h5><br/>We have determined that this month you have {adjustedInvestment()} If you were to cut back and invest that excess in a low risk index fund each month, you could see it grow to a ${totalReturn} return by the time you turn 60.</h5>
      <Bar width={400} height={200}  data={data} options={options} /><br/>
      <h5>Ready to learn more about investing? For more information on this graph - click below! We’ve also got you covered with our handpicked guides and resources! </h5>
      <button className="btn btn-success p" onClick={handleClick}>Investment Resources</button>    
    </div>
  );
}

