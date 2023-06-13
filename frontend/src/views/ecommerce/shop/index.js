// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Shop Components
import Sidebar from './Sidebar'
import Products from './Products'

// ** Custom Components
// import Breadcrumbs from '@components/breadcrumbs'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, getProducts, getCartItems, addToWishlist, deleteCartItem, deleteWishlistItem } from '../store'

// ** Styles
import '@styles/react/apps/app-ecommerce.scss'
import { request } from '../../../services/utilities'

const Shop = () => {
  // ** States
  const [activeView, setActiveView] = useState('grid')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [categories, setCategories] = useState([])
  // ** Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)

  // console.log(store)


  // GET CATEGORIES
  const fetchCategories = async () => {
    try {
      const url = 'category'
      const rs = await request(url, 'GET', false)
      setCategories(rs)
    } catch (err) { 
      console.log(err)
    }
  }
  // ** Get products 
  useEffect(() => {
    fetchCategories()
    dispatch(
      getProducts({
        q: '',
        perPage: 9,
        page: 1,
        categoryId:''
      })
    )
  }, [dispatch])

  return (
    <Fragment>
      {/* <Breadcrumbs breadCrumbTitle='Shop'  breadCrumbActive='Shop' /> */}
      <Products
        store={store}
        dispatch={dispatch}
        addToCart={addToCart}
        activeView={activeView}
        getProducts={getProducts}
        sidebarOpen={sidebarOpen}
        getCartItems={getCartItems}
        setActiveView={setActiveView}
        addToWishlist={addToWishlist}
        setSidebarOpen={setSidebarOpen}
        deleteCartItem={deleteCartItem}
        deleteWishlistItem={deleteWishlistItem}
      />
      <Sidebar sidebarOpen={sidebarOpen} categories={categories} />
    </Fragment>
  )
}
export default Shop
