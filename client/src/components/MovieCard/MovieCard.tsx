import { IMovie } from '../../interfaces/MovieInterfaces'
import { useLocation, useNavigate } from 'react-router-dom'
import { Col, Button, Card } from 'react-bootstrap'
import { AiOutlineLike } from 'react-icons/ai'
import { useContext, useEffect, useState } from 'react'
import { FaRegHeart, FaHeart } from "react-icons/fa";
import "./MovieCard.css"
import { AuthContext } from '../../context/AuthContext'
import { likeAMovie } from '../../services/MoviesService'
interface IMovieCardProps {
  movie: IMovie
}

export default function MovieCard(props: IMovieCardProps) {

  const [like, setLike] = useState<boolean>()
  const auth = useContext(AuthContext)
  const { movie } = props
  const myId = auth?.userDetails?._id
  let location = useLocation()

  useEffect(() => {
    if (myId)
      if (movie.likes?.includes(myId))
        setLike(true)
      else
        setLike(false)
  }, [myId])

  const navigate = useNavigate()

  const goToMovieDetails = (movieId: string | undefined) => {
    navigate(`/movie/${movieId}`, { state: { cardId: movieId } })
  }

  async function toggleLike(): Promise<void> {
    const response = await likeAMovie(movie._id!)
    if (response.result?.success)
      if (like)
        movie.likes = movie.likes?.filter(id => id !== myId)
      else
        movie.likes?.push(myId!)
    setLike(!like)
    navigate(0);
  }

  return (

    <Col key={movie._id} className='MovieCard'>
      <Card className="text-center">
        <Card.Header style={{ fontWeight: '500' }}>
          <div className='header'>
            {movie.title}
            {
              auth?.userDetails && <>{
                like ?
                  <FaHeart className='icon' color='red' onClick={toggleLike} />
                  :
                  <FaRegHeart className='icon' onClick={toggleLike} />
              }</>
            }
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Img variant="top" src={movie.image.url} style={{ height: '200px', width: "auto", objectFit: 'cover' }} />
          <Card.Text>
            {movie.summary}
          </Card.Text>
          {!location.pathname.includes("movie/") && <Button variant="primary" size='sm' onClick={() => goToMovieDetails(movie?._id)}>Go to Movie</Button>}
        </Card.Body>
        <Card.Footer className="text-muted">
          <AiOutlineLike size={18} style={{ marginTop: '-5px' }} />
          <span className='px-2'>{movie.likes?.length} {movie.likes?.length && movie.likes.length > 1 ? 'likes' : 'like'}</span>
        </Card.Footer>
      </Card>
    </Col>

  )
}
