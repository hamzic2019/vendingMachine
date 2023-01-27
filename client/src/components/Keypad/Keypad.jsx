import React, {memo} from 'react'
import KeyButton from '../KeyButton/KeyButton';
import './Keypad.css';


const Keypad = () => {
  const dataItems = [{title:'1'},{title:'2'},{title:'3'},{title:'4'},{title:'5'},{title:'6'},{title:'7'},{title:'8'},{title:'9'},{title:'RESET'},{title:'0'},{title:'ADD'}]
  const handelIt = (pro) => {
    console.log(pro)
  }

  return (
    <div className='keypadWrapper'>
        
        
        {
          dataItems.map(item => {
            return <KeyButton handelIt={handelIt} key={item.title} title={item.title} />
          })
        }

    </div>
  )
}

export default memo(Keypad)