const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
        movieId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Movie' },
        rating: Number,
        text: String,
        date: Date,
    },
    {
        timestamps: true,
    }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;