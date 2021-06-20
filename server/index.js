const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const cors = require('cors')

const app = express()

function writeAction(objAction, typeAction) {
  let action = { type: typeAction, product: objAction.product_name, lastModify: new Date() }
  return action
}

function readWriteToJSON(JSONFile, actionObj = {}) {
  fs.readFile(JSONFile, 'utf-8', (err, data) => {
    const stats = JSON.parse(data)
    stats.push(actionObj)

    fs.writeFile(JSONFile, JSON.stringify(stats), (err) => {})
  })
}

app.use(bodyParser.json({ extended: true }))
app.use(express.static('.'))
app.use(cors())

app.listen(3000, () => {
  console.log('Server is running on port 3000!')
})

app.get('/cart', (req, res) => {
  fs.readFile('cart.json', 'utf-8', (err, data) => {
    res.send(data)
  })
})

app.get('/catalog', (req, res) => {
  fs.readFile('catalog.json', 'utf-8', (err, data) => {
    res.send(data)
  })
})

app.post('/addToCart', (req, res) => {
  fs.readFile('cart.json', 'utf-8', (err, data) => {
    if (err) {
      res.send('{"result": 0}')
    } else {
      const cart = JSON.parse(data)
      const item = req.body

      if (cart.length == 0) {
        cart.push(item)
        readWriteToJSON('stats.json', writeAction(item, 'addProduct'))
      } else {
        let tempCart = cart.filter((elem) => item.id === elem.id)
        tempCart.length == 0
          ? cart.push(item)
          : cart.map((elem) => {
              if (elem.id == item.id) elem.quantity += 1
            })
        readWriteToJSON('stats.json', writeAction(item, 'addProduct'))
      }

      fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}')
        } else {
          res.send('{"result": 1}')
        }
      })
    }
  })
})

app.post('/removeFromCart', (req, res) => {
  fs.readFile('cart.json', 'utf-8', (err, data) => {
    if (err) {
      res.send('{"result": 0}')
    } else {
      const cart = JSON.parse(data)
      const item = req.body

      for (let product of cart) {
        if (product.id == item.id) {
          cart.splice(cart.indexOf(product), 1)
        }
      }
      readWriteToJSON('stats.json', writeAction(item, 'removeProduct'))

      fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}')
        } else {
          res.send('{"result": 1}')
        }
      })
    }
  })
})
