import React from 'react'
import { Link } from 'react-router-dom'
import './categorys.css'
const Categorys = ({ category }) => {
  const PF = "http://localhost:5000/images/"
  return (
    <div className='singlecat'>
        {category.image && <img className='catimg' src={PF + category.image} alt="Product" />}
          <Link to={`/sellerhomepage/?category=${category.name}`}>
        <div className="INFO">
              <div className="CATE">
              {category.name}
              </div>
            </div></Link>
    </div>
  )
}

export default Categorys