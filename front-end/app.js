import express from 'express'
import { engine } from 'express-handlebars'

const app = express()

const port = 3001

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(port)