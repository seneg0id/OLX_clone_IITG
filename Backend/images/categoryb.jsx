import React from 'react'
import { Link } from 'react-router-dom'
import './categoryb.css'
import cycle from '../../pages/cycle2.jpg'
const Category = ({category}) => {
  return (
    <div className='singlecat'>
        <div className="card2">
          <img className='catimg' src={cycle} alt="Product" />
          <Link to={`/buyerhomepage/?category=${category.name}`}>
        <div className="image___overlay">
              <div className="TITLE">
                {category.name}
              </div>
            </div></Link>
        </div>
    </div>
  )
}

export default Category
{/* 
              <div className="card2">
              <img className='iteimg'  src={cycle} alt="Product" />
                  <Link to={'/buyerhomepage'} >
                        <div className="image___overlay">
                            <div className="TITLE">Cycle</div>
                        </div>
                  </Link>
              </div> */}