import React from 'react';
import { Doughnut } from "react-chartjs-2";
  
export default function BudgetChart({ budgets, income }) {

  const options = {
    maintainAspectRatio: true,
    aspectRatio: 1.4,
    centerText: {
      display: true,
      text: `$${income}`,
      minWindow: 310
    },
    legend: {
      position: "left",
    },
    title: {
      display: true,
      text: "Your Custom Budgets",
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
          '#a463ff',
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
      
      <Doughnut height={null} width={null} data={data} options={options} />
      
      </>
  );
}