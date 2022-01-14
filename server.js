// Any imports
const express = require('express');
const app = express();
const products = require('./models/product_model.js');
// const allProducts = products.find();
// My variables
const PORT = 4000;

// Set our app
app.set('view engine', 'ejs');

// App.use for adding 
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use((req, res, next) => {    
    console.log("I'm running for another new route")
	console.log(`${req.method} ${req.originalUrl}`);    
	next();
});

// Routes

app.get("/", function(req, res) {
    res.send("This is working! :)")
})

app.get('/products', (req, res) => {
    
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

app.post('/products', (req, res) => {
    // Start by console logging things out here for the req, then req.body
    products.create(req.body, (error, createdProduct) => {
        if(error) console.log(error);
        console.log(createdProduct);


        res.redirect("/products");
    })
})

app.get("/products/new", function(req, res) {
    res.render("new.ejs")
})

// show route
// this route will catch GET requests to /products/index/ and respond with a single product
app.get('/products/:productId', (req, res) => {
    
    products.findById(req.params.productId, (error, foundProduct) => {
        if (error) {
            console.log(error);
            // req.error = error;
            // return next();
        }
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
        res.render('show.ejs', {product: foundProduct});
    });
    
});
        
app.get("/*", (req, res) => {
    const context = { error: req.error };
    return res.status(404).render("404", context);
});
        
app.listen(PORT, function() {
    console.log(`I am listening on port ${PORT}`)
});
