import './UserProfile.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Button } from 'react-bootstrap'
import Restricted from '../../components/Restricted/Restricted'
import { useNavigate } from 'react-router-dom'

export default function UserProfile() {

  const auth = useContext(AuthContext)
  const navigate = useNavigate();

  return (
    <div className='UserProfile Page'>
      <h3>User Profile</h3>
      <br></br>

      <Restricted allowedRoles={['user', 'business', 'admin']} action='message'>
        <div className='py-3'>
          <div><b>Email:</b> {auth?.userDetails?.email}</div>
          <div><b>Name:</b> {auth?.userDetails?.name.first} {auth?.userDetails?.name.middle} {auth?.userDetails?.name.last}</div>
          <img className='py-4' style={{ width: '100px' }} src={auth?.userDetails?.image.url} alt={auth?.userDetails?.image.alt} />
        </div>
        <div className='edit'>
          <Button type='button' size='sm' onClick={()=>navigate("/edit-profile")}>Edit my profile</Button>
        </div>
        <div>
          <Button type='button' variant='danger' size='sm' onClick={() => auth?.signOut()}>Sign Out</Button>
        </div>
      </Restricted>
    </div>
  )
}
