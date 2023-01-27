import React, {memo} from 'react'
import Display from '../Display/Display'
import Keypad from '../Keypad/Keypad'
import './TaskSide.css'


const TaskSide = () => {

  return (
    <div className='taskSideWrapper'>
        <Display />
        <Keypad />
    </div>
  )
}

export default memo(TaskSide)