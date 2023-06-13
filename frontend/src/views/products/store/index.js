// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { API_URI } from '../../../services/constants'

export const getAllProduct = createAsyncThunk('appEcommerce/getAllProduct', async params => {
  const response = await axios.get(`${API_URI}/products?userId=${params.userId}`)
  return response.data
})
export const getProducts = createAsyncThunk('appEcommerce/getProducts', async params => {
  try {
    const response = await axios.get(`${API_URI}/products?q=${params.q}&categoryId=${params.categoryId}&userId=${params.userId}&page=1&perPage=9`)
    return { params, data: response.data }
  } catch (err) {
    console.log(err);
  }
})
export const getCategory = createAsyncThunk('appEcommerce/getCategory', async () => {
  const response = await axios.get(`${API_URI}/category`)
  let res = response.data.map((e) => {
    let x = { value: e._id, label: e.name }
    return x;
  })
  return res;
})
export const getProduct = createAsyncThunk('appEcommerce/getProduct', async id => {
  try {
    const response = await axios.get(`${API_URI}/products/${id}`)
    return { product: response.data }
  } catch (err) {
    console.log(err);
  }
})

export const deleteProduct = createAsyncThunk('appEcommerce/deleteProductItem', async (id) => {
  const response =  await axios.delete(`${API_URI}/products/${id}`)
  return response.data
})


export const addToCart = createAsyncThunk('appEcommerce/addToCart', async (id, { dispatch, getState }) => {
  const response = await axios.post('/ecommerce/cart', { productId: id })
  await dispatch(getProducts(getState().ecommerce.params))
  return response.data
})

export const getWishlistItems = createAsyncThunk('appEcommerce/getWishlistItems', async () => {
  const response = await axios.get('/ecommerce/wishlist')
  return response.data
})

export const deleteWishlistItem = createAsyncThunk('appEcommerce/deleteWishlistItem', async (id, { dispatch }) => {
  const response = await axios.delete(`/ecommerce/wishlist/${id}`)
  dispatch(getWishlistItems())
  return response.data
})

export const getCartItems = createAsyncThunk('appEcommerce/getCartItems', async () => {
  const response = await axios.get('/ecommerce/cart')
  return response.data
})



export const addToWishlist = createAsyncThunk('appEcommerce/addToWishlist', async id => {
  await axios.post('/ecommerce/wishlist', { productId: id })
  return id
})

export const deleteCartItem = createAsyncThunk('appEcommerce/deleteCartItem', async (id, { dispatch }) => {
  await axios.delete(`/ecommerce/cart/${id}`)
  dispatch(getCartItems())
  return id
})

export const appEcommerceSlice = createSlice({
  name: 'appEcommerce',
  initialState: {
    cart: [],
    params: {},
    products: [],
    wishlist: [],
    allProduct: [],
    allCategory: [],
    category: [],
    totalProducts: 0,
    productDetail: {},


  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.params = action.payload.params
        state.products = action.payload.data
        state.totalProducts = action.payload.data.length
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.allProduct = action.payload
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.allCategory = action.payload
      })
      .addCase(getWishlistItems.fulfilled, (state, action) => {
        state.wishlist = action.payload.products
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cart = action.payload.products
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.productDetail = action.payload.product
      })
  }
})

export default appEcommerceSlice.reducer
