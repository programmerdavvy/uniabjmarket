// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Invoice List Sidebar
import Sidebar from './Sidebar'

// ** Table Columns
// import { columns } from './columns'

// ** Store & Actions 
import { getAllProduct, getProducts,deleteProduct } from '../store'
import { useDispatch } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy,Edit2,Trash2, Plus  } from 'react-feather'

// ** Utils
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'
import Avatar from '@components/avatar'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

// ** Table Header
const CustomHeader = ({ store, toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(store.allProduct[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }
  return (
    <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
      <Row>
        <Col xl='6' className='d-flex align-items-center p-0'>
          <div className='d-flex align-items-center w-100'>
            <label htmlFor='rows-per-page'>Show</label>
            <Input
              className='mx-50'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: '5rem' }}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </Input>
            <label htmlFor='rows-per-page'>Entries</label>
          </div>
        </Col>
        <Col
          xl='6'
          className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
        >
          <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
            <label className='mb-0' htmlFor='search-invoice'>
              Search:
            </label>
            <Input
              id='search-invoice'
              className='ms-50 w-100'
              type='text'
              value={searchTerm}
              onChange={e => handleFilter(e.target.value)}
            />
          </div>

          <div className='d-flex align-items-center table-header-actions'>
            <UncontrolledDropdown className='me-1'>
              <DropdownToggle color='secondary' caret outline>
                <Share className='font-small-4 me-50' />
                <span className='align-middle'>Export</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className='w-100'>
                  <Printer className='font-small-4 me-50' />
                  <span className='align-middle'>Print</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={() => downloadCSV(store.products)}>
                  <FileText className='font-small-4 me-50' />
                  <span className='align-middle'>CSV</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Grid className='font-small-4 me-50' />
                  <span className='align-middle'>Excel</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <File className='font-small-4 me-50' />
                  <span className='align-middle'>PDF</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Copy className='font-small-4 me-50' />
                  <span className='align-middle'>Copy</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
              <Plus size='12'/>
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

const avatarLength = 2
// ** Renders Client Columns
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
    color = states[stateNum]

  if (avatarLength > 1) {
    return<Link to={`/ecommerce/product-detail/${row._id}`}> <Avatar className='me-1' img={row.image} width='32' height='32' /></Link>
  } else {
    return <Link to={`/ecommerce/product-detail/${row._id}`}><Avatar color={color || 'primary'} className='me-1' content={row.username || 'John Doe'} initials /></Link>
  }
}


const UsersList = ({ store, loggedUser }) => {
  // ** Store Vars
  const dispatch = useDispatch()

  // ** States
  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('id')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [title,setTitle] = useState('')
  const [image,setImage] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState('')
  const [desc,setDesc] = useState('')
  const [editmode,setEditmode] = useState(false)
  const [productId,setProductId] = useState('')
  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // ** Get data on mount
  useEffect(() => {
    // dispatch(getProducts({
    //   userId: loggedUser.loggedUser._id
    // }))
    dispatch(
      getProducts({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        categoryId: '',
        userId: loggedUser.loggedUser.userType === 'admin' ? '' : loggedUser.loggedUser._id
      })
    )
  }, [dispatch, store.products.length, sort, sortColumn, currentPage])

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getProducts({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1,
        categoryId: '',
        userId: loggedUser.loggedUser.userType === 'admin' ? '' : loggedUser.loggedUser._id

      })
    )
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    dispatch(
      getProducts({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: value,
        page: currentPage,
        categoryId: '',
        userId: loggedUser.loggedUser.userType === 'admin' ? '' : loggedUser.loggedUser._id

      })
    )
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(
      getProducts({
        sort,
        q: val,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        categoryId: '',
        userId: loggedUser.loggedUser.userType === 'admin' ? '' : loggedUser.loggedUser._id

      })
    )
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.totalProducts / rowsPerPage))

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    )
  }

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      role: '',
      currentPlan: '',
      status: '',
      q: searchTerm
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.products.length > 0) {
      return store.products
    } else if (store.products.length === 0 && isFiltered) {
      return []
    } else {
      return store.products.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getProducts({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        categoryId: '',
        userId: loggedUser.loggedUser.userType === 'admin' ? '' : loggedUser.loggedUser._id

      })
    )
  }
  const handleEditProduct = e=>{
    setTitle(e.title)
    setImage(e.image)
    setCategory(e.category)
    setPrice(e.price)
    setDesc(e.description)
    setEditmode(true)
    setProductId(e._id)
    toggleSidebar()
 
  }
   const columns = [  {
    name: 'Image',
    sortable: true,
    minWidth: '100px',
    sortField: 'fullName',
    selector: row => row.image,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
      </div>
    )
  },
    {
      name: 'Title',
      sortable: true,
      minWidth: '300px',
      sortField: 'title',
      selector: row => row.title,
      cell: row => <span className='text-capitalize'>{row.title}</span>
    },
    {
      name: 'Description',
      sortable: true,
      minWidth: '172px',
      sortField: 'userType',
      selector: row => row.description,
      cell: row => <span className='text-capitalize'>{row.description.slice(0, 30) + "..."}</span>
    },
  
    {
      name: 'Price',
      minWidth: '230px',
      sortable: true,
      sortField: 'price',
      selector: row => row.price,
      cell: row => <span className='text-capitalize'>$ {row.price}</span>
    },
    {
      name: 'Actions',
      minWidth: '100px',
      cell: row => (
        <div className='column-action mt-4 mb-4'>
        <span className='cursor-pointer mx-1' onClick={()=>handleEditProduct(row)}> <Edit2 size={20}/></span>
        <span className='cursor-pointer'> <Trash2 size={20} onClick={()=>{
          if(window.confirm('are you sure!')){
            dispatch(deleteProduct(row._id))
            dispatch(getProducts({
              userId: loggedUser.loggedUser._id
            }))
          }
          }}/>
          </span>
        </div>
      )
    }
  ]
  return (
    <Fragment>

      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                store={store}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
              />
            }
          />
        </div>
      </Card>
{sidebarOpen && <Sidebar 
      open={sidebarOpen} 
      toggleSidebar={toggleSidebar} 
      userId={loggedUser.loggedUser._id} 
      title={title}
      image={image}
      setImage={setImage}
      categoryId={category}
      setCategoryId={setCategory}
      price={price}
      description={desc}
      setTitle={setTitle}
      setPrice={setPrice}
      setDescription={setDesc}
      setEditmode={setEditmode}
      editmode={editmode}
      setProductId={setProductId}
      productId={productId}
      />}
      
    </Fragment>
  )
}

export default UsersList
