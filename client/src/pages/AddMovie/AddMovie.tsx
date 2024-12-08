import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ToastsContext } from "../../context/ToastsContext";
import { useNavigate } from "react-router-dom";
import { IMovie } from "../../interfaces/MovieInterfaces";
import { shcemaIMovieCreate } from "../../schemas/IMovieSchema";
import { createMovie } from "../../services/MoviesService";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";

export default function AddMovie() {

    const auth = useContext(AuthContext);
    const toasts = useContext(ToastsContext)
    const navigate = useNavigate();

    // a state object to hold the form values
    const [formData, setFormData] = useState<IMovie>(
        {
            title: "",
            summary: "",
            genre: "",
            releaseYear: 0,
            director: "",
            image: {
                url: "",
                alt: "",
            },
        }
    )
    // an indication whether we are busy (waiting for server's response)
    const [isBusy, setIsBusy] = useState<boolean>(false);


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

            const updatedState = { ...prevState };
            updateNestedObject(updatedState, keys, updatedValue);

            return updatedState;
        });
    };

    // a function to handle the form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsBusy(true)
        const { error: joiError } = shcemaIMovieCreate.validate({ ...formData }, { abortEarly: true })
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
        const { error } = await createMovie(formData);
        // error or success
        if (error) {
            toasts?.addToast('⚠️', 'Error Adding movie', error, 'danger')
        } else {
            toasts?.addToast('👍🏼', 'Movie added successfully', 'success')
            navigate('/')
        }
        setIsBusy(false)
    }

    return (
        <div className='SignUp Page'>
            <h3>Sign-Up Page</h3>
            <br></br>

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
            </Container>

        </div>
    )
}
