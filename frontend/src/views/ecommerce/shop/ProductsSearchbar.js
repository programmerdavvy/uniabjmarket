// ** Icons Imports
import { Search } from 'react-feather'

// ** Reactstrap Imports
import { Row, Col, InputGroup, Input, InputGroupText } from 'reactstrap'

const ProductsSearchbar = props => {
  // ** Props
  const { dispatch, getProducts, store } = props


  const searchProducts = (e) =>{
  let search = e;  let products = store.products;
  let filteredArray = [];

  //find products name from array
  for (let i = 0; i < products.length; i++) {
      if (products[i].title.toLowerCase().includes(search) || products[i].title.toUpperCase().includes(search)){
        filteredArray.push(products[i]);
      }
          else{
            // filteredArray = [];
          }
  }

  //set filtered items to state
  // this.setState({ recentChatList: filteredArray })
  if (search === "") filteredArray = [];

  dispatch(getProducts({ ...store.params, q: e, filteredArray:filteredArray }))

  // dispatch(getProducts(getState().ecommerce.products));
  //if input value is blanck then assign whole recent chatlist to array
}
  return (
    <div id='ecommerce-searchbar' className='ecommerce-searchbar'>
      <Row className='mt-1'>
        <Col sm='12'>
          <InputGroup className='input-group-merge'>
            <Input
              className='search-product'
              placeholder='Search Product'
              onChange={e=>searchProducts(e.target.value)}
            />
            <InputGroupText>
              <Search className='text-muted' size={14} />
            </InputGroupText>
          </InputGroup>
        </Col>
      </Row>
    </div>
  )
}

export default ProductsSearchbar
