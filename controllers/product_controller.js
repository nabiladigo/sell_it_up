const express = require('express');
const router = express.Router();
const { Product } = require('../models')

Product.deleteMany({}, (error, deletedProduct) => {
    if(error) console.log(error);
    Product.insertMany(
        [
            {
                name: "Eric and Troy's Awesome class",
                price: 100,
                image: "https://i.pinimg.com/originals/81/6b/83/816b83a23a6f4b0405bd6699b854a6bd.jpg",
                description: "This is the best class because they named themselves the blue devils!",
            },
            {
                name: "Some other thing",
                price: 200,
                image: "https://www.rd.com/wp-content/uploads/2021/03/GettyImages-1133605325-scaled-e1617227898456.jpg",
                description: "Another description!",
            },
            {
                name: "Coders Unite",
                price: 500,
                image: "https://hips.hearstapps.com/countryliving.cdnds.net/17/47/1511194376-cavachon-puppy-christmas.jpg",
                description: "We love coding!",
            },
        ],
          function (error, createdProduct) {
            if (error) {
              return console.log(error);
            }
            console.log("=== Seed Complete ===");
            console.log(createdProduct);
          }
    )
    console.log(deletedProduct)
}
)

router.get('/', (req, res) => {
    
    Product.find({}, (error, foundProducts) => {
        if(error) return console.log(error);

        console.log(foundProducts)
        context = {
            products: foundProducts
        }
        res.render('index.ejs', context);
    })
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

});

router.post('/', (req, res) => {
    // Start by console logging things out here for the req, then req.body
    products.create(req.body, (error, createdProduct) => {
        if(error) console.log(error);
        console.log(createdProduct);


        res.redirect("/products");
    })
})

router.get("/new", function(req, res) {
    res.render("new.ejs")
})

// show route
// this route will catch GET requests to /products/index/ and respond with a single product
router.get('/:productId', (req, res) => {
    
    products.findById(req.params.productId, (error, foundProduct) => {
        if (error) {
            console.log(req.params)
            console.log(error);
            const context = { error: error };
            return res.status(404).render("404", context);
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

router.delete('/:productId', (req, res) => {
    products.findByIdAndDelete(req.params.productId, (error, deleteProduct) => {
        if(error) {
            console.log(error);
            res.send(error);
        }

        console.log(deleteProduct);
        res.redirect('/products')
    })
})

router.get('/:productId/edit', (req, res) => {
    products.findById(req.params.productId, (error, updatedProduct) => {
        if(error) console.log(error);

        console.log(updatedProduct);
        res.render('edit.ejs', { product: updatedProduct})
    })
})

router.put('/:productId', (req, res) => {
    console.log(`The request is ${req}`)
    // console.log(`The request's body is ${req.body}`)

    products.findByIdAndUpdate(req.params.productId, req.body,(error, updatedProduct) => {
        if (error) return console.log(error);

        console.log(updatedProduct);

        return res.redirect(`/products`);
    });
});

module.exports = router;
