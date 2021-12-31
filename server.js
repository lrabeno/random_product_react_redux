const express = require('express')
const { syncAndSeed, db, Product, Manufacturer, Fake} = require('./db')
const path = require('path')
const faker = require('faker');

const app = express()
const PUBLIC_PATH = path.join(__dirname, "./public");
const DIST_PATH = path.join(__dirname, "./dist");

app.use(express.json());
app.use(express.static(PUBLIC_PATH));
app.use(express.static(DIST_PATH));
app.use(express.urlencoded({ extended:false}));


app.get('/products', async (req, res, next) => {
    try {
        res.send(await Product.findAll())
    }
    catch(error) {
        next(error)
    }
})

app.get('/products/:id', async (req, res, next) => {
    try {
        res.send(await Product.findByPk(req.params.id))    
    } 
    catch (error) {
        next (error)
    }
})

app.post('/add', async (req, res, next) => {
    try {
        res.send(await Product.create({
            name: faker.commerce.productName()
        }
    ))} 
    catch(error) {
        next (error)
    }
})

app.delete('/delete/:id', async (req, res, next) => {
    try {
        console.log('REQ PARAMS--------->>>>>>>>>>>',req.params)
        console.log('this is req body --->>>>>',req.body)
        const product = await Product.findByPk(req.params.id)
        if (!product) {
            res.sendStatus(404)
        } else {
        await product.destroy()
        res.sendStatus(204)
        }
    } catch (error) {
        next (error)
    }
})

app.get('/manufacturer', async (req, res, next) => {
    try {
        res.send(await Manufacturer.findAll())
    }
    catch(error) {
        next(error)
    }
})

app.get('/manufacturer/:id', async (req, res, next) => {
    try {
        res.send(await Manufacturer.findByPk(req.params.id))    
    } 
    catch (error) {
        next (error)
    }
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });


const init = async () => {
    try {
      await syncAndSeed()
      await db.authenticate()
      const port = process.env.PORT || 3000;
      app.listen(port, () => console.log(`listening on port ${port}`))
    }
    catch(error) {
        console.log(error)
    }
  }
  
  init();