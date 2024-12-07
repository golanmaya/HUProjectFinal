const mongoose = require("mongoose");
const { imageSchema } = require("./Common");

const movieSchema = new mongoose.Schema(
    {
        creator: String,
        title: String,
        summary: String,
        genre: String,
        releaseYear: Number,
        director: String,
        image: imageSchema,
        likes: [mongoose.SchemaTypes.ObjectId],
        reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    },
    {
        timestamps: true,
    }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;