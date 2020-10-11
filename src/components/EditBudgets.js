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
        <div><br/>
            <h2>Calibrate Your Plan</h2>
            <p>From here you can adjust budgets related to your categories, and clarify transactions. For example, Venmo payments can not be further categorized at this time. If you pay your rent through Venmo, you can change that payments category to "Home" and it will then be factored into "Fixed Expenses" instead of Venmos default, "Flexible Expenses".</p>
            <Accordion defaultActiveKey="0">
                {renderBudgets()}
            </Accordion>
        </div>
    )

}
