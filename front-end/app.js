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
  fetch('http://localhost:3000/clientes', {method: 'GET'})
  .then(response => response.json())
  .then(clientes => res.render('home', {clientes}))
})

app.get('/clientes/:id', (req, res) => {
  const id = req.params.id

  fetch(`http://localhost:3000/clientes/${id}`, {method: 'GET'})
  .then(response => response.json())
  .then(cliente => res.render('selecionar', {cliente}))
})

app.post('/cadastrar', (req, res) => {
  const {nome, idade} = req.body
  const cliente = {"nome": nome, "idade": idade}

  fetch('http://localhost:3000/clientes', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(cliente) 
  })
  .then(res.redirect('/'))
})

app.listen(port)