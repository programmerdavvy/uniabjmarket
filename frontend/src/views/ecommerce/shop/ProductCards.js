// ** React Imports
import { useState } from 'react'
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { Star, ShoppingCart, Heart, User } from 'react-feather'
import Avatar from '@components/avatar'
import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png'

// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Badge } from 'reactstrap'

const ProductCards = props => {
  // ** Props
  const {
    products,
    activeView
  } = props
  const [userData] = useState(null)

  const userAvatar = (userData && userData.avatar) || defaultAvatar
  // ** Renders products
  const renderProducts = () => {
    if (products.length) {
      return products?.map(item => {
        return (
          <Card className='ecommerce-card' key={item._id}>
            <div className='item-img text-center mx-auto'>
              <Link to={`/ecommerce/product-detail/${item._id}`}>
                <img className='img-fluid card-img-top' src={item.image} alt={item.title} />
              </Link>
            </div>
            <CardBody>
              <div className='item-wrapper'>
                <div className='item-rating'>
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
                <div className='item-cost'>
                  <h6 className='item-price'>${item.price}</h6>
                </div>
              </div>
              <h6 className='item-name'>
                <Link className='text-body' to={`/ecommerce/product-detail/${item._id}`}>
                  {item.title}
                </Link>
                <CardText tag='span' className='item-company'>
                  By{' '}
                  <a className='company-name' href='/' onClick={e => e.preventDefault()}>
                    {item.brand}
                  </a>
                </CardText>
              </h6>
              <CardText className='item-description'>{item.description}</CardText>
            </CardBody>
            <div className='item-options text-center'>
              <div className='item-wrapper'>
                <div className='item-cost'>
                  <h4 className='item-price'>${item.price}</h4>
                  {item.hasFreeShipping ? (
                    <CardText className='shipping'>
                      <Badge color='light-success'>Free Shipping</Badge>
                    </CardText>
                  ) : null}
                </div>
              </div>
              <div className='d-flex p-1 align-items-center '>
                <Avatar img={userAvatar} imgHeight='30' imgWidth='30'  />
                <div className='user-nav d-sm-flex d-none mx-1'>
                  <span className='user-name fw-bold'>{item.user?.username}</span>
                </div>
              </div>
            </div>
          </Card>
        )
      })
    }
  }

  return (
    <div
      className={classnames({
        'grid-view': activeView === 'grid',
        'list-view': activeView === 'list'
      })}
    >
      {renderProducts()}
    </div>
  )
}

export default ProductCards
