import React, {memo, useContext} from 'react'
import { AppContext } from '../../App'
import './ProductDisplay.css'

const ProductDisplay = () => {
  const {balance} = useContext(AppContext);
  return (
    <div className='productDisplayWrapper'>
        ProductDisplay: {balance}
    </div>
  )
}

export default memo(ProductDisplay);