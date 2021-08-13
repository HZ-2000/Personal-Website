const express = require('express')
const app = express()
const port = 3000
const nodemailer = require("nodemailer")
const { google } = require("googleapis")
const OAuth2 = google.auth.OAuth2;
require('dotenv').config()

//static files
app.use(express.static('public'))
app.use(express.json())
app.use("/css", express.static(__dirname + 'public/css'))

const createTransporter = async (req) => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token :(");
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN
    }
  });

  return transporter;
};

const sendEmail = async (emailOptions) => {
  let emailTransporter = await createTransporter();
  await emailTransporter.sendMail(emailOptions);
};

sendEmail({
  subject: `Message from ${req.body.email}: ${req.body.subject}`,
  text: req.body.message,
  to: process.env.EMAIL,
  from: req.body.email
});

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

app.post('/contact', (req, res) =>{
  console.log(req.body);
  createTransporter(req);
})

app.listen(port, () => {console.log(`Listening on Port: ${port}`)})
