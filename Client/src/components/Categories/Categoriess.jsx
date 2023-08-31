import React from 'react'
import Categorys from '../category/categorys'
import './Categories.css'
const Categoriess = ({categories}) => {
  return (
      <div className='Catego'>
           {categories.map(c => (
        <Categorys key={c._id} category={c} />
      ))}
    </div>
  )
}

export default Categoriess