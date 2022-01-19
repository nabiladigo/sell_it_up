const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: [true, 'Are you seriously trying to rate this without a number? Rude!'],
        min: [1, "I see you really didn't like it but calm down"],
        max: [5, "I don't think you enjoy it as much as you think you do"]
    },
    comment: {
        type: String,
        required: [true, 'You have to say something in a review'],
    },
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
