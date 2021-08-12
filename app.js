const express = require('express')
const app = express()
const port = 3000
//const nodemailer = require("nodemailer")
//const { google } = require("googleapis")
//const OAuth2 = google.auth.OAuth2;
//require('dotenv').config()

//static files
app.use(express.static('public'))
app.use(express.json())
app.use("/css", express.static(__dirname + 'public/css'))

app.set('view engine', 'ejs')

app.get('', (req, res) => {
  res.render("index")
})

app.get('/about', (req, res) => {
  res.render("about")
})

app.get('/projects', (req, res) => {
  res.render("projects")
})

app.get('/pomodoro', (req, res) => {
  res.render("pomodoro")
})

app.get('/contact', (req, res) => {
  res.render("contact")
})
/*
app.post('/contact', (req, res) =>{
  console.log(req.body);
  createTransporter(req);
})
*/

app.listen(port, () => {console.log(`Listening on Port: ${port}`)})
