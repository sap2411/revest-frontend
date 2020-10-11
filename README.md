# Revest - Frontend

Revest is an application that analyses a users bank data, generates customized bugets, and tracks there spending in order to encourage saving and investing. 

[This](https://revest-frontend.herokuapp.com/) is a link to the live site.

[This](https://github.com/sap2411/revest-backend) is a link to the back-end repository.

## Motivation

I wanted to create an app that could encourage young professionals to take charge of their finances and concider investing. I had been learning a lot about these topics over the year by seeing other peoples financials used as examples for how to budget properly, and I wanted to give that ability to any user specifically. 

## Screenshots
Home Page

<img src="public/landing.png" width="800">

Create Account

<img src="public/signup.png" width="800">

Connect Bank Account

<img src="public/bankconnect.png" width="800">

Track Your Spending

<img src="public/budgets.png" width="800">

Realize Potential Investment

<img src="public/invest.png" width="800">

Customize Budgets

<img src="public/edit.png" width="800">

Learn More On Investing

<img src="public/resources.png" width="800">


## Technology Used

- JS
- Rails Router
- React
- Bootstrap
- Plaid

## Features

Users Can:
- Create an account
- Connect their bank account and import transactions
- Track their spending and budgeting
- Customize their budgets
- Work towards an investment goal
- Learn more about investing through linked resources
- Edit their income, age, or delete their account

## Installation

Clone the front-end, and run 'npm i && npm audit fix' then 'yarn start'

Clone back-end repo, aquire an api secret key from Plaid and use it on line 10 of revest-backend/app/models/plaid.rb, run the following commands in order: bundle install, rails db:migrate, rails db:seed, rails s -p 3001.

## Contributing

Contributions are welcome, submit a pull request!

## Authors

* **Steven Parsons** - [GitHub](https://github.com/sap24471) | [LinkedIn](https://www.linkedin.com/in/steven-parsons-716654134/)

* **UX/UI - Amy Yang** - [LinkedIn](https://www.linkedin.com/in/amyyang0110/)

## License

This project is licensed under the [GNU GPL](https://www.gnu.org/licenses/gpl-3.0.en.html)