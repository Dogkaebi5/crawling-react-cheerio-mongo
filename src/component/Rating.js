import React from 'react'

const Rating = ({rank, title, broadcast, rating}) => {
  return (
      <li className='grid grid-cols-8 p-3'>
        <h2 className='col-span-1 text-center'>{rank}</h2>
        <h3 className='col-span-5'>{title}</h3>
        <p className='col-span-1 text-center'>{broadcast}</p>
        <p className='col-span-1 text-right'>{rating}</p>
      </li>
  )
}

export default Rating