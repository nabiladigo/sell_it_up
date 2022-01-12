// Any imports
const express = require('express');
const app = express();
const products = require('./models/product_model.js');

// My variables
const PORT = 4000;

// Set our app
app.set('view engine', 'ejs');

// Configure it to look in public
app.use(express.static('public'));

// Routes
app.get("/", function(req, res) {
    res.send("This is working! :)")
})

app.get('/products/', (req, res) => {

    const allProducts = products.find();
            /* 
                1. the first param of render() is the .ejs file 
                that we want to inject data into.
    
                2. the second param is the data that we want 
                to inject into the .ejs file (it must be an object)
            */
    
            /*	
                there will be a variable available inside
                the show.ejs file called product, 
                and its value the foundItem
            */
        const context = { products: allProducts };
        res.render('index.ejs', context);

});

// show route
// this route will catch GET requests to /products/index/ and respond with a single product
app.get("/products/:productId", (req, res) => {
    products.findById(req.params.productId, (error, foundItem) => {
        if (error) return console.log(error);
    
        return res.send(foundItem);
    });
});

// app.get("/products/:index", function(req, res) {
//     res.send(
//         `<h1>Would you like to buy this cool ${products[req.params.index].name}</h1>
//         <h3>Price: $${products[req.params.index].price}</h3>
//         <ahref="${products[req.params.index].image}">Image</a>`
//         )
// })


app.listen(PORT, function() {
    console.log(`I am listening on port ${PORT}`)
});