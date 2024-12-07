const Review = require('../models/Review');
const User = require('../models/User');
const Movie = require('../models/Movie');
const schemas = require("../schemas/reviewSchema");

const postReview = async (req, res) => {
    const { id } = req.params;  //movie id 
    const { error, value } = schemas.newReview.validate(req.body);
    if (error) {
        const errorsArray = error.details.map((err) => err.message);
        return res.status(400).json({ success: false, message: errorsArray });
    }
    try {
        value.userId = req.user.id;
        value.date = new Date();
        value.movieId = id;
        const review = new Review(value);
        await review.save();
        const user = await User.findById(req.user.id);
        const movie = await Movie.findById(id);
        movie.reviews.push(review.id);
        user.reviews.push(review.id);
        movie.save();
        user.save();
        return res.status(200).json({ success: true, message: `Updated review for movie ${id}`, data: review });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

const updateReview = async (req, res) => {
    const found = await Review.findById(req.params.id);
    if (!found)
        return res.status(404).json({ success: false, message: "Review not found" });
    if (found.userId.toString() !== req.user.id)
        return res.status(403).json({ success: false, message: "You can't edit this review" });
    const { error, value } = schemas.patchReview.validate(req.body);
    // check if there are joi validation errors
    if (error) {
        const errorsArray = error.details.map((err) => err.message); // creates an array of error-message strings
        return res.status(400).json({ success: false, message: errorsArray });
    }
    // get the id from url (no need to parseInt, we're using string type id)
    const { id } = req.params;

    let updated;

    try {
        updated = await Review.findByIdAndUpdate(id, value, { new: true });
        // not found- return a response and stop execution
        if (!updated)
            return res
                .status(404)
                .json({ success: false, message: `review id ${id} was not found.` });
        // found- return a response
        return res.status(200).json({
            success: true,
            updated: updated,
        });
    } catch (err) {
        return res
            .status(404)
            .json({ success: false, message: `review id ${id} was not found.` });
    }
};

const deleteReview = async (req, res) => {
    // get the id from url (no need to parseInt, we're using string type id)
    const { id } = req.params;
    // try to handle errors

    try {
        const review = await Review.findById(id);

        // Check if the card exists
        if (!review) {
            return res.status(404).json({ success: false, message: `Review id ${id} not found` });
        }

        // Check if the logged-in user is the owner of the card or an admin
        if (review.userId.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({ success: false, message: "You are not authorized to delete this review" });
        }

        const deleted = await Review.findByIdAndDelete(id);
        const user = await User.findById(deleted.userId);
        const movie = await Movie.findById(deleted.movieId);
        movie.reviews = movie.reviews.filter((id) => (id.toString() !== deleted.id));
        console.log(movie.reviews);
        console.log(deleted.id);


        user.reviews = user.reviews.filter((id) => (id.toString() !== deleted.id));
        movie.save();
        user.save();

        if (!deleted) throw new Error();
        // found & deleted
        return res.status(200).json({ success: true, deleted: deleted });
    } catch (err) {
        console.log(err);

        return res
            .status(404)
            .json({ success: false, message: `review id ${id} not found` });
    }
};

module.exports = {
    postReview,
    updateReview,
    deleteReview,
}