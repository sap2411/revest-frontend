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



    return (
      <div>
        <h3>Let’s Put Your Money to Work</h3>
        <h5><br/>We have determined that this month you have spent roughly ${excess} dollars in excess across several budgets related to flexible spending. If you were to cut back and invest that excess in a low risk index fund each month, you could see it grow to a ${totalReturn} dollar return by the time you turn 60</h5>
        <Bar width={400} height={200}  data={data} options={options} /><br/>
        <h5>Ready to create an investment plan? For more information on this graph - click below! We’ve also got your covered with our handpicked guides and resources! </h5>
        <button className="btn btn-success p" onClick={handleClick}>Investment Resources</button>
        
        
      </div>
    );
  }

