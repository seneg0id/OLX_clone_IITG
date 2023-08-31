import axios from 'axios';
import './SellerCategorypage.css'
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import Categoriess from '../../components/Categories/Categoriess';
import { useState } from 'react';
import { useEffect } from 'react';
const SellerCategorypage = () => {
    const [cats, setCats] = useState([])
    useEffect(() => {
        const getcats = async () => {
            const res = await axios.get('/categories')
            setCats(res.data)
        }
       getcats()
    },[])
    return (
        <div className="categorypageseller">
            <Navbar />
            <h5>Sell By Category</h5>
            <Categoriess categories ={cats}/>
                <Link to={"/buyerhomepage"}><button className='_1234' >BUY</button></Link>
            <Link to={"/sellercategory"}><button  className='_1234' >SELL</button></Link>
        </div>
    );
}
 
export default SellerCategorypage;