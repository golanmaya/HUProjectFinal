const mongoose = require("mongoose");
const { imageSchema, nameSchema } = require("./Common");

const userSchema = new mongoose.Schema(
  {
    name: nameSchema,
    email: { type: String, unique: true },
    password: String,
    image: imageSchema,
    movies: [mongoose.SchemaTypes.ObjectId],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    reviews: [mongoose.SchemaTypes.ObjectId],
    isAdmin: Boolean,
  },
  {
    timestamps: true,
  }
);


const User = mongoose.model("User", userSchema);

module.exports = User;
