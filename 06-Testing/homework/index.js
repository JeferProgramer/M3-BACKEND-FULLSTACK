const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json


app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.get('/test', (req, res) => {
  res.send({
    message: 'test',
  })
})

app.post('/sum', (req, res) => {
 let {a, b} = req.body
 return res.json({result: a+b})
})

app.post('/product', (req, res) => {
  let {a,b} = req.body
  if(typeof a !== 'number' || typeof b !== 'number')return res.sendStatus(400)
  res.send({
    result: a * b,
  }).status(200);
});

app.post('/sumArray', (req, res) => {
  const {array, num} = req.body;
  function sumArray(array, num){
    if(!Array.isArray(array)) throw new TypeError('array')
    if(typeof num !== 'number') throw new TypeError('number')
    for(let i=0; i<array.length - 1; i++){
      for (let j = i+1; j < array.length; j++) {
        if(array[i] + array[j] === num) return true
      }
    }
    return false
  }
  if(!array || !num && num !== 0) res.sendStatus(400)
  return res.json({result: sumArray(array, num)})
})

app.post('/numString', (req, res) => {
  const {s} = req.body
  if(typeof s !== 'string' || s === '') return res.sendStatus(400)
  return res.json({result: s.length})
})

app.post('/pluck', (req, res) => {
  const {array, prop} = req.body
  if(!prop || !Array.isArray(array)) return res.sendStatus(400);
  function pluck(array, prop){
    return array.map(p => p[prop])
  }
  res.send({result: pluck(array, prop)})
})

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar