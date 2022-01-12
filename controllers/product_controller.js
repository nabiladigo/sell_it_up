app.get('/products/:productId', (req, res) => {

    products.findById(req.params.productId, (error, foundItem) => {
        if (error) return console.log(error);
    
        return res.render('show.ejs');
    });

});