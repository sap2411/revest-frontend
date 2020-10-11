import React from 'react';
import { ProgressBar, OverlayTrigger, Popover} from "react-bootstrap"

export default function ProgressBars({ surplus, income, totals, budgets }) {
  
    const calculateAmounts = () => {
        let exp = budgets[1].transactions.filter((tran) => tran.transaction_type === "Food and Drink")
        return exp.reduce((acc, tran) => acc + tran.amount, 0)
    }

    const calculateFixed = () => {
      return (totals[0].amount + (totals[1].amount - calculateAmounts() ) + totals[2].amount + totals[3].amount)
    }

    const calculateFlexible = () => {
      return (totals[4].amount + calculateAmounts() + totals[5].amount + totals[6].amount +  totals[8].amount)
    }

    const leftover = (surplus < 0 ? 0 : surplus)
    let fixed = Math.round(calculateFixed())
    let flexible = Math.round(calculateFlexible())
    let fixedPercent = Math.round((fixed/(income*0.5))*100)
    let flexiblePercent = Math.round((flexible/(income*0.3))*100)
    let savingsPercent = Math.round((leftover/(income*0.2))*100)

    return (
      <>{totals.length > 1 &&
        <>
          <OverlayTrigger
          key={'top'}
          placement={'top'}
          overlay={
            <Popover id={`popover-positioned-top`}>
              <Popover.Title as="h3">{`50/30/20`}</Popover.Title>
              <Popover.Content>
              The goal is for 50% of your income to go to fixed expenses (ex. home, groceries, transportation, and insurance) while 30% of your income goes towards the rest of your expenses, i.e. flexible expenses. The remaining 20% should go towards savings.
              </Popover.Content>
            </Popover>
          }
    >
      <h4>The 50/30/20 Breakdown <i className="fas fa-info-circle"></i></h4>
    </OverlayTrigger><br/>
          <h5>Fixed Expenses - ${fixed} out of ${(income *0.5)}</h5>
          <ProgressBar style={{width: '90%'}} now={fixedPercent} variant={fixedPercent < 100 ? "success" : "danger"}  animated label={`${fixedPercent}%`} />
          <br/>
          <h5>Flexible Expenses - ${flexible} out of ${(income * 0.3)}</h5>
          <ProgressBar now={flexiblePercent} style={{width: '54%'}} variant={flexiblePercent < 100 ? "success" : "danger"} animated label={`${flexiblePercent}%`} />
          <br/>
          <h5>Leftover Savings - ${leftover} out of ${(income * 0.2)}</h5>
          <ProgressBar now={savingsPercent} style={{width: '36%'}} variant={savingsPercent < 100 ? "warning" : "success"}  animated label={`${savingsPercent}%`} />
        </>}
        </>
    );
  }