import React from 'react'
import Banner from './Banner/Banner'
import ItemBody from './ItemBody/ItemBody'

const Item: React.FC = () => {
  return (
    <div className='overflow-hidden bg-white'>
        <Banner />
        <ItemBody />
    </div>
  )
}

export default Item