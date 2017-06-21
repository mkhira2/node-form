const express = require('express')
const app = express()
const mustache = require('mustache-express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(expressValidator())

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

// grabs the field by its name from the request

  const name = request.body.name
  const email = request.body.email
  const message = request.body.message

// Step 1: validate the data
  request.checkBody("name", "You must enter your name!").notEmpty()
  request.checkBody("email", "You must enter your email!").notEmpty()
  request.checkBody("message", "You must enter a message!").notEmpty()

// Step 2: check if there were any errors
  var errors = request.validationErrors()

  if (errors) {
    response.render('contact-form', {
      pageTitle: "New Contact",
        errors: errors,
        name: name,
        email: email,
        message: message
    })
  } else {

    response.render('contact-thanks', {
      pageTitle: 'Thanks!',
      name: name,
      email: email,
      message: message
    })
  }
})
