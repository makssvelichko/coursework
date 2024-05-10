import React from 'react';
import './../styles/card.css';

function Card({ title, image, sessions, duration, intensity, reviews }) {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{sessions} тренувань</p>
      <p>Тривалість: {duration}</p>
      <p>Інтенсивність: {intensity}</p>
      <p>Відгуки: {reviews} зірок</p>
    </div>
  );
}

export default Card;