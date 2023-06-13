import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardText, Button } from 'reactstrap'
import placeholder from '../../../assets/images/avatars/avatar-blank.png'


const  User =({setShowForm,userObj,editUser})=> {
 
  return (
    <div>
<Card>
    <CardBody>
        <div className='d-flex text-capitalize'>
        <div className='me-25'>
              <img className='rounded me-50' src={placeholder} alt='Generic placeholder image' height='100' width='100' />
            </div>
            <div className='mx-2 d-flex'>
                <div>
                <CardText>
            Username :
        </CardText>
        <CardText>
            Phone :
        </CardText>
        <CardText>
            Email :
        </CardText>
                </div>
                <div className='mx-2'>
                <CardText>
           {userObj?.username}
        </CardText>
        <CardText>
           {userObj?.phone}
        </CardText>
        <CardText>
           {userObj?.email}
        </CardText>
                </div>
            
            </div>
        </div>
        <div className='float-right ' style={{float:'right'}}>
            <Button className='btn btn-primary' type='button' color='primary' onClick={()=>{
                editUser();
                setShowForm(true);
            }}> Edit</Button>
        </div>
    </CardBody>
</Card>

    </div>
  )
}

export default User