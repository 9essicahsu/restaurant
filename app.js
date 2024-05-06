const express = require('express')
const { engine } = require('express-handlebars')
const app =express()
const port = 3000
const restaurants = require('./public/jsons/restaurant.json').results

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
  const findKeyword = req.query.keyword?.trim()
  const matchedRestaurant = findKeyword ? restaurants.filter((r) => 
    Object.keys(r).some((property) => {
      if (property === 'name' || property === 'category') {
        return r[property].toLowerCase().includes(findKeyword.toLowerCase())
      }
      return false
    })
  ) : restaurants
  res.render('index', { restaurants: matchedRestaurant, findKeyword })
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurants.find((r) => r.id.toString() === id)
  res.render('detail', {restaurant})
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})