import { Accordion, AccordionButton, Button, Container, Form, Modal } from "react-bootstrap"
import { IReview } from "../../interfaces/ReviewInterfaces"
import "./Reviews.css"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { deleteReview, updateReview } from "../../services/ReviewService";
import { useNavigate } from "react-router-dom";
import { IMovie } from "../../interfaces/MovieInterfaces";
import { shcemaIReveiew } from "../../schemas/IReviewSchema";
import { ToastsContext } from "../../context/ToastsContext";

interface IReviewProps {
  reviews: IReview[],
  movie: IMovie,
}

export default function Reviews(props: IReviewProps) {
  const navigate = useNavigate();
  const { reviews, movie } = props;
  const auth = useContext(AuthContext)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const toasts = useContext(ToastsContext)
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [review, setReview] = useState<IReview>();
  const [formData, setFormData] = useState<IReview>(
    {
      movieId: movie?._id,
      rating: 0,
      text: "",
    }
  )

  const handleUpdate = async (e: React.FormEvent) => {
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
    const { error } = await updateReview({...formData, _id: review?._id})
    // error or success
    if (error) {
      toasts?.addToast('⚠️', 'Error update review', error, 'danger')
    } else {
      toasts?.addToast('👍🏼', 'Successfully updated', 'success')
      navigate(0);
      handleClose();
    }
    setIsBusy(false)
  }

  async function deleteReviewHandler(_id: string | undefined): Promise<void> {
    try {
      const response = await deleteReview(_id!);
      if (response.result?.success) {
        navigate(0)
      }
    } catch (error) {
      throw (error)
    }
  }

  return (
    <Container>
      <Accordion className="Reviews">
        {reviews.map((review, index) => <Accordion.Item key={review._id} eventKey={`${index}`} >
          <AccordionButton className={review.userId === auth?.userDetails?._id ? "my" : ""}>
            <div className="rev-header">
              <span>Rating: {review.rating}</span>
            </div>
          </AccordionButton>
          <Accordion.Body className="a_body">
            <p>
              {review.text}
            </p>
            <span>
              {new Date(review.date!).toLocaleDateString('he-IL', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            {auth?.userDetails && auth.userDetails._id === review.userId && <div className="icons">
              <AiOutlineDelete size={36} className="icon" onClick={() => deleteReviewHandler(review._id)} />
              <CiEdit size={36} className="icon" onClick={()=>{setReview(review), handleShow()}} />
            </div>}
          </Accordion.Body>
        </Accordion.Item>)}
      </Accordion>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Write review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Rating</Form.Label>
              <Form.Select aria-label="Rating" onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}>
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
          <Button variant="primary" disabled={isBusy} onClick={(handleUpdate)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

