import './Movie.css'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { CiEdit, CiTrash } from 'react-icons/ci'
import { IMovie } from '../../interfaces/MovieInterfaces'
import { deleteMovie, getMovieById } from '../../services/MoviesService'
import { AuthContext } from '../../context/AuthContext'
import { ToastsContext } from '../../context/ToastsContext'
import MovieCard from '../../components/MovieCard/MovieCard'
import Reviews from '../../components/Reviews/Reviews'
import { IoMdAdd } from "react-icons/io";
import { shcemaIReveiew } from '../../schemas/IReviewSchema'
import { writeReview } from '../../services/ReviewService'

export default function Movie() {

    const { id } = useParams()
    const [show, setShow] = useState(false);
    const [movie, setMovie] = useState<IMovie | null>(null)
    const [error, setError] = useState<string | null>(null)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const auth = useContext(AuthContext)
    const toasts = useContext(ToastsContext)
    const navigate = useNavigate();
    const [isBusy, setIsBusy] = useState<boolean>(false);

    useEffect(() => {
        const loadMovie = async () => {
            const result = await getMovieById(id!)
            if (result.result) {
                setMovie(result.result)
                setFormData({ ...formData, movieId: result.result._id })
            }
            else
                setError(result.error)
        }
        loadMovie();
    }, [])

    const [formData, setFormData] = useState<{ movieId?: string, rating: number, text: string }>(
        {
            movieId: movie?._id,
            rating: 1,
            text: "",
        }
    )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsBusy(true)
        // validate the form input against 'joi' schema.
        // we add 'confirmPassword' to the object we sent for validation, so that joi can validate it too.
        // { abortEarly:true} means that not all errors will be shown at once, but rather one at a time.
        // also notice that we are destructuring {error} as 'joiError', that's because we already have a const with the same name down the line.
        const { error: joiError } = shcemaIReveiew.validate({ ...formData }, { abortEarly: true })
        // if we get errors- let's show a toast.
        if (joiError) {
            // Handle validation errors
            const validationMessages = joiError.details.map(detail => detail.message)
            toasts?.addToast('⚠️', 'Validation Error', validationMessages.join(', '), 'danger')
            setIsBusy(false)
            return
        }
        // make sure 'auth' is not undefined
        if (!auth) { setIsBusy(false); return }
        // try to signup
        const { error } = await writeReview(formData)
        // error or success
        if (error) {
            toasts?.addToast('⚠️', 'Error post review', error, 'danger')
        } else {
            toasts?.addToast('👍🏼', 'Successfully post', 'success')
            navigate(0);
            handleClose();
        }
        setIsBusy(false)
    }

    async function deleteThisMovie(): Promise<void> {
        const result = await deleteMovie(movie?._id!);
        if (result.result) {
            toasts?.addToast('👍🏼', 'Successfully deleted', ``, 'success')
            navigate("/")
        } else
            toasts?.addToast('⚠️', 'Error deleted', result.error ?? "error", 'danger')
    }

    return (
        <div className='Movie'>
            <h3>Movie Page</h3>
            <br></br>
            <div>
                {
                    (error) &&
                    <>
                        <h5>Error getting card '{id}' :</h5>
                        <div style={{ color: 'red' }}>{error}</div>
                    </>
                }
            </div>
            {
                (movie) ?
                    <Container className='container'>
                        <Row className="g-5">
                            <Col>
                                <MovieCard movie={movie} />
                            </Col>


                        </Row>
                        <Row className="g-5">
                            <Col>
                                <Card className="text-center">
                                    <Card.Body>
                                        <h3>Genre: {movie.genre}</h3>
                                        <h3>Year: {movie.releaseYear}</h3>
                                        <h3>Director: {movie.director}</h3>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <div className='reviews'>
                                <h3>Reviews</h3>
                                {auth?.userDetails && !movie.reviews?.some(review => review.userId === auth?.userDetails?._id) && <IoMdAdd className='icon' size={28} onClick={handleShow} />}
                            </div>
                            {<Reviews reviews={movie.reviews!} movie={movie} />}
                        </Row>
                        {auth?.userDetails && (auth?.userDetails?._id === movie.creator || auth?.userDetails?.isAdmin) &&
                            <Row>
                                <Col>
                                    <div>
                                        <Button variant="primary" size='sm' className='mx-3' onClick={() => navigate(`/edit-movie/${movie._id}`)}><CiEdit className='me-1' size={22} style={{ marginTop: '-5px' }} />Edit movie</Button>
                                        <Button variant="danger" size='sm' className='mx-3' onClick={deleteThisMovie}><CiTrash className='me-1' size={22} style={{ marginTop: '-5px' }} />Delete Card</Button>
                                    </div>
                                </Col>
                            </Row>
                        }
                    </Container>
                    :
                    null
            }
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Write review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Rating</Form.Label>
                            <Form.Select aria-label="Rating" onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })} defaultValue={"1"}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Write review</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={(e) => setFormData({ ...formData, text: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" disabled={isBusy} onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
