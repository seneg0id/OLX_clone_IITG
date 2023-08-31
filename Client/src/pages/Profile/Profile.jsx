import './profile.css'
import profile from '../pictures/profile.jpg'
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
const Profile = ({user}) => {
    return ( 
        <div className="prof">
            <div className='color'>
                <Link to={'/home'} ><HomeIcon className='homeicon' sx={{ fontSize: 45 }} /></Link> 
                <span>Campus Olx</span>
            <img className='prio' src={profile} alt="" />
            </div>
            <div className="profiledetails">
                <div className="proname"><p  >{user.Username}</p></div>
                <div className="myproducts">
                    <span>My Orders</span>
                </div>
                <Link to={`/buyerhomepage/?useremail=${user.email}`} style={{ textDecoration: 'none' }} ><div className="myproducts"><p>MY PRODUCTS</p></div></Link>
                <div className="myproducts">
                    <a href="http://localhost:5000/auth/logout" className='link1' ><p>Logout</p></a>
                </div>
            </div> 
        </div>
     );
}
 
export default Profile;