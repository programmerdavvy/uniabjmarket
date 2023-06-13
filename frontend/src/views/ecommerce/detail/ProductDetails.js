// ** React Imports
import { useState } from 'react'
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { Star, ShoppingCart, DollarSign, Phone, Share2, Facebook, Twitter, Youtube, Instagram } from 'react-feather'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Button,
  CardText,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap'

const Product = props => {
  // ** Props
  const { data, deleteWishlistItem, dispatch, addToWishlist, getProduct, productId, addToCart } = props

  // ** State
  const [selectedColor, setSelectedColor] = useState('primary')

  // ** Renders seller info
  const renderSellerDetails = () => {
      return (
        <div>
          <CardText>
            Username: {data?.user?.username}
          </CardText>
          <CardText>
            Phone Number: +234{data?.user?.phone}
          </CardText>
          <CardText>
            Location: Uni Abuja
          </CardText>

        </div>
      )
  }


  const isInCart = true
  // ** Condition btn tag
  const CartBtnTag = isInCart ? Link : 'button'

  return (
    <Row className='my-2'>
      <Col className='d-flex align-items-center justify-content-center mb-2 mb-md-0' md='5' xs='12'>
        <div className='d-flex align-items-center justify-content-center'>
          <img className='img-fluid product-img' src={data?.image} alt={data?.title} />
        </div>
      </Col>
      <Col md='7' xs='12'>
        <h4>{data?.title}</h4>
        <CardText tag='span' className='item-company'>
          
          <a className='company-name' href='/' onClick={e => e.preventDefault()}>
            {/* {data.brand} */}
          </a>
        </CardText>
        <div className='ecommerce-details-price d-flex flex-wrap'>
          <h4 className='item-price me-1'>${data?.price}</h4>
          <ul className='unstyled-list list-inline'>
            {new Array(5).fill().map((listItem, index) => {
              return (
                <li key={index} className='ratings-list-item me-25'>
                  <Star
                    className={classnames({
                      'filled-star': index + 1 <= 4,
                      'unfilled-star': index + 1 > 4
                    })}
                  />
                </li>
              )
            })}
          </ul>
        </div>
        <CardText>
          Available -<span className='text-success ms-25'>In stock</span>
        </CardText>
        <CardText>{data?.description}</CardText>
        <hr />
        <div className='product-color-options'>
          <h6>Seller Contact </h6>
          <ul className='list-unstyled mb-0'>{renderSellerDetails()}</ul>
        </div>
        <hr />
        <div className='d-flex flex-column flex-sm-row pt-1'>
          <a
            tag={CartBtnTag}
            className=' btn btn-primary btn-cart me-0 me-sm-1 mb-1 mb-sm-0'
            color='primary'
            href={`tel:=234${data?.user?.phone}`}
          >
            <Phone className='me-50' size={14} />
            {isInCart ? 'Contact seller' : 'Contact seller'}
          </a>

          <UncontrolledButtonDropdown className='dropdown-icon-wrapper btn-share'>
            <DropdownToggle className='btn-icon hide-arrow' color='secondary' caret outline>
              <Share2 size={14} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                <Facebook size={14} />
              </DropdownItem>
              <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                <Twitter size={14} />
              </DropdownItem>
              <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                <Youtube size={14} />
              </DropdownItem>
              <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                <Instagram size={14} />
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </div>
      </Col>
    </Row>
  )
}

export default Product
