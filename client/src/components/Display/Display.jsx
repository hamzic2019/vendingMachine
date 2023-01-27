import React, {memo, useContext, useState} from 'react'
import { AppContext } from '../../App';
import './Display.css'

const Display = () => {
  const {key, setKey} = useContext(AppContext);

  return (
    <div className='displayWrapper'>
        <h1>Deposit Coins</h1>
        <h1># {key}</h1>
    </div>
  )
}

export default memo(Display)