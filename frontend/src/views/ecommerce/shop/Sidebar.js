// ** Custom Hooks
// ** Third Party Components
import classnames from 'classnames'
import { Star } from 'react-feather'
import Nouislider from 'nouislider-react'
import { useEffect, useState } from 'react'
// ** Reactstrap Imports
import { Card, CardBody, Row, Col, Input, Button, Label } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { getProducts, getProductsByCategory } from '../store'
// ** Styles
import '@styles/react/libs/noui-slider/noui-slider.scss'

const Sidebar = props => {
  // ** Props
  const { sidebarOpen } = props
  const [categoryId] = useState(null)
  const dispatch = useDispatch()

  const filterByCategory = id => {
    if (id === '641f56374bdfffe274fba9e6') {
      dispatch(
        getProducts({
          q: '',
          perPage: 9,
          page: 1,
          categoryId: ''

        })
      )
    } else {
      dispatch(
        getProducts({
          q: '',
          perPage: 9,
          page: 1,
          categoryId: id
        })
      )
    }

  }

  return (
    <div className='sidebar-detached sidebar-left'>
      <div className='sidebar'>
        <div
          className={classnames('sidebar-shop', {
            show: sidebarOpen
          })}
        >
          <Row>
            <Col sm='12'>
              <h6 className='filter-heading d-none d-lg-block'>Filters</h6>
            </Col>
          </Row>
          <Card>
            <CardBody>
              <div id='product-categories'>
                <h6 className='filter-title'>Categories</h6>
                <ul className='list-unstyled categories-list'>
                  {props.categories?.map(category => {
                    return (
                      <li key={category._id}>
                        <div className='form-check'>
                          <Input
                            type='radio'
                            id={category._id}
                            name='category-radio'
                            defaultChecked={category.defaultChecked}
                            onChange={() => filterByCategory(category._id)}
                          />
                          <Label className='form-check-label' for={category._id}>
                            {category.name}
                          </Label>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
