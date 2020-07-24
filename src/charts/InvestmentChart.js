import React from 'react';
import { Bar } from "react-chartjs-2";


  
  export default function InvestmentChart({ yearlyReturn, ages }) {

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
        
        <Bar width={400} height={200}  data={data} options={options} />
        
      </div>
    );
  }