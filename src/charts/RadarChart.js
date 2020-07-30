import React from 'react';
import { Radar } from "react-chartjs-2";

const options = {
    maintainAspectRatio: true,
    aspectRatio: 1.2,
    title: {
      display: true,
      text: "How it Compairs",
      fontSize: 20,
    },
    animation: {
      duration: 3000
    }
  };
  
  export default function RadarChart({ totals, budgets }) {
  
    const data = {
      labels: budgets.map((k) => k.category.name),
        
      datasets: [
        {
          label: "Budgets",
          backgroundColor: 'rgba(25, 300, 0, 0.3)',
          data: budgets.map((budget) => budget.amount),
        },
        {
            label: "Actual Spend",
            backgroundColor: 'rgba(300, 0, 0, 0.3)',
            data: totals.map((total) => total.amount),
          }
      ],
    };
    return (
      <>
      
        <Radar height={null} width={null} data={data} options={options} />
        
      </>
    );
  }