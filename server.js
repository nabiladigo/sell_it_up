// Any imports
const express = require('express');
const app = express();

// My variables
const PORT = 4000;
const products = [
    {product: "Shirt", price: 20},
    {product: "Shoes", price: 60},
    {product: "Pants", price: 100},
    {product: "Fancy suit", price: 1000}
]

// Routes
app.get("/", function(req, res) {
    res.send("This is working! :)")
})

app.get("/products", function(req, res) {
    res.send(products[req.query.id])
})

app.get("/add", function(req, res) {
    let sum = parseInt(req.query.x) + parseInt(req.query.y);
    res.send(`If we add ${req.query.x} and ${req.query.y}, the sum will be ${sum}`)
})

app.get("/products/:index", function(req, res) {
    res.send(
        `<h1>Would you like to buy this cool ${products[req.params.index].product}</h1>
        <h3>Price: $${products[req.params.index].price}</h3>`
        )
})


app.listen(PORT, function() {
    console.log(`I am listening on port ${PORT}`)
});