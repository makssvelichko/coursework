import React, { useState } from 'react';
import './../styles/cardfood.css';

const FoodCard = ({ image, name, calories, proteins, fats, carbs, addToMenu, removeFromMenu }) => {
    const [isChecked, setIsChecked] = useState(false);
  
    const toggleCheckbox = () => {
      if (isChecked) {
        removeFromMenu({calories, proteins, fats, carbs});
      } else {
        addToMenu({calories, proteins, fats, carbs});
      }
      setIsChecked(!isChecked);
    };
  
    return (
      <div className="card_food">
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <div className='box_cardsfood'>
          <div className="spacebetween_cardsfood">
            <p>Калорії:</p>
            <p className='val_card'>{calories} cal</p>
          </div>
  
          <div className="spacebetween_cardsfood">
            <p>Білки:</p>
            <p className='val_card'>{proteins} г</p>
          </div>
  
          <div className="spacebetween_cardsfood">
            <p>Жири:</p>
            <p className='val_card'>{fats} г</p>
          </div>
  
          <div className="spacebetween_cardsfood">
            <p>Вуглеводи:</p>
            <p className='val_card'>{carbs} г</p>
          </div>
        </div>
        <div className='checkbox_food'>
            <input className='checkbox_food_c' type="checkbox" checked={isChecked} onChange={toggleCheckbox} />
            <label >Додати до меню</label>
        </div>
      </div>
    );
  };
export default FoodCard;