import React from 'react'
import Chart from '../components/chart/chart'
import './Home.css'
import { userData } from '../../../dummyData'
import Widgetsm from '../components/widgetsm/Widgetsm'
import Widgetlg from '../components/Widgetlg/Widgetlg'
import Topbar from '../components/topbar/Topbar'
import Sidebar from '../components/Sidebar/Sidebar'
const AdminHome = ({user}) => {
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar/>
      <div className='home'>
          <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
          <div className="homeWidgets">
          <Widgetsm user={user} />
          <Widgetlg  user={user}/>       
          </div>
      </div>
      </div>
    </div>
  )
}

export default AdminHome