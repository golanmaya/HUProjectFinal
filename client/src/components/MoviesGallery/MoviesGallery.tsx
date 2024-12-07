import { Container, Row } from 'react-bootstrap'
import MovieCard from '../MovieCard/MovieCard'
import { IMovie } from '../../interfaces/MovieInterfaces'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import "./MoviesGallery.css"
import { useState } from 'react'
interface IMovieGalleryProps {
  movies: IMovie[]
}

export default function MoviesGallery(props: IMovieGalleryProps) {

  const { movies } = props
  const [term, setTerm] = useState<string>("");
  
  return (
    <Container className='MoviesGallery'>
      <Row className='search flex-grow-1'>
        <div className="search-inner flex-grow-1">
          <div className="input-group">
            <input className="form-control border-end-0 border rounded-3" type="search" id="header-search-input" onChange={(e)=>setTerm(e.target.value)}/>
            <span className="input-group-append">
              <button style={{ marginLeft: '-41px' }} className="magnifying-glass btn btn-outline-secondary bg-white border-bottom-0 border rounded-3" type="button">
                <FaMagnifyingGlass className='magnifying-glass' />
              </button>
            </span>
          </div>
        </div>
      </Row>
      <Row xs={1} md={2} lg={3} xl={4} className="g-5">
        {
          movies.map((movie) => (
            movie.title.includes(term) &&
            <MovieCard key={movie._id} movie={movie} />
          ))
        }
      </Row>
      <h5 className='mt-5'>Total {movies?.length} movies</h5>
    </Container>
  )
}
