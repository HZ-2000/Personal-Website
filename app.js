const express = require('express')
const app = express()
const path = require("path");
const fs = require("fs");
const port = 3000
const files = fs.readdirSync("public/pdfs").map(name => {
  return {
    name: path.basename(name, ".pdf"),
    url: `/pdfs/${name}`
  };
});

//static files
app.use(express.static('public'))
app.use(express.json())
app.use("/css", express.static(__dirname + 'public/css'))

app.use(
  express.static("public", {
    setHeaders: (res, filepath) =>
      res.attachment(`pdf-express-${path.basename("public/Resume.pdf")}`)
  })
);

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
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
  res.render("contact", { files })
})

app.get('/Resume', (req, res) => {
  res.render("contact")
})

app.listen(port, () => {console.log(`Listening on Port: ${port}`)})
