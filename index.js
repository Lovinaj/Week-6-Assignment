const express = require('express');
const {Products} = require('./models/product')
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// Avaliable Products
app.get('/product', (req, res) => {
    res.json(Products).status(200)
})

// sort product by id
app.get('/product/:id', (req, res) => {
    const productId = Number(req.params.id);
    const Product = Products.find((product) => product.id === productId)

    if (!Product) {
        res.send('Product not found').status(404)
    } else {
        res.json(Product).status(200)
    }
})

    
// Add a Product to Products List
app.post('/product', (req, res) => {
    const item = req.body
    let newProduct = {
        id: +Products.length + 1,
        name: item.name,
        description: item.description,
        image: item.image,
        price: item.price
    }
    Products.push(newProduct)
    res.json(Products).status(200)
})

// Product Update
app.put('/product/:id', (req, res) => {
    const ProductId = Number(req.params.id);
    console.log(ProductId)
    const body = req.body;
    const Product = Products.find((Product) => Product.id === ProductId)
    const index = Products.indexOf(Product); 
    
        if (!Product) {
            res.send('Product not found').status(404)
        } else {
          const updatedProduct = {...Product, ...body}
          Products[index] = updatedProduct;

            res.json(Product).status(200)
        }

    
})
// Deleting a product
app.delete('/product/:id', (req, res) => {
    const ProductId = Number(req.params.id);
    const newProducts = Products.findIndex((Product) => Product.id === ProductId);
    let delProduc = +newProducts;
    Products.splice(delProduc,1);
    res.json(Products);
    
  });





app.listen(port, () =>{
    console.log(`server listening on port http://127.0.0.1${port}`)
})