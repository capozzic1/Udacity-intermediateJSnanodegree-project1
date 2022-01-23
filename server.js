const express = require('express')
const cors = require("cors")
const app = express()
const port = 3000


app.use(cors())

let dinoJSON = JSON.stringify(require('./dino.json'));

app.get('/', (req, res) => {
  res.json(dinoJSON);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})