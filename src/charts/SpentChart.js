import React from 'react';
import { Doughnut } from "react-chartjs-2";

const options = {
  title: {
    display: true,
    text: "Spending",
    fontSize: 20,
  }
};
  
  export default function SpentChart({ totals }) {
    console.log(totals)
    const data = {
      labels: totals.map((k) => k.name),
  
      datasets: [
        {
          label: "Spent",
          backgroundColor: [
            "#18eda4",
            '#6c0ef0',
            '#f5776c',
            '#c973c9',
            '#ed072a',
            '#e6c78e',
            '#55a7e6',
            '#fff821',
            '#74e3bc'
          ],
          hoverBackgroundColor: [
            "#19ffaf",
            '#6d05ff',
            '#ff695c',
            '#ed8eed',
            '#ff0329',
            '#fcdca2',
            '#63b4f2',
            '#fcf747',
            '#94f7c7'
          ],
          data: totals.map((k) => k.amount),
        },
      ],
    };
    return (
      <>
      <br/>
        <Doughnut width={400} height={300} data={data} options={options} />
        <br/>
      </>
    );
  }