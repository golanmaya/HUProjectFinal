import { useContext, useEffect, useState } from "react"
import MoviesGallery from "../../components/MoviesGallery/MoviesGallery"
import { IMovie } from "../../interfaces/MovieInterfaces"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import "./Favorites.css"
import { AuthContext } from "../../context/AuthContext"

export default function Favorites() {
  const [movies, setMovies] = useState<IMovie[]>()
  const auth = useContext(AuthContext)

  useEffect(() => {
    if (auth!.userDetails)
      setMovies(auth?.userDetails.likes)
  }, [auth?.userDetails?.likes])

  return (
    <div className="Favorites">
      <div className="container-fluid py-5">
        
        {
          (movies) ?
            <MoviesGallery movies={movies} />
            :
            (!movies) && <LoadingSpinner animation='grow' variant='primary' />
        }
      </div>

    </div>
  )
}

