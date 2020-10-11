import React from 'react';
import { Chart, Doughnut } from "react-chartjs-2";

  export default function SpentChart({ totals, total }) {

    const options = {
      maintainAspectRatio: true,
      aspectRatio: 1.4,
      centerText: {
        display: true,
        text: `$${total}`,
        minWindow: 310
      },
      legend: {
        position: "left",
      },
      title: {
        display: true,
        text: "Your Spending",
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

    const drawInnerText = (chart) => {
      if (chart.chart.width > chart.config.options.centerText.minWindow){
      var width = chart.chart.width,
          height = chart.chart.height,
          ctx = chart.chart.ctx;
  
      ctx.restore();
      var fontSize = (width / 250).toFixed(2);
      ctx.font = fontSize + "em sans-serif";
      ctx.textBaseline = "middle";
  
      var text = chart.config.options.centerText.text,
          textX = Math.round(((width - ctx.measureText(text).width) / 2)+110),
          textY = ((height / 2)+ 20);
  
      ctx.fillText(text, textX, textY);
      ctx.save();}
    }

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
            '#3d3d3b'
          ],
          hoverBackgroundColor: [
            "#19ffaf",
            '#a463ff',
            '#ff695c',
            '#ed8eed',
            '#ff0329',
            '#fcdca2',
            '#63b4f2',
            '#fcf747',
            '#0d0d0d'
          ],
          data: totals.map((k) => {
            return k.amount >= 0 ? k.amount : 0
          }),
        },
      ]
    };

    Chart.Chart.pluginService.register({
      beforeDraw: function (chart) {                    
          if (chart.config.options.centerText !== null &&
              typeof chart.config.options.centerText !== 'undefined' &&
              chart.config.options.centerText) {
              drawInnerText(chart);
          }
      },
    });

    return (
      <>    
        <Doughnut height={null} width={null} data={data} options={options} />     
      </>
    );
  }