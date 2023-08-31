import './Home.css'
import logo1 from '../pictures/logo.PNG'
import Button from '../../components/Button/Button'
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='MAIN' >
      <Navbar />
      <img className='Logo' src={logo1} alt="logo" />
      <div className='buttonb'>
      <Link to={'/buyerhomepage'}><Button styles={ {padding:'20px 22px', margin:'0px 0px 0px 20px'}} text={<b><h1>Buy</h1></b>} /></Link>
        <Link to={'/sellercategory'}><Button styles={{ padding: '22px 27px', margin: '25px 0px 10% 20px' }} text={<b><h1>Sell</h1></b>} /></Link>
        
      </div> 
    </div>
  )

}

export default Home