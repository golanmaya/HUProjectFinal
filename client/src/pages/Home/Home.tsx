import { useEffect, useState } from 'react'
import { IMovie } from '../../interfaces/MovieInterfaces'
import { doGetAllMovies } from '../../services/MoviesService'
import MoviesGallery from '../../components/MoviesGallery/MoviesGallery'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'

export default function Home() {

  const [movies, setMovies] = useState<IMovie[] | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    const getAllMovies = async () => {
      const { error, result } = await doGetAllMovies()
      if (error) {
        setError(error)
      } else {
        setMovies(result)
      }
    }
    getAllMovies();
  }, [])

  return (
    <div>
      <div className="container-fluid py-5">
        <div>
          {(error) && <div>Error getting movies 😞 <br></br> {error}</div>}
        </div>
        {
          (movies) ?
            <MoviesGallery movies={movies} />
            :
            (!error) && <LoadingSpinner animation='grow' variant='primary' />
        }
      </div>
    </div>
  )
}
