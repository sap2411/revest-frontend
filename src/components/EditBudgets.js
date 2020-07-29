import React from 'react'
import EditBudget from './EditBudget.js'; 
import { Card, Accordion, Button } from 'react-bootstrap';

export default function EditBudgets({budgets, getBudgets}){
    
    const budgetIds = budgets.map(budget => {return {id: budget.id, name: budget.category.name}})
    
    const renderBudgets = () => {
        let i = 1
        return budgets.map(budget => { 
            return(<Card key={budget.id}>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={i}>
                        {budget.category.name}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={i++}>
                    <Card.Body>
                        <EditBudget getBudgets={getBudgets} budgets={budgetIds} budget={budget} />
                    </Card.Body>
                </Accordion.Collapse>
            </Card>)
        })
    }


    return(
        <div>
            <h2>Our Methodology</h2>
            <p>A simple budget for those new to personal finance is the "50/30/20" budget. This means 50% of your income goes to fixed expenses (home, groceries, transportation, and insurance) while the rest of your expenses goes to "fixed expenses", and that should take up 30% of your income. The remaining 20% should ideally go towards savings. So If you were to max every budget category, you would be using 100% of your income, and have nothing left over for savings. Thats why its important to keep those flexible expenses under 30%.</p>
            <p>From here you can adjust budgets related to your categories, and clarify transactions. For example, Venmo payments can not be further categorized at this time. If you pay your rent through Venmo, you can change that payments category to "Home" and it will then be factored into "Fixed Expenses" instead of Venmos default, "Flexible Expenses".</p>
        <Accordion defaultActiveKey="0">
            {renderBudgets()}
        </Accordion>
        </div>
    )

}
