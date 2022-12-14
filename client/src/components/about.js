import React from 'react';
import Accordion from 'react-bootstrap/Accordion'
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

function About() {
  return (
    <div>
      <Accordion>
        <Accordion.Item eventKey='0'>
          <h2>About Retirement</h2>
          <Accordion.Header>Basics</Accordion.Header>
          <Accordion.Body>Your retirement planning will be specific to your circumstances. If your job provides a pension, you may not need to save as much on your own.  Some employers offer retirement accounts like a 401K, some employers don't.  When employers offer retirement accounts, some will contribute funds to the accounts, some will not.  Different types of retirement accounts have different limits on annual contributions, or may not allow contributions at all if your income is too high.</Accordion.Body>
          <Accordion.Body>A reasonable starting point is figuring out your projected annual expenses in retirement.  From there, your required portfolio amount will depend on your preferred strategy, especially as it relates to your risk tolerance.</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='1'>
          <Accordion.Header>Volatility and Asset Allocation</Accordion.Header>
          <Accordion.Body>While the amount of money you save each month and the number of years you save are the main considerations, another crucial factor is your asset allocation. Are you putting your money in a savings account--i.e. cash--and gaining less than one percent return each year?  This strategy is likely to lose money in the long-term due to inflation.  There are several ways to invest your retirement savings--stocks, bonds, commodities, real esate, etc.  Your choices will depend on your preferred balance of risk and return since these two factors are often directly correlated, at least in the long-term.</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='2'>
          <Accordion.Header>Expense Ratio</Accordion.Header>
          <Accordion.Body>One consideration that many people forget is the cost of investing your money.  The compounding effect of annual returns over a few decades helps your retirement portfolio grow, but the same compounding effect of annual fees will reduce your gains.  Most, if not all, assets require investors to pay someone who manages the investments.  The management fee or expense ratio is typically charged as a percentage of the asset value, often falling into the range of 0.04% to 2%, depending on the type of asset and the amount invested.  If you combine a high fee with a low return, your retirement portfolio is less likely to reach its goal.</Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <h3>About Me</h3>
      <p>My name is Jessica and my interests are varied.  While I'm currently advancing my skills in software development, I have previously studied data science and network engineering.  I like understanding how systems work, which allows me to gamify troubleshooting as a sort of logic puzzle.</p>
    </div>
  )
}

export default About;