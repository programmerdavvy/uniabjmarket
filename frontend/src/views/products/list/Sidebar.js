// ** React Import
import { useState, useEffect } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { selectThemeColors } from '@utils'
// ** Third Party Components
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input, Spinner } from 'reactstrap'

// ** Store & Actions
import {  getCategory ,getProducts} from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { request } from '../../../services/utilities'
import { Camera } from 'react-feather'
import axios from 'axios'



// import 

const checkIsValid = data => {
  return Object.values(data).every(field => (typeof field === 'object' ? field !== null : field.length > 0))
}

const SidebarNewUsers = ({ open, toggleSidebar, userId,title,price,description,categoryId,setCategoryId,image,setImage,
setTitle,setPrice,setDescription,  editmode,  setEditmode,setProductId,productId

}) => {
  // ** States
  const store = useSelector(state => state.products.allCategory)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [rawImg,setRawImg] = useState('');
  const [errmsg,setErrmsg] = useState('');
  // ** Store Vars
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategory())
  }, [dispatch])
// 
let defaultValues = {
  title,
  price,
  description
}
  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** Function to handle form submit
  const onSubmit = data => {
     if (data.title !== '' && data.price !== '' && data.description !== ''  && categoryId !== ''){
      if(rawImg === '' && image === ''){
       return setErrmsg('Kindly choose an image');
      }else{
        addProductAndUpdate(data)
      }
    }else{
      for (const key in data) {
      if (data[key] !== null && data[key].length === 0) {
        setError(key, {
          type: 'manual'
        })
      }
    }
  }
  }
const onChange = (e) =>{
let file = e[0];
setRawImg(file)
  if(file){
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("load", function(){
      setImage(this.result)
    })
  }
}
  const handleSidebarClosed = () => {
    setImage('')
    setCategoryId('')
    setTitle('')
    setPrice('')
    setDescription('')
    setProductId('')
    setEditmode(false)
    toggleSidebar()
  }
  const handleAddProduct = async(data,img)=>{
    
      const url = `product`
      const url_update = `products/${productId}`

      const dataObj = { title: data.title, description: data.description, image:img,
         category: categoryId?.value ? categoryId?.value : categoryId?._id, user:userId, price: data.price
         }
      try {
        const rs = await request(editmode !== true? url:url_update, editmode !== true?'POST':"PUT", false, dataObj)
        if(rs.status === 'ok'){
        setLoading(false);
        dispatch(getProducts({
          userId
        }));   
        handleSidebarClosed();         
        }
      } catch (err) {
        setLoading(false);
        console.log(err)
      }
  }
  const addProductAndUpdate = async (data) => {
    setLoading(true);
    const cloud_url = 'https://api.cloudinary.com/v1_1/doxlmaiuh/image/upload';
    const cloup_present = "uniabj"
    const file = rawImg;
    const formData = new FormData;
    formData.append("file",file);
    formData.append("upload_preset", cloup_present);
    try{
      if(rawImg){
        // const rs = await axios.post(cloud_url,formData);
        fetch(cloud_url,{
          method:'POST',
          body:formData
        })
        .then(res=>res.json())
        .then(rs=>{
          setImage(rs.secure_url);
           handleAddProduct(data,rs.secure_url);
        })
       
      }
      else{
       await handleAddProduct(data,image); 
      }
    }catch(err){
      console.log('error',err)
    }
    
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='New Product'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={handleSidebarClosed}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-1'>
          <Label className='form-label' for='title'>
            Title <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='title'
            control={control}
            render={({ field }) => (
              <Input id='title' placeholder='Title' value={title} invalid={errors.title && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <div className='d-flex justify-content-between align-items-center'>
         <div>
          {errmsg && <Label className='form-label bg-danger'style={{padding:'5px',borderRadius:'5px'}} for='image'>
             <span className='text-white'>{errmsg}</span>
          </Label>}
         
         </div>
          <div className=' pb-1' id='img-preview'>
          <Input id='choose-file' type='file' onChange={e=>onChange(e.target.files)} className='d-none' placeholder='image' accept='image/*' />
 
          <Label className='form-label btn btn-secondary ' style={{padding:'5px'}} for='choose-file'>
           choose image <Camera  size={20}/>
          </Label>
          </div>
          </div>

          <div>
            {image &&  <img src={image} className='img-thumbnail' alt='image' />}
           
          </div>
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='Category'>
            Category <span className='text-danger'>*</span>
          </Label>
          
              <Select
                isClearable={false}
                classNamePrefix='select'
                value={categoryId}
                options={store}
                theme={selectThemeColors}
              onChange={e=>setCategoryId(e)}
              />
           
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='price'>
            Price <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='price'
            control={control}
            render={({ field }) => (
              <Input
                type='number'
                id='price'
                placeholder='33.33'
                invalid={errors.price && true}
                {...field}
              />
            )}
          />
          {/* <FormText color='muted'>You can use letters, numbers & periods</FormText> */}
        </div>

        <div className='mb-1'>
          <Label className='form-label' for='description'>
            Description <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='description'
            control={control}
            render={({ field }) => (
              <Input id='description' type='textarea' placeholder='Description' invalid={errors.description && true} {...field} />
            )}
          />
        </div>

        <Button type='submit'  className='me-1' color='primary'>
          {editmode === true? "Update":"Save"}
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          Cancel
        </Button>
        {loading ? <Spinner color='primary' className='float-end' /> : ''}

      </Form>
    </Sidebar>
  )
}

export default SidebarNewUsers
