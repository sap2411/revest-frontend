import React from 'react'

export default function EditBudgets({budgets}){
    renderBudgets = () => {
        return budgets.map(budget => {
            <div className="form-group col-sm">
                <label className="text-left">{budget.name}</label>
                <input type="number" className="form-control" placeholder="" name="age" value={this.state.age} onChange={event => this.handleChange(event)}/>
            </div>
        })
    }

    return(
        <div className="card col-4 my-5 mx-auto px-0 rounded-lg text-left">
        <form>

        </form>
        </div>
    )

}