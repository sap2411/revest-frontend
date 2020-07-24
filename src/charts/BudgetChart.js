import React from 'react';
import { Doughnut } from "react-chartjs-2";

const options = {
  maintainAspectRatio: false,
  responsive: false,

  legend: {
    position: "top",
  },
  title: {
    display: true,
    text: "Budget Categories",
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
  
  export default function BudgetChart({ budgets }) {
  
    const data = {
      labels: budgets.map((budget) => budget.category.name),
  
      datasets: [
        {
          label: "Budget",
          backgroundColor: [
            "#18eda4",
            '#6c0ef0',
            '#f5776c',
            '#c973c9',
            '#ed072a',
            '#e6c78e',
            '#55a7e6'
          ],
          hoverBackgroundColor: [
            "#19ffaf",
            '#6d05ff',
            '#ff695c',
            '#ed8eed',
            '#ff0329',
            '#fcdca2',
            '#63b4f2'
          ],
          data: budgets.map((budget) => budget.amount),
        },
      ],
    };
    return (
      <>
        
        <Doughnut width={400} height={300} data={data} options={options} />
        <br/><br/><br/>
        </>
    );
  }