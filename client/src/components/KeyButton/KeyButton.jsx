import React, {memo, useContext} from 'react'
import { AppContext } from '../../App'
import './KeyButton.css'

const KeyButton = ({title}) => {
  const {key, setKey,  setBalance} = useContext(AppContext);

  return (
    <div 
      className='keyButtonWrapper'
      onClick={() => {
        if(title === 'ADD'){
          setBalance(key);
          setKey(0);
        }else if(title === 'RESET'){
          setBalance(0)
          setKey(0);
        }else {
          setKey(prev => {
            if(prev === 0) {
              return title;
            }
            return prev + title
          })
        }
      }}
    >
        {title}
    </div>
  )
}

export default memo(KeyButton)