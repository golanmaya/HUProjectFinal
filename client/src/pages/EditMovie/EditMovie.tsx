import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ToastsContext } from "../../context/ToastsContext";
import { useNavigate } from "react-router-dom";
import { IMovie } from "../../interfaces/MovieInterfaces";
import { shcemaIMovieCreate } from "../../schemas/IMovieSchema";
import { getMovieById, updateMovie } from "../../services/MoviesService";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useParams } from 'react-router-dom'

export default function EditMovie() {

    const auth = useContext(AuthContext);
    const toasts = useContext(ToastsContext)
    const navigate = useNavigate();
    const [movie, setMovie] = useState<IMovie>();
    const { id } = useParams()
    const [loaded, setLoaded] = useState<boolean>(false);
    const [formData, setFormData] = useState<IMovie>(movie!)
    useEffect(() => {
        const loadMovie = async () => {
            try {
                const response = await getMovieById(id!);
                if (response.result) {
                    setLoaded(true)
                    const newMovie: IMovie = {
                        _id: response.result._id,
                        genre: response.result.genre,
                        image: { url: response.result.image.url, alt: response.result.image.alt },
                        releaseYear: response.result.releaseYear,
                        summary: response.result.summary,
                        title: response.result.title,
                        director: response.result.director
                    }

                    setMovie(newMovie)
                    setFormData(newMovie);
                }
            }
            catch (error) {
                toasts?.addToast('⚠️', 'Error Editing movie', 'danger')
            }
        }
        loadMovie();
    }, [])



    // an indication whether we are busy (waiting for server's response)
    const [isBusy, setIsBusy] = useState<boolean>(false);

    /*
    a versatile function to sync form values to their corresponsing state object keys.
  
    Using it on a form input:
    ------------------------
    <input
      name="name.first"               ---> this should correspond to the specific key name in your state object (the example shows a nested key, but a first-level key like 'phone' would work too)
      value={formData.name.first}     ---> this is the actual key that holds the value in the state object
      placeholder="First name"        
      onChange={handleChange}         ---> the generic call to this function
      type="text"                     ---> important. the function currently supports only 'text','number' & 'checkbox', but it can be easily extended.
    />
    */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const keys = name.split('.');

        setFormData((prevState) => {
            // A utility function to safely update nested objects
            const updateNestedObject = (obj: any, path: string[], val: any): any => {
                const key = path[0];
                // If it's the last key, set the value
                if (path.length === 1) {
                    obj[key] = val;
                    return obj;
                }
                // If the next level doesn't exist, create it
                if (!obj[key] || typeof obj[key] !== 'object') obj[key] = {};
                // Recurse to the next level
                obj[key] = updateNestedObject(obj[key], path.slice(1), val);
                return obj;
            };

            // Determine the value based on the input type
            let updatedValue;
            if (type === 'checkbox') {
                updatedValue = checked; // For checkboxes, use the 'checked' property
            } else if (type === 'number') {
                updatedValue = Number(value); // Convert to number, but handle empty string gracefully
            } else {
                updatedValue = value; // Use the value directly for other input types
            }

            // Clone the current state to avoid direct mutations
            const updatedState = { ...prevState };
            // Update the nested object safely
            updateNestedObject(updatedState, keys, updatedValue);

            return updatedState;
        });
    };

    // a function to handle the form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsBusy(true)
        // validate the form input against 'joi' schema.
        // we add 'confirmPassword' to the object we sent for validation, so that joi can validate it too.
        // { abortEarly:true} means that not all errors will be shown at once, but rather one at a time.
        // also notice that we are destructuring {error} as 'joiError', that's because we already have a const with the same name down the line.
        const { error: joiError } = shcemaIMovieCreate.validate({ ...formData }, { abortEarly: true })
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
        const { error } = await updateMovie(formData);
        // error or success
        if (error) {
            toasts?.addToast('⚠️', 'Error Editing movie', error, 'danger')
        } else {
            toasts?.addToast('👍🏼', 'Movie Edited successfully', 'success')
            navigate('/')
        }
        setIsBusy(false)
    }

    return (
        <div className='SignUp Page'>
            <h3>Edit Movie Page</h3>
            <br></br>
            {loaded &&
                <Container>
                    <Row>
                        <Col></Col>
                        <Col xs="auto" className='border border-1 rounded-3 border-secondary-subtle p-5 text-start'>
                            <Form onSubmit={handleSubmit}>
                                <Row className="mb-4 fw-bold">
                                    <Form.Group as={Col}>
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control name="title" value={formData.title} placeholder="Title" onChange={handleChange} type="text" />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Director</Form.Label>
                                        <Form.Control name="director" value={formData.director} placeholder="Director" onChange={handleChange} type="text" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-4 fw-bold">
                                    <Form.Group as={Col}>
                                        <Form.Label>Summary</Form.Label>
                                        <Form.Control name="summary" value={formData.summary} placeholder="summary" onChange={handleChange} type="text" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-4 fw-bold">
                                    <Form.Group as={Col}>
                                        <Form.Label>Genre</Form.Label>
                                        <Form.Control name="genre" value={formData.genre} placeholder="Genre" onChange={handleChange} type="text" />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Release Year</Form.Label>
                                        <Form.Control name="releaseYear" value={formData.releaseYear} placeholder="Release Year" onChange={handleChange} type="text" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-4 fw-bold">
                                    <Form.Group>
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control name="image.url" value={formData.image.url} placeholder="Image URL" onChange={handleChange} type="text" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-4 fw-bold">
                                    <Form.Group>
                                        <Form.Label>Alt</Form.Label>
                                        <Form.Control name="image.alt" value={formData.image.alt} placeholder="Image alt" onChange={handleChange} type="text" />
                                    </Form.Group>
                                </Row>

                                <Row className="fw-bold border-bottom"></Row>

                                <Row>
                                    <Col></Col>
                                    <Col>
                                        <div className="text-center mt-5 d-grid">
                                            <Button type='submit' variant='primary' size='sm' disabled={isBusy}>
                                                {
                                                    (isBusy) &&
                                                    <Spinner
                                                        className='me-3'
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    />
                                                }
                                                Submit
                                            </Button>
                                        </div>
                                    </Col>
                                    <Col></Col>
                                </Row>

                                {/* ----------------------------------------------------------- */}

                            </Form>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>}

        </div>
    )
}
