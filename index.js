const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const rp = require('request-promise')
const util = require("util")

const app = express()

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

// endpoint
app.get('/:city', (req, res) => {
  rp({
    uri: 'http://dataservice.accuweather.com/locations/v1',
    qs: {
      q: req.params.city,
      apiKey: 'xuQ6FB7dc9ifGMTCl5GBtcAT5bD6kEqx'
    },
    json: true
  })
    .then((data) => {
      res.render('index', data)
    })
    .catch((err) => {
      console.log(err.message)
      res.render('error', {
        error: err.message
      })
      //res.json({
      //  message: 'Error',
      //  error: err
      //})
    })
})

app.listen(3000)