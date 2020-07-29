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
        <Accordion defaultActiveKey="0">
            {renderBudgets()}
        </Accordion>
        </div>
    )

}
