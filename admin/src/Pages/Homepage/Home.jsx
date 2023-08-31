import React from 'react'
import Chart from '../../components/chart/chart'
import './Home.css'
import { userData } from '../../dummyData'
import Widgetsm from '../../components/widgetsm/Widgetsm'
import Widgetlg from '../../components/Widgetlg/Widgetlg'
const Home = () => {
  return (
      <div className='home'>
          <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
          <div className="homeWidgets">
          <Widgetsm />
        <Widgetlg />
              
        </div>
      </div>
  )
}

export default Home