import React from 'react';
import { ProgressBar} from "react-bootstrap"

export default function ProgressBars({ surplus, income, totals, budgets }) {
  
    const calculateAmounts = () => {
        let exp = budgets[1].transactions.filter((tran) => tran.transaction_type == "Food and Drink")
        return exp.reduce((acc, tran) => acc + tran.amount, 0)
    }

    const calculateFixed = () => {
      return (totals[0].amount + (totals[1].amount - calculateAmounts() ) + totals[2].amount + totals[3].amount)
    }

    const calculateFlexible = () => {
      return (totals[4].amount + calculateAmounts() + totals[5].amount + totals[6].amount +  totals[8].amount)

    }

    let fixed = calculateFixed()
    let flexible = calculateFlexible()
    let fixedPercent = Math.round((fixed/(income*0.5))*100)
    let flexiblePercent = Math.round((flexible/(income*0.3))*100)
    let savingsPercent = Math.round((surplus/(income*0.2))*100)

    return (
      <>{totals.length > 1 ?
        <>
        <h3>The 50%/30%/20% Breakdown:</h3><br/>
      <h5>Fixed Expenses - ${fixed} out of ${(income *0.5)}</h5>
        
        <ProgressBar style={{width: '90%'}} now={fixedPercent} variant={fixedPercent < 100 ? "success" : "danger"}  animated label={`${fixedPercent}%`} />
        <br/>
      <h5>Flexible Expenses - ${flexible} out of ${(income * 0.3)}</h5>
      <ProgressBar now={flexiblePercent} style={{width: '54%'}} variant={flexiblePercent < 100 ? "success" : "danger"} animated label={`${flexiblePercent}%`} />
      <br/>
      <h5>Leftover Savings - ${surplus} out of ${(income * 0.2)}</h5>
      <ProgressBar now={savingsPercent} style={{width: '36%'}} variant={savingsPercent < 100 ? "warning" : "success"}  animated label={`${savingsPercent}%`} />

        </>
        :
        null
}
        </>
    );
  }