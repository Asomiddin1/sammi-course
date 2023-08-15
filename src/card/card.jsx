import { useState } from 'react'
import Button from '../button/button'
import './card.css'

const Card = ({course , onAddItem ,onRemoveItem}) => {
  const [count, setCount] = useState(0)

  const handleImcriment = ()=>{
  setCount(prev => prev + 1)
  onAddItem(course)
  }
  const handleDecrement =()=>{
    setCount(prev => prev - 1)
    onRemoveItem(course)
  }
  return (
    <div className='card'>
        <span className={`${count > 0 ? 'card__badge' :'.card__badge-hidden'}`}>{count > 0 ? count :''}</span>
         <div className='image__container'>
          <img src={course.image} alt="img"  width={'100%'} height={230}/>
         </div>

         <div className='card__body'>
         <h2 className='card__title'>{course.text}</h2>
         <div className='card_price'>
         {course.price.toLocaleString('en-US', {
		  style: 'currency',
		  currency: 'USD',
					})}
         </div>
         </div>

         <div className='hr'></div>

         <div className='btn__container'>
            <Button onClick={handleImcriment}  type='add' title="+"/>
            {count > 0 ? <Button onClick={handleDecrement}  type='remove' title="-"/> : ''}
         </div>
    </div>
  )
}

export default Card