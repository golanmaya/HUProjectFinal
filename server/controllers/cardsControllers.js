const schemas = require("../schemas/cardsSchema");
const Movie = require("../models/Movie");
const Card = require("../models/Card");

const getAllCards = async (req, res) => {
  // get all cards
  try {
    const allCards = await Card.find({});
    // return all cards
    return res.status(200).json({
      success: true,
      data: allCards,
    });
  } catch (err) {
    // return an error message
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getMovieById = async (req, res) => {
  // get the id from url (no need to parseInt, we're using string type id)
  const { id } = req.params;

  try {
    // find the card that matches this id
    const found = await Movie.findById(id).populate('user_id').exec();
    // found
    if (found) {
      // return the card found
      return res.status(200).json({
        success: true,
        data: found,
      });
    }
    // not found
    return res.status(404).json({
      success: false,
      message: `movie id '${id}' not found`,
    });
  } catch (err) {
    // return an error message
    return res.status(400).json({
      success: false,
      message: "Invalid format for movie id",
    });
  }
};

const searchInMovies = async (req, res) => {

  // validate the request's body using joi
  const { error, value } = schemas.searchMovie.validate(req.body);
  // check if there are joi validation errors
  if (error) {
    const errorsArray = error.details.map((err) => err.message); // creates an array of error-message strings
    return res.status(400).json({ success: false, message: errorsArray });
  }
  // destructuring the variables from 'value'
  const { searchTerm, searchFields } = value;

  try {
    // find the cards containing the 'searchTerm' using our static 'multipleFieldsStringSearch' method
    const found = await Movie.multipleFieldsStringSearch(searchTerm, searchFields);
    // return the results (an empty array if not found)
    return res.status(found.length !== 0 ? 200 : 204).json({
      success: true,
      data: found,
    });
  } catch (err) {
    // return an error message
    return res.status(400).json({ success: false, message: err.message });
  }
};



const deleteCard = async (req, res) => {
  // get the id from url (no need to parseInt, we're using string type id)
  const { id } = req.params;
  // try to handle errors
  try {
    const card = await Card.findById(id);

    // Check if the card exists
    if (!card) {
      return res.status(404).json({ success: false, message: `Card id ${id} not found` });
    }

    // Check if the logged-in user is the owner of the card or an admin
    if (card.user_id.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ success: false, message: "You are not authorized to delete this card" });
    }

    const deleted = await Card.findByIdAndDelete(id);

    if (!deleted) throw new Error();
    // found & deleted
    return res.status(200).json({ success: true, deleted: deleted });
  } catch (err) {
    return res
      .status(404)
      .json({ success: false, message: `card id ${id} not found` });
  }
};

const updateCard = async (req, res) => {
  const found = await Card.findById(req.params.id);
  if (!found)
    return res.status(404).json({ success: false, message: "Card not found" });
  if (found.user_id.toString() !== req.user.id)
    return res.status(403).json({ success: false, message: "You can't edit this card" });
  // validate the request's body using joi
  const { error, value } = schemas.updateCard.validate(req.body);
  // check if there are joi validation errors
  if (error) {
    const errorsArray = error.details.map((err) => err.message); // creates an array of error-message strings
    return res.status(400).json({ success: false, message: errorsArray });
  }
  // get the id from url (no need to parseInt, we're using string type id)
  const { id } = req.params;

  let updated;

  try {
    updated = await Card.findByIdAndUpdate(id, value, { new: true });
    // not found- return a response and stop execution
    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: `card id ${id} was not found.` });
    // found- return a response
    return res.status(200).json({
      success: true,
      updated: updated,
    });
  } catch (err) {
    return res
      .status(404)
      .json({ success: false, message: `card id ${id} was not found.` });
  }
};
//##MY-CARDS
const getUserCards = async (req, res) => {
  try {
    const userId = req.user.id;
    const userCards = await Card.find({ "user_id": userId });
    if (!userCards)
      return res.status(404).json("No cards found");
    return res.status(200).json({ success: true, data: userCards });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}


module.exports = {
  getAllCards,
  getCardById,
  searchInCards,
  createNewCard,
  deleteCard,
  updateCard,
  getUserCards,

};
