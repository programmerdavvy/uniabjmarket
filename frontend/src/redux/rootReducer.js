// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import ecommerce from '@src/views/ecommerce/store'
import products from '@src/views/products/store'

import users from '@src/views/user/store'

const rootReducer = {
  auth,
  navbar,
  layout,
  users,
  ecommerce,
  products
}

export default rootReducer
