// Any imports
const express = require('express');
const app = express();

// My variables
const PORT = 4000;
const products = [
    {product: "Shirt", price: 20},
    {product: "Shoes", price: 60},
    {product: "Pants", price: 100}
]

// Routes
app.get("/", function(req, res) {
    res.send("This is working! :)")
})

app.get("/products", function(req, res) {
    res.send(products)
})

app.get("/products/:index", function(req, res) {
    res.send(products[req.params.index])
})


app.listen(PORT, function() {
    console.log(`I am listening on port ${PORT}`)
});