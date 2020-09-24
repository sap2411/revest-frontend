import React from "react";
import { Card, CardDeck } from "react-bootstrap";

const Resources = () => {
    const newTab = (url) => { 
        window.open(url, "_blank"); 
    }


  return (
    <div className="jumbotron rounded-lg col-10 py-2 mt-5 bg-white mx-auto text-left">
      <h2 className="display-4">Lets get you investing!</h2>
      <h3>First off, what is an index fund?</h3>
      <p>
        Simply put, an index fund is a group of investments that track an index,
        and you can invest in them and own a small percentage.
      </p>

      <h3>Why invest in an index fund?</h3>
      <h5>Fees:</h5>
      <p>
        They have low fees partially due to their simplicity, such as a mutual
        fund which has higher fees and the added overhead of the fund
        management.
      </p>

      <h5>Reliability:</h5>
      <p>
        Index funds such as the SMP 500 have historic returns and studies show
        that they lead to higher returns on average, compared to investing in
        individual stocks on your own. They are also more diversified, like the
        SMP 500 which tracks the top 500 stocks. This prevents one stock
        dropping from heavily affecting your portfolio.
      </p>

      <h5>Simplicity:</h5>
      <p>
        Investing in the Vanguard Total Stock Market Index Fund (VTSAX) for
        example, is a way to make a relatively safe investment, and let it grow
        without much work, fees, or complication. Also, if you invest through a
        Roth IRA, that investment will already have income tax taken out, so you
        won't have to pay that tax when you are over 60.
      </p>
      <div className="float-left">
        <h4>
          <u>Featured Video:</u>
        </h4>
        <iframe
          title="Investing"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/zR64-Ea_r5U"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <br />
      <div className="ui two column  grid">
        <div className="col">
          <h4>
            <u>Investment Content:</u>
          </h4>
          <Card
            onClick={() =>
              newTab(
                "https://www.youtube.com/watch?v=ma4AFKoa9So&list=PLPdoRGhsS-tvjFqUmWTL1zlm9ZB3n6DrL"
              )
            }
            bg="light"
            text="black"
            style={{ width: "18rem" }}
            className="p"
          >
            <Card.Img
              variant="top"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcThRSISn6NoMhHrJS0W3TCaf0287fcObFSScQ&usqp=CAU"
            />
            <Card.Body>
              <h5>Graham Stephan</h5>
              <Card.Text>
                Graham has an entertaining playlist of videos he has made on
                investing. Great for anyone who wants to learn in a lighthearted
                way.
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
          <Card
            onClick={() => newTab("https://www.stackingbenjamins.com/")}
            bg="light"
            text="black"
            style={{ width: "18rem" }}
            className="p"
          >
            <Card.Img
              style={{ width: "18rem" }}
              variant="top"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbdcEW9Sze3Lo_Hm98w3xNUhTlWssxYZDN-g&usqp=CAU"
            />
            <Card.Body>
              <h5>Stacking Benjamins</h5>
              <Card.Text>
                Perfect for beginners. A parade of financial headlines, personal
                finance experts, and people with stories that inspire us.
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
        </div>
        <div className="col">
          <h4>
            <u>Recommended Resources:</u>
          </h4>
          <Card
            onClick={() =>
              newTab(
                "https://investor.vanguard.com/ira/roth-ira#:~:text=A%20Roth%20IRA%20is%20an,t%20owe%20any%20federal%20taxes."
              )
            }
            bg="light"
            text="black"
            style={{ width: "18rem" }}
            className="p"
          >
            <Card.Img
              variant="top"
              src="https://smartfinancialstrategies.com/wp-content/uploads/2018/01/infographic_.png"
            />
            <Card.Body>
              <h5>Vanguard: Roth IRA</h5>
              <Card.Text>
                Opening a Roth IRA can be a great first step towards investing
                while avoiding a large tax at the end of it.
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
          <Card
            onClick={() => newTab("https://investor.vanguard.com/index-funds/")}
            bg="light"
            text="black"
            style={{ width: "18rem" }}
            className="p"
          >
            <Card.Img
              variant="top"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR_BJDfojWmSj5RMqqRwOuDhAraxnQX-I_pVQ&usqp=CAU"
            />
            <Card.Body>
              <h5>Vanguard: Index Funds</h5>
              <Card.Text>
                Vanguard has a history of strong returns with index funds, and
                is a great trusted company to get guidance. Learn more here.
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
        </div>
        <h4><u>Investment Platforms:</u></h4>
        <CardDeck>
        <Card
          onClick={() =>
            newTab("https://stock-market-practice.netlify.app/login")
          }
          bg="light"
          text="black"
          style={{ width: "18rem" }}
          className="p"
        >
          <Card.Img
            variant="top"
            src="https://github.com/matthewsedlacek/portfolio-practice-frontend/blob/master/public/Logo_.png?raw=true"
          />
          <Card.Body>
            <h5>Portfolio Practice</h5>
            <Card.Text>
              Empowers new investors with a no risk opportunity to practice
              buying and selling stocks.
            </Card.Text>
          </Card.Body>
        </Card>
            <Card onClick={() => newTab("http://www.robinhood.com/")}  bg='light'  text="black" style={{ width: '18rem' }} className="p">
                <Card.Img variant="top" src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTCzMvBPWjMwKzFvpeiNBI6Xqk7avexEZlQVA&usqp=CAU'  />
                <Card.Body>
                <h5>Robinhood</h5>
                    <Card.Text>
                        Robinhood is a great and simple app for new investors.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card onClick={() => newTab("https://www.acorns.com/")}  bg='light'  text="black" style={{ width: '18rem' }} className="p">
                <Card.Img  variant="top" src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSpj67q8wgTxlH95mxx1szElaydk3J0sMQ8-g&usqp=CAU'  />
                <Card.Body>
                <h5>Acorns</h5>
                    <Card.Text>
                        Acorns rounds up every purchase to the next dollar and invests the difference on your behave, so you dont have to think about it.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card onClick={() => newTab("https://www.webull.com/")}  bg='light'  text="black" style={{ width: '18rem' }} className="p">
                <Card.Img  variant="top" src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9M6Sg3vMHWUqO2lEraAXndCbpc47OGaa4Cg&usqp=CAU'  />
                <Card.Body>
                    <h5>Webull</h5>
                    <Card.Text>
                        A simple investing app with low fees and a free stock upon sign-up
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card onClick={() => newTab("https://www.chase.com/personal/investments/you-invest")}  bg='light'  text="black" style={{ width: '18rem' }} className="p">
                <Card.Img  variant="top" src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTlcq09lvHYXTTZOpGC24UpQRUQx2wUvTdH7w&usqp=CAU'  />
                <Card.Body>
                <h5>You Invest</h5>
                    <Card.Text>
                        J.P. Morgan throw their hat in the personal investment ring with this easy to use app, and stellar customer service.
                    </Card.Text>
                </Card.Body>
            </Card>
        </CardDeck>

    </div>
    </div>
  );
};

export default Resources;
