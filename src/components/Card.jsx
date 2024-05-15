import React from 'react';
import './../styles/card.css';

import { BsCalendarDate } from "react-icons/bs";
import { IoIosTimer } from "react-icons/io";
import { GiSpeedometer } from "react-icons/gi";

import { NavLink } from 'react-router-dom';
import { DETAILS_ROUTE } from '../utils/consts';

function Card({ id, title, image, sessions, duration, intensity }) {
  return (
    <NavLink to={DETAILS_ROUTE.replace(':id', id)} >
    <div className="card_office">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <div className="spacebetween_cardsoffice">
        <p>Тренувань:</p>
        <div className='val-icon'>
          <p className='val_card'>{sessions}</p>
          <p><BsCalendarDate /></p>
        </div>
      </div>
      <div className="spacebetween_cardsoffice">
        <p>Тривалість:</p>
        <div className='val-icon'>
          <p className='val_card'>{duration}</p>
          <p><IoIosTimer /></p>
        </div>
      </div>
      <div className="spacebetween_cardsoffice">
        <p>Інтенсивність:</p>
        <div className='val-icon'>
          <p className='val_card'>{intensity}</p>
          <p><GiSpeedometer /></p>
        </div>
      </div>
    </div>
    </NavLink>
  );
}

export default Card;