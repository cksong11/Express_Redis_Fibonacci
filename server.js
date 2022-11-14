const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');
let redisSize = 0;
let indexList = [];
let answerList = [];
let client = redis.createClient();

client.on('connect', function(){
  console.log('Connected redis');
});

const app = express();

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.post('/input', function(req, res, next){
  let number = req.body.number;
  client.get(number, function(err, obj){
    if(!obj){
      redisSize = redisSize + 1;
      const index = redisSize;
      client.set(number, index, function(err, reply){
        indexList[index] = number;
        console.log(indexList);
        if(reply) {
          res.json(JSON.stringify({
            ticket: index
          }))
        }
      });
    } else {
      res.json(JSON.stringify({
        ticket: obj
      }))
    }
  });
});

function fib(n) {
  let phi = (1 + Math.sqrt(5))/2;
  let asymp = Math.pow(phi, n) / Math.sqrt(5);
  return Math.round(asymp);
}

app.get('/output', function(req, res, next){
  let id = req.query.ticket;
  console.log(indexList);
  console.log(id);
  if(indexList[id]) {
    if(answerList[id]) {
      res.json(JSON.stringify({
        Fibonacci: answerList[id]
      }))
    } else {
      let answer = fib(indexList[id] - 1);
      answerList[id] = answer;
      res.json(JSON.stringify({
        Fibonacci: answer
      }))
    }
  } else {
    res.json("not found")
  }
});


app.listen(3000, function(){
  console.log('Server started on port 3000');
  redisSize = 0;
  indexList = [];
});
