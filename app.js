const express = require('express')
const app = express()
const mustache = require('mustache-express')
const bodyParser = require('body-parser')

app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))

app.listen(3000, function() {
  console.log("ok cool, listening!")
})

app.get('/', function(request, response) {
  response.render("home", {
    pageTitle: 'Home!'
  })
})

app.get('/contact/new', function(request, response) {
  response.render('contact-form', {
    pageTitle: 'New Contact'
  })
})

app.post('/contact', function(request, response) {
  const name = request.body.name
  const email = request.body.email
  const message = request.body.message

  response.render('contact-thanks', {
    pageTitle: 'Thanks!',
    name: name,
    email: email,
    message: message
  })
})
