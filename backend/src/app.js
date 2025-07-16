const express = require('express');
const morgan = require('morgan'); //logging purpose
const helmet = require('helmet');//Helmet helps secure Express apps by setting HTTP response headers.
const cors = require('cors');
const jwt = require('jsonwebtoken');
 
require('dotenv').config();

const middlewares = require('./middlewares'); //Notfound error handler
const Finance = require('./finance');
const { isDuplicateRecord } = require('./utils');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

const finance =  new Finance()


app.post("/finance",(req,res)=>{
    const {annual_income, year, expenses, risk_appetite} = req.body
    const result = finance.create(annual_income, year, expenses, risk_appetite)
    result.then(()=>{
      res.json(result.rows)
    }).catch((e)=>{
      if (isDuplicateRecord(e.message)){
      return res.status(409).json({error: 'duplicate year already exists'}); 
      }
      return res.status(500)
    })
})
app.get("/finance",async(req,res)=>{
  const result =await finance.get()
  console.log(result)
  res.json(result.rows)
})

app.get("/finance/:id",async(req,res)=>{
  const id = req.params.id
  const result =await finance.getFinanceById(id)
  console.log(result)
  res.json(result.rows)
})

app.delete("/finance/:id",async(req,res)=>{
  const id = req.params.id
  const result =await finance.delete(id)
  if (result.rowCount==1){
    res.json("Deleted successfully")
  }else{
    res.json("Not found")
  }
})

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
