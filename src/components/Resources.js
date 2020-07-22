import React, { Component } from 'react';

const Resources = (props) => {
    const newTab = (url) => { 
        window.open( 
          url, "_blank"); 
    }

    return (
    <div className="jumbotron rounded-lg col-6 py-5 mt-5 bg-white mx-auto text-center" >
        <h1 className="display-4">Lets get you investing!</h1>
        <h2>First off, whats an index fund</h2>
        <p>Simply put, an index fund is a group of investments that track an index, and you can invest in them and own a small percentage.</p>

        <h2>Why Invest in an Index Fund</h2>
        <h7>Fees:</h7><p>They have low fees partially due to their simplicity, such as a mutual fund which has higher fees and the added overhead of the fund management.</p>

        <h7>Reliability:</h7><p>Index funds such as the SMP 500 have historic returns and studies show that they lead to higher returns on average, compared to investing in individual stocks on your own. They are also more diversified, like the SMP 50 which tracks the top 500 stocks. This prevents one stock dropping from heavily affecting your portfolio.</p>

        <h7>Simplicity:</h7><p>Investing in the Vanguard Total Stock Market Index Fund (VTSAX) for example, is a way to make a relatively safe investment, and let it grow without much work, fees, or complication. Also, if you invest through a Roth IRA, that investment will already have income tax taken out, so you won't have to pay that tax when you are over 60.</p>
        <p className="lead"></p><br/>
        <img width="200" height="130" onClick={() => newTab("https://investor.vanguard.com/ira/roth-ira#:~:text=A%20Roth%20IRA%20is%20an,t%20owe%20any%20federal%20taxes.")} alt='Roth IRA' src='https://smartfinancialstrategies.com/wp-content/uploads/2018/01/infographic_.png' />
        <img width="230" height="100" onClick={() => newTab("https://investor.vanguard.com/index-funds/")} alt='SMP 500' src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR_BJDfojWmSj5RMqqRwOuDhAraxnQX-I_pVQ&usqp=CAU' />
        <img width="200" height="130" onClick={() => newTab("http://www.robinhood.com/")} alt='Robinhood Investing' src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRrR0VjIuT1oDHdyHxv-UZMmW8J0PTANTNmQA&usqp=CAU' />

        <br/><br/><iframe width="560" height="315" src="https://www.youtube.com/embed/zR64-Ea_r5U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

    </div>
    );
}
{/* <img width="200" height="130" onClick={() => newTab("")} alt='' src='' /> */}

export default Resources