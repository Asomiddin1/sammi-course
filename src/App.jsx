import React, { useCallback, useEffect } from 'react'
import { getData } from './constants/db'
import Card from './card/card'
import Cart from './cart/cart'
import { useState } from 'react'

const course = getData()

const telegram = window.Telegram.WebApp;

const App = () => {
  const [cartItems, setCartItems] = useState([])

  const onAddItem = (item) => {
    const exisistItem = cartItems.find(c => c.id === item.id)
    console.log('Exisit_item', exisistItem);

    if (exisistItem) {
      const newData = cartItems.map(c => c.id === item.id ? { ...exisistItem, quantitiy: exisistItem.quantitiy + 1 } : c)
      console.log('exsit-quan-item', newData);
      setCartItems(newData)
    } else {
      const newData = [...cartItems, { ...item, quantitiy: 1 }]
      console.log('add-quan-item', newData);
      setCartItems(newData)
    }
  }
  const onRemoveItem = (item) =>{
    const exisistItem = cartItems.find(c => c.id === item.id)
  console.log('exisistItem', exisistItem);
    if(exisistItem.quantitiy === 1){
      const newData = cartItems.filter(c => c.id !== item.id)
      setCartItems(newData)
      console.log('delete-item' , newData);
    }else{
      const newData = cartItems.map(c => c.id === exisistItem.id ? {...exisistItem , quantitiy : exisistItem.quantitiy - 1}: c)
      setCartItems(newData)
      console.log('delete-0' , newData);
    }
  }

  useEffect(()=>{
  telegram.ready()
  }, [])

  const onCheckout = ()=>{
    telegram.MainButton.text = 'Sotib oolish';
    telegram.MainButton.show()
  }

  const onSendData = useCallback(()=>{
   telegram.onSendData(JSON.stringify(cartItems))
  } , [cartItems])

  useEffect(()=>{
   telegram.onEvent('mainButtonClicked' , onSendData)
   return ()=> telegram.ofnEvent('mainButtonClicked' , onSendData) 
  } , [onSendData])

  return (
    <>
      <h1 style={{ textAlign: 'center', paddingTop: '50px' }}>Sammi course</h1>
      <div>
        <Cart cartItems={cartItems} onCheckout={onCheckout}/>
        {/* cart */}
        <div className='card__container'>
          {course.map(c => (
            <>
              <Card key={c.id} course={c} onAddItem={onAddItem}  onRemoveItem={onRemoveItem}/>
            </>
          ))}
        </div>
      </div>
    </>
  )
}

export default App