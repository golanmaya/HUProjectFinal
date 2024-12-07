const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const users = [
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234561'),
    name: {
      first: "Uri",
      middle: "the",
      last: "User",
    },
    email: "user@gmail.com",
    password: bcrypt.hashSync('User123!', 10),
    image: {
      url: "https://cdn.pixabay.com/photo/2024/03/03/20/44/cat-8611246_1280.jpg",
      alt: "User Profile",
    },
    likes: ["60d5ec49f1b2f9a7d1234565"],
    movies: ["60d5ec49f1b2f9a7d1234565"],
    reviews: ["60d5ec49f1b2f9a7d1234568",],
    isAdmin: false,
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234562'),
    name: {
      first: "Benny",
      middle: "the",
      last: "otheUser",
    },
    email: "otheruser@gmail.com",
    password: bcrypt.hashSync('Otheruser123!', 8),
    image: {
      url: "https://cdn.pixabay.com/photo/2024/11/20/09/14/christmas-9210799_1280.jpg",
      alt: "Another Profile",
    },

    isAdmin: false,
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234563'),
    name: {
      first: "Arik",
      middle: "the",
      last: "Admin",
    },
    email: "admin@gmail.com",
    password: bcrypt.hashSync('Admin123!', 8),
    image: {
      url: "https://cdn.pixabay.com/photo/2023/05/10/19/18/sparrow-7984807_1280.jpg",
      alt: "Admin Profile",
    },

    isAdmin: true,
  },
]

const movies = [

  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234565'),
    title: "The Dark Knight",
    summary: "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
    releaseYear: 2008,
    genre: "Action", // Action, Crime, Drama
    // cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    director: "Christopher Nolan",
    image: {
      url: "https://m.media-amazon.com/images/S/pv-target-images/e9a43e647b2ca70e75a3c0af046c4dfdcd712380889779cbdc2c57d94ab63902.jpg",
      alt: "The Dark Knight movie image",
    },
    likes: ["60d5ec49f1b2f9a7d1234561"],
    reviews: ["60d5ec49f1b2f9a7d1234568"],
    creator: "60d5ec49f1b2f9a7d1234561",
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234566'),
    title: "Pulp Fiction",
    summary: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    releaseYear: 1994,
    genre: "Crime", //Crime, Drama
    // cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    director: "Quentin Tarantino",
    image: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj6_ot-pRVfLMtc2vyguVf_0m0HUuvdBw2I-EuFXkUIEB_eoAS",
      alt: "Pulp Fiction movie image",
    },
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234567'),
    title: "The Matrix",
    summary: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    releaseYear: 1999,
    genre: "Sci-Fi", //Action, Sci-Fi
    // cast: ["Keanu Reeves card", "Laurence Fishburne card", "Carrie-Anne Moss card"],
    director: "Lana Wachowski",
    image: {
      url: "https://cdn.pixabay.com/photo/2022/09/28/02/39/matrix-7484054_1280.jpg",
      alt: "The Matrix movie image",
    },
  }
];


const reviews = [
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234568'),
    userId: '60d5ec49f1b2f9a7d1234561',
    movieId: '60d5ec49f1b2f9a7d1234565',
    rating: 8,
    text: "hskfh",
    date: new Date(2023, 3, 31)
  },

]
/* const cast =
  [

    {
      name: {
        first: "Leonardo",
        middle: "Wilhelm",
        last: "DiCaprio"
      },
      yearOfBirth: 1974,
      birthPlace: "Los Angeles, California, USA",
      about: "Leonardo DiCaprio is an American actor and film producer known for his work in both blockbuster and independent films.",
      image: {
        url: "https://example.com/images/leonardo.jpg",
        alt: "Leonardo DiCaprio"
      }
    },
    {
      name: {
        first: "Joseph",
        middle: "Leonard",
        last: "Gordon-Levitt"
      },
      yearOfBirth: 1981,
      birthPlace: "Los Angeles, California, USA",
      about: "Joseph Gordon-Levitt is an American actor, filmmaker, and entrepreneur, well-known for his roles in various acclaimed films.",
      image: {
        url: "https://example.com/images/joseph.jpg",
        alt: "Joseph Gordon-Levitt"
      }
    },
    {
      name: {
        first: "Elliot",
        middle: "Page",
        last: ""
      },
      yearOfBirth: 1987,
      birthPlace: "Shanti, Nova Scotia, Canada",
      about: "Elliot Page is a Canadian actor and producer known for his work in films such as Juno and Inception.",
      image: {
        url: "https://example.com/images/elliot.jpg",
        alt: "Elliot Page"
      }
    },
    {
      name: {
        first: "Christian",
        middle: "Charles",
        last: "Bale"
      },
      yearOfBirth: 1974,
      birthPlace: "Pembrokeshire, Wales",
      about: "Christian Bale is a Welsh-American actor known for his transformative performances in a variety of genres.",
      image: {
        url: "https://example.com/images/christian.jpg",
        alt: "Christian Bale"
      }
    },
    {
      name: {
        first: "Heath",
        middle: "Ledger",
        last: ""
      },
      yearOfBirth: 1979,
      birthPlace: "Perth, Australia",
      about: "Heath Ledger was an Australian actor and director, known for his iconic performance as the Joker in The Dark Knight.",
      image: {
        url: "https://example.com/images/heath.jpg",
        alt: "Heath Ledger"
      }
    },
    {
      name: {
        first: "Al",
        middle: "Pacino",
        last: ""
      },
      yearOfBirth: 1940,
      birthPlace: "New York City, New York, USA",
      about: "Al Pacino is an acclaimed American actor and filmmaker known for his roles in classic films like The Godfather.",
      image: {
        url: "https://example.com/images/al.jpg",
        alt: "Al Pacino"
      }
    },

    {
      name: {
        first: "Leonardo",
        middle: "Wilhelm",
        last: "DiCaprio"
      },
      yearOfBirth: 1974,
      birthPlace: "Los Angeles, California, USA",
      about: "Leonardo DiCaprio is an American actor and film producer known for his work in both blockbuster and independent films.",
      image: {
        url: "https://example.com/images/leonardo.jpg",
        alt: "Leonardo DiCaprio"
      }
    },
    {
      name: {
        first: "Joseph",
        middle: "Leonard",
        last: "Gordon-Levitt"
      },
      yearOfBirth: 1981,
      birthPlace: "Los Angeles, California, USA",
      about: "Joseph Gordon-Levitt is an American actor, filmmaker, and entrepreneur, well-known for his roles in various acclaimed films.",
      image: {
        url: "https://example.com/images/joseph.jpg",
        alt: "Joseph Gordon-Levitt"
      }
    },
    {
      name: {
        first: "Elliot",
        middle: "Page",
        last: ""
      },
      yearOfBirth: 1987,
      birthPlace: "Shanti, Nova Scotia, Canada",
      about: "Elliot Page is a Canadian actor and producer known for his work in films such as Juno and Inception.",
      image: {
        url: "https://example.com/images/elliot.jpg",
        alt: "Elliot Page"
      }
    },
    {
      name: {
        first: "Marlon",
        middle: "Brando",
        last: ""
      },
      yearOfBirth: 1924,
      birthPlace: "Omaha, Nebraska, USA",
      about: "Marlon Brando was an American actor and film director, regarded as one of the greatest actors in film history.",
      image: {
        url: "https://example.com/images/marlon.jpg",
        alt: "Marlon Brando"
      }
    },
    {
      name: {
        first: "Al",
        middle: "",
        last: "Pacino"
      },
      yearOfBirth: 1940,
      birthPlace: "New York City, New York, USA",
      about: "Al Pacino is an acclaimed American actor and filmmaker known for his roles in classic films like The Godfather.",
      image: {
        url: "https://example.com/images/al.jpg",
        alt: "Al Pacino"
      }
    },
    {
      name: {
        first: "Christian",
        middle: "Charles",
        last: "Bale"
      },
      yearOfBirth: 1974,
      birthPlace: "Pembrokeshire, Wales",
      about: "Christian Bale is a Welsh-American actor known for his transformative performances in a variety of genres.",
      image: {
        url: "https://example.com/images/christian.jpg",
        alt: "Christian Bale"
      }
    },
    {
      name: {
        first: "Heath",
        middle: "",
        last: "Ledger"
      },
      yearOfBirth: 1979,
      birthPlace: "Perth, Australia",
      about: "Heath Ledger was an Australian actor and director, known for his iconic performance as the Joker in The Dark Knight.",
      image: {
        url: "https://example.com/images/heath.jpg",
        alt: "Heath Ledger"
      }
    }

  ]
 */
module.exports = { users, movies, reviews };