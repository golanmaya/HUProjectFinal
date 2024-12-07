const Movie = require('../models/Movie');
const User = require('../models/User');
const schemas = require("../schemas/movieSchema");


const getAllMovies = async (req, res) => {
    // get all cards
    try {
        const allMovies = await Movie.find({});
        // return all cards
        return res.status(200).json({
            success: true,
            data: allMovies,
        });
    } catch (err) {
        // return an error message
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};

const createNewMovie = async (req, res) => {
    const { error, value } = schemas.createMovieCard.validate(req.body);
    if (error) {
        const errorsArray = error.details.map((err) => err.message); // creates an array of error-message strings
        return res.status(400).json({ success: false, message: errorsArray });
    }
    // create a new Card instance (it's only in memory- until we actually save it)
    value.creator = req.user.id;
    const newMovie = new Movie(value);

    // generate & assign the nextBizNumber to the new card
    // newCard.bizNumber = await Card.getNextBizNumber();

    // save the card to database
    try {
        const saved = await newMovie.save();
        // success ! return a response
        return res.status(201).json({
            success: true,
            created: saved,
        });
    } catch (err) {
        // error
        return res
            .status(500)
            .json({ success: false, message: `error saving the movie` });
    }
};

const updateMovie = async (req, res) => {
    const { id } = req.params;
    const found = await Movie.findById(id);
    if (!found)
        return res.status(404).json({ success: false, message: "Movie not found" });
    if (found.creator !== req.user.id)
        return res.status(403).json({ success: false, message: "You can't edit this movie" });
    const { error, value } = schemas.updateMovieCard.validate(req.body);
    // check if there are joi validation errors
    if (error) {
        const errorsArray = error.details.map((err) => err.message); // creates an array of error-message strings
        return res.status(400).json({ success: false, message: errorsArray });
    }
    // get the id from url (no need to parseInt, we're using string type id)


    let updated;

    try {
        updated = await Movie.findByIdAndUpdate(id, value, { new: true });
        // not found- return a response and stop execution
        if (!updated)
            return res
                .status(404)
                .json({ success: false, message: `movie id ${id} was not found.` });
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

const deleteMovie = async (req, res) => {
    // get the id from url (no need to parseInt, we're using string type id)
    const { id } = req.params;
    // try to handle errors
    console.log(id);

    try {
        const movie = await Movie.findById(id);

        // Check if the card exists
        if (!movie) {
            return res.status(404).json({ success: false, message: `Movie id ${id} not found` });
        }

        // Check if the logged-in user is the owner of the card or an admin
        if (!(req.user.isAdmin || movie.creator.toString() === req.user.id)) { 
            return res.status(403).json({ success: false, message: "You are not authorized to delete this review" });
        }
        const deleted = await Movie.findByIdAndDelete(id);
        if (!deleted) throw new Error();
        // found & deleted
        return res.status(200).json({ success: true, deleted: deleted });
    } catch (err) {
        console.log(err);

        return res
            .status(404)
            .json({ success: false, message: `movie id ${id} not found` });
    }
};

const likeMovie = async (req, res) => {
    const { id } = req.params;  //movie id
    try {
        const movie = await Movie.findById(id);
        const user = await User.findById(req.user.id);
        if (!movie) {
            return res.status(404).json({ success: false, message: `Movie ID ${id} not found` });
        }

        if (movie.likes.includes(req.user.id)) {
            movie.likes = movie.likes.filter((userId) => userId.toString() !== req.user.id);
            user.likes = user.likes.filter((movieId) => movieId.toString() !== id);
        } else {
            movie.likes.push(req.user.id);
            user.likes.push(id);
        }
        await user.save();
        await movie.save();
        return res.status(200).json({ success: true, message: `Updated likes for movie ${id}`, data: movie });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

const getMyMovies = async (req, res) => {
    try {
        const userId = req.user.id;
        const userMovies = await Movie.find({ "creator": userId });
        if (!userMovies)
            return res.status(404).json("No movies found");
        return res.status(200).json({ success: true, data: userMovies });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

const getMovieById = async (req, res) => {
    const { id } = req.params;

    try {
        // find the user that matches this id
        const found = await Movie.findById(id).populate('reviews');
        // found
        if (found) {
            // return the user found
            return res.status(200).json({
                success: true,
                data: found,
            });
        }
        // not found
        return res.status(404).json({
            success: false,
            message: `Movie not found`,
        });
    } catch (err) {
        // return an error message
        return res.status(400).json({
            success: false,
            message: "Invalid format for movie id",
        });
    }
};

module.exports = {
    getAllMovies,
    createNewMovie,
    likeMovie,
    updateMovie,
    deleteMovie,
    getMyMovies,
    getMovieById,
}