import React from 'react';
import { Bar } from "react-chartjs-2";


  
  export default function InvestmentChart({ yearlyReturn, ages }) {

    const options = {
        title: {
          display: true,
          text: "Investment Growth",
          fontSize: 20,
        }
      };

      // const array = (age) => {
      //   let arr = [age]
        
      // }
  
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
      <>
        <br/>
        <Bar width={400} height={300} data={data} options={options} />
        <br/>
      </>
    );
  }