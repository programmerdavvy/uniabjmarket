// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather'
import { useSelector } from 'react-redux'
// ** Styles
import '@styles/react/apps/app-users.scss'

const UsersList = () => {
  const store = useSelector(state => state.users)
  return (
    <div className='app-user-list'>
      <Row>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='primary'
            statTitle='Total Users'
            icon={<User size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{store.total}</h3>}
          />
        </Col>
      </Row>
      <Table store={store} activeUser={store.loggedUser}/>
    </div>
  )
}

export default UsersList
