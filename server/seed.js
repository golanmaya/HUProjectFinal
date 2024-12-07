/*
============================================
============================================
            **** WARNING ****
  RUNNING THIS SCRIPT WILL DELETE AND\OR
  OVERWRITE YOUR BCARDS DATABASE !!!!!!!
============================================
============================================
*/

const connectDB = require('./config/db')
const { users, reviews, movies } = require('./data/data')
const User = require('./models/User')
const Movie = require('./models/Movie')
const Review = require('./models/Review')

const seedAll = async () => {

  console.log('\nDatabase seeding started...');

  try {

    // Seed movies

    // delete all existing cards
    await Movie.deleteMany();
    // insert seed movies
    const insertedMovies = await Movie.insertMany(movies);
    console.log(`  [i] Inserted ${insertedMovies.length} movies`);

    // Seed users

    // delete all existing users
    await User.deleteMany();
    // insert seed users
    const insertedUsers = await User.insertMany(users);
    console.log(`  [i] Inserted ${insertedUsers.length} users`);


    await Review.deleteMany();
    // insert seed users
    const insertedReview = await Review.insertMany(reviews);
    console.log(`  [i] Inserted ${insertedReview.length} reviews`);

    /*    //seed cast
       // delete all existing users
      await Cast.deleteMany();
  
       // insert seed cast
      const insertedCast = await Cast.insertMany(cast);
       console.log(`  [i] Inserted ${insertedCast.length} cast`); */

    // Success

    console.log('[v] Completed successfully');
    process.exit(0);

  } catch (e) {

    // Error

    console.log('[x] Seeding error')
    console.log(e.message)
    process.exit(1);

  }

}

// Connect to database
connectDB().then(() => {
  // Seed all collections
  seedAll()
});