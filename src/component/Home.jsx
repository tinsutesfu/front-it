import React from 'react'
import Header from './Header'
import Amazon from './Amazon'

const Home = ({cart,setCart,products,saveToStorage}) => {
  return (
    <div>
      <Header/>
      <Amazon cart={cart} setCart={setCart} products={products} saveToStorage={saveToStorage}/>
    </div>
  )
}

export default Home
