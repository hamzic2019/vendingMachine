import React, {createContext, useState} from 'react'
import './App.css'
import ProductDisplay from './components/ProductDisplay/ProductDisplay'
import TaskSide from './components/TaskSide/TaskSide'

export const AppContext = createContext();

const App = () => {
  const [key, setKey] = useState(0);
  const [balance, setBalance] = useState(0);

  return (
    <div className='appWrapper'>
      <AppContext.Provider value={{key, setKey, balance, setBalance}}>
        <ProductDisplay />
        <TaskSide />
      </AppContext.Provider>
    </div>
  )
}



export default App