// ** React Imports
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
// import { isUserLoggedIn } from '@utils'
// ** Third Party Components
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png'
import SSRStorage from '../../../../services/storage'
import { USER_COOKIE } from '../../../../services/constants'
import { activeUser } from '../../../../services/utilities'
const storage = new SSRStorage()
const UserDropdown = ({ activeUser }) => {
  const history = useHistory()
  // ** State
  const [userData] = useState(null)
  const logOut = () => {
    storage.removeItem(USER_COOKIE)
    history.push('/login')
  }
  //** ComponentDidMount
  // useEffect(() => {
  //   if (isUserLoggedIn() !== null) {
  //     setUserData(JSON.parse(localStorage.getItem('userData')))
  //   }
  // }, [])

  //** Vars
  const userAvatar = (userData && userData.avatar) || defaultAvatar

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none text-capitalize'>
          <span className='user-name fw-bold'>{(activeUser && activeUser?.username) || 'John Doe'}</span>
          {/* <span className='user-status'>{(activeUser && activeUser?.userType)}</span> */}
        </div>
        <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem onClick={e => e.preventDefault()}>
          <Link to={activeUser?.userType === 'admin' ? '/user/list' : '/products/list'}>
            <User size={14} className='me-75' />
            <span className='align-middle'>Profile</span>
          </Link>
        </DropdownItem>
        <DropdownItem tag={Link} onClick={() => logOut()}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
