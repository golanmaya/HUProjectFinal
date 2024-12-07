const router = require('express').Router();
const { getAllCards, getCardById, searchInCards, createNewCard, deleteCard, updateCard, getUserCards, likeCard } = require('../controllers/cardsControllers');
const { mustLogin, allowedRoles } = require('../controllers/authControllers');
const { updateMovieCard } = require('../schemas/movieSchema');

//  base path = "/api/cards"

// PROTECTEC ROUTES:
// mustLogin:  the user must be logged in to view this content (any type of logged-in user)
// allowedRoles:   the user must also have ONE of the following roles (admin, business, ...)
router.get('/', getAllCards)
//##MY-CARDS
router.get('/my-cards', mustLogin, getUserCards);


// unprotected Routes :
router.get('/:id', getMovieById)
router.post('/search', searchInMovies)
router.post('/', mustLogin, allowedRoles(["user"]), createNewCard)
router.delete('/:id', mustLogin, deleteMovie) //only admin
router.put('/:id', mustLogin, updateMovie) //only admin

module.exports = router;