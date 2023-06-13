
// ** Custom Components
import Sidebar from '@components/sidebar'

import { useForm, Controller } from 'react-hook-form'
import { Button, Label, FormText, Form, Input,CardText } from 'reactstrap'
import { request } from '../../../services/utilities'
// ** Store & Actions
import { getAllData } from '../store'
import { useDispatch } from 'react-redux'
import { useState } from 'react'


// const checkIsValid = data => {
//   return Object.values(data).every(field => (typeof field === 'object' ? field !== null : field.length > 0))
// }

const SidebarNewUsers = ({ open, toggleSidebar,username,setUsername,phone,setPhone,email,setEmail,password,setPassword,editmode,setEditmode, 
                          setUserId,userId
}) => {
 
  const dispatch = useDispatch()
  const [data,setData] = useState('');
  const [msg,setMsg] = useState('');

  // ** Vars
  const defaultValues = {
    // email,
    password,
    phone,
    username
  }

  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** Function to handle form submit
  const onSubmit = data => {
      setData(data)
    if (data.username !== '' && data.phone !== '' && data.password !== '') {
        addNewUser(data)
    } else {
      for (const key in data) {
        
        if (data[key] === null) {
          setError('country', {
            type: 'manual'
          })
        }
        if (data[key] !== null && data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }
const addNewUser = async (data)=>{
const dataObj = {
  // email: data.email,
  password: data.password,
  phone: data.phone,
  username: data.username,
  userType:'user'
};
const url = 'register';
const url_update = `users/${userId}`

try{
  const rs = await request(editmode !== true? url:url_update, editmode !== true?'POST':"PUT",false,dataObj);
  if(rs.status === 'ok'){
    dispatch(getAllData()); 
    toggleSidebar();  
  }else{setMsg(rs.error)}
}catch(err){
  setMsg(err.message)
  console.log(err);
}
}
  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '')
    }
    setUsername('');
    setPassword('');
    setPhone('');
    setEmail('')
    setEditmode(false)
    setUserId('')
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='New User'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
      {msg && <CardText className='p-1 text-center text-white bg-danger'>{msg}</CardText>}

        <div className='mb-1'>
          <Label className='form-label' for='username'>
            Username <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='username'
            control={control}
            render={({ field }) => (
              <Input id='username' placeholder='John Doe' invalid={errors.username && true} {...field} />
            )}
          />
        </div>
        {/* <div className='mb-1'>
          <Label className='form-label' for='email'>
            Email <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <Input
                type='email'
                id='email'
                placeholder='john.doe@example.com'
                invalid={errors.email && true}
                {...field}
              />
            )}
          />
          <FormText color='muted'>You can use letters, numbers & periods</FormText>
        </div> */}

        <div className='mb-1'>
          <Label className='form-label' for='phone'>
            Phone <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='phone'
            control={control}
            render={({ field }) => (
              <Input id='phone' placeholder='(397) 294-5153' type='number' invalid={errors.phone && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='password'>
            Password <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <Input id='password' type='password'  invalid={errors.password && true} {...field} />
            )}
          />
        </div>
      
        
        <Button type='submit' className='me-1' color='primary'>
          Submit
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewUsers
