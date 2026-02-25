import React from 'react';

const ReviewCard = ({ author, rating, text, service, date }) => {
  const stars = '⭐'.repeat(rating) + '☆'.repeat(5 - rating);

  return (
    <div className="review-card">
      <div className="review-card__header">
        <h4 className="review-card__author">{author}</h4>
        <span className="review-card__rating">{stars}</span>
      </div>
      <p className="review-card__service">{service}</p>
      <p className="review-card__text">{text}</p>
      <p className="review-card__date">{new Date(date).toLocaleDateString()}</p>
    </div>
  );
};

export default ReviewCard;
