import './Default.css'
import '../../pages/Page.css'

import { Route, Routes } from 'react-router-dom'

// components
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'

// pages
import Home from '../../pages/Home/Home'
import User from '../../pages/User/User'
import Business from '../../pages/Business/Business'
import Admin from '../../pages/Admin/Admin'
import NotFound from '../../pages/NotFound/NotFound'
import SignIn from '../../pages/SignIn/SignIn'
import UserProfile from '../../pages/UserProfile/UserProfile'
import CardDetails from '../../pages/CardDetails/CardDetails'
import SignUp from '../../pages/SignUp/SignUp'
import MyOwnCards from '../../pages/MyOwnCards/MyOwnCards'
import MyOwnMovies from '../../pages/MyOwnMovies/MyOwnMovies'
import AddMovie from '../../pages/AddMovie/AddMovie'
import EditMovie from '../../pages/EditMovie/EditMovie'
import Movie from '../../pages/Movie/Movie'
import Favorites from '../../pages/Favorites/Favorites'
import EditProfile from '../../pages/EditProfile/EditProfile'
import About from '../../pages/About/About'

export default function Default() {
  return (
    <div className='Default'>

      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user' element={<User />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/mymovies' element={<MyOwnMovies />} />
        <Route path='/add-movie' element={<AddMovie />} />
        <Route path='/edit-movie/:id' element={<EditMovie />} />
        <Route path='/edit-profile' element={<EditProfile />} />
        <Route path='/movie/:id' element={<Movie />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <Footer />

    </div>
  )
}
