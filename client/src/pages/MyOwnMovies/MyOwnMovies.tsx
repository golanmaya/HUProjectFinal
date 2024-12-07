import { useEffect, useState } from "react"
import { IMovie } from "../../interfaces/MovieInterfaces"
import { doGetMyMovies } from "../../services/MoviesService"
import MoviesGallery from "../../components/MoviesGallery/MoviesGallery"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import "./MyOwnMovies.css"
export default function MyOwnMovies() {

    const [movies, setMovies] = useState<IMovie[] | undefined>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)

    const navigate = useNavigate();

    useEffect(() => {
        const getMyMovies = async () => {
            const { error, result } = await doGetMyMovies()
            if (error) {
                setError(error)
            } else {
                setMovies(result)
            }
        }
        getMyMovies();
    }, [])

    return (
        <div className="MyOwnMovies">
            <h3>My Movies</h3>
            <br></br>

            <div>
                {(error) && <div>Error getting cards 😞 <br></br> {error}</div>}
            </div>
            {
                (movies) ?
                    <MoviesGallery movies={movies} />
                    :
                    (!error) && <LoadingSpinner animation='grow' variant='primary' />
            }
            <div className="add">
                <Button variant="primary" size='lg' onClick={() => navigate("/add-movie")}>Add a movie</Button>
            </div>
        </div>
    )
}
