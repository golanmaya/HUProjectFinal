import { useNavigate } from "react-router-dom";
import { ToastsContext } from "../../context/ToastsContext";
import { useContext, useEffect, useState } from "react";
import { IUserEdit } from "../../interfaces/UserInterfaces";
import "./EditProfile.css"
import { shcemaIUserEdit } from "../../schemas/IUserSchemas";
import { updateUser } from "../../services/UserService";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";

export default function EditProfile() {
  const auth = useContext(AuthContext);
  const toasts = useContext(ToastsContext)
  const navigate = useNavigate();
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const [formData, setFormData] = useState<IUserEdit>(
    {
      _id: "",
      image: {
        url: "",
        alt: "",
      },
      name: {
        first: "",
        last: "",
      }
    }
  )

  useEffect(() => {
    if (auth?.userDetails){
      delete auth.userDetails.name.middle;
      delete auth.userDetails.name._id;
      delete auth.userDetails.image._id;
      setFormData({ _id: auth.userDetails?._id, name: auth.userDetails.name, image: auth.userDetails.image})
    }
  }, [auth?.userDetails])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBusy(true)
    // validate the form input against 'joi' schema.
    // we add 'confirmPassword' to the object we sent for validation, so that joi can validate it too.
    // { abortEarly:true} means that not all errors will be shown at once, but rather one at a time.
    // also notice that we are destructuring {error} as 'joiError', that's because we already have a const with the same name down the line.
    const { error: joiError } = shcemaIUserEdit.validate({ ...formData }, { abortEarly: true })
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
    setFormData({ ...formData, _id: auth.userDetails?._id! })
    const { error } = await updateUser(formData)
    // error or success
    if (error) {
      toasts?.addToast('⚠️', 'Error Signing-Up', error, 'danger')
    } else {
      toasts?.addToast('👍🏼', 'Successfully Signed-Up', `Please sign in with your credentials.`, 'success')
      navigate('/user')
    }
    setIsBusy(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
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

      if (type === 'number') {
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

  return (
    <Container className="EditProfile">
      <Form onSubmit={handleSubmit}>

        {/* Full Name -------------------------------------------------- */}

        <Row className="mb-4 fw-bold">
          <Form.Group as={Col}>
            <Form.Label>Name</Form.Label>
            <Form.Control name="name.first" value={formData.name?.first} placeholder="First name" onChange={handleChange} type="text" />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>&nbsp;</Form.Label>
            <Form.Control name="name.last" value={formData.name?.last} placeholder="Last name" onChange={handleChange} type="text" />
          </Form.Group>
        </Row>
        {/* Profile Picture ------------------------------------------- */}
        <Row className="mb-4 fw-bold">
          <Form.Group>
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control name="image.url" value={formData.image?.url} placeholder="Image URL" onChange={handleChange} type="text" />
          </Form.Group>
        </Row>

        {/* Submit ---------------------------------------------------- */}

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
    </Container>
  )
}

