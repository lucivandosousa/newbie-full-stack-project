import express, { json, response } from 'express'
import { engine } from 'express-handlebars'
import fetch from 'node-fetch'

const app = express()

const port = 3001

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('./public'))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.get('/', (req, res) => {
  fetch('http://localhost:3000/clientes')
  .then(response => response.json())
  .then(clientes => res.render('home', {clientes}))
})

app.listen(port)