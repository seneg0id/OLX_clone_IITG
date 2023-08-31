import './BuyerCategoryPage.css'
import { Link } from 'react-router-dom';
import Categories from '../../components/Categories/Categories';
import { useEffect, useState } from 'react';
import axios from 'axios'
import Navbar from '../../components/Navbar/Navbar';
const BuyerCategoryPage = () => {
    const [cats, setCats] = useState([])
    useEffect(() => {
        const getcats = async () => {
            const res = await axios.get('/categories')
            setCats(res.data)
        }
       getcats()
    },[])
    return (
        <div className="categorypage">
            <Navbar/>
            <h5>Shop By Category</h5>
            <Categories categories ={cats} />
            <Link to={"/buyerhomepage"}><button className='abcd' >BUY</button></Link>
            <Link to={"/sellercategory"}><button  className='abcd' >SELL</button></Link>
        </div>
    );
}
 
export default BuyerCategoryPage;