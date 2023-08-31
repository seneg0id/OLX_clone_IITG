import React from 'react'
import './Categories.css'
import Category from '../category/categoryb'
const Categories = ({categories}) => {
  return (
    <div className='Catego'>
      {categories.map(c => (
        <Category key={c._id} category={c} />
      ))}
    </div>
  )
}

export default Categories