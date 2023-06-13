// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col, Input,Card, CardBody ,Button} from 'reactstrap'
import UserDetials from './user'
// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { Target } from 'react-feather'
import { useSelector } from 'react-redux'
// ** Styles
import '@styles/react/apps/app-users.scss'
import { useState,useEffect } from 'react'
import SSRStorage from '../../../services/storage'
import { USER_COOKIE } from '../../../services/constants'
import { request } from '../../../services/utilities'


const UsersList = () => {
  const store = useSelector(state => state);
  const [showForm,setShowForm] = useState(false);
  const [username,setUsername] = useState('')
  const [phone,setPhone] = useState('')
  const [email,setEmail] = useState('')
  const [userObj,setUserObj] = useState(null)
  const [userId,setUserId] = useState('')

  const fetchLoogedUser = async () =>{
      const user = await (new SSRStorage()).getItem(USER_COOKIE);
      setUserObj(user)
  }

  const updateUser = async ()=>{
    const data = {username,phone,email};
    const url = `users/${userId}`;
    try{
      const rs = await request(url,'PUT',false,data);
      if(rs.status === 'ok'){
        (new SSRStorage()).setItem(USER_COOKIE, {...data, _id:userId})
        setUserObj(data);
        setShowForm(false);
      }
    }catch(err){
      console.log(err)
    }

  }

  useEffect(()=>{
    fetchLoogedUser();
  },[])

  const editUser =async ()=>{
      const user = await (new SSRStorage()).getItem(USER_COOKIE);
      setUsername(user.username);
      setPhone(user.phone);
      setEmail(user.email);
      setUserId(user._id)
  }
  return (
    <div className='app-user-list'>
      <Row>
        <Col lg='6' sm='6' >
          <StatsHorizontal
            color='primary'
            statTitle='Total Products'
            icon={<Target size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{store.products.products.length}</h3>}
          />
        {showForm &&(
            <div>
            <Card>
              <CardBody>
              <Input placeholder='username' className='form-element' value={username} onChange={e=>setUsername(e.target.value)}/>
            <Input placeholder='phone' type='number' value={phone}  className='form-element mt-1'  onChange={e=>setPhone(e.target.value)}/>
            <Input placeholder='email' type='email' className='form-element mt-1' value={email} onChange={e=>setEmail(e.target.value)}/>
            <div>
            <Button color='primary' className='mt-2' style={{float:'right'}} type='button' onClick={updateUser}>Update</Button>
            <Button color='secondary' className='mt-2 mx-2' style={{float:'right'}} type='button' onClick={()=> {
                  setUsername('');
                  setPhone('');
                  setEmail('');
                  setUserId('')
                  setShowForm(false)
            }}>Cancel</Button>

            </div>
              </CardBody>
          

            </Card>
          </div>
        )}
        </Col>
        <Col>
        <UserDetials setShowForm={setShowForm} userObj={userObj} editUser={editUser}/>
        </Col>
      </Row>
      <Table store={store.products} loggedUser={store.users} />
    </div>
  )
}

export default UsersList
