import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const ServiceProviderCard = ({ id, name, image, serviceType, experience, location, availability, rating, reviews, hourlyRate, bio }) => {
  const availabilityClass = availability === 'Available' ? 'service-card__badge--available' : 'service-card__badge--busy';

  return (
    <div className="service-card service-card--provider">
      <img src={image} alt={name} className="service-card__image" />

      <div className="service-card__badge" style={{ backgroundColor: availability === 'Available' ? '#28a745' : '#ffc107' }}>
        {availability}
      </div>

      <div className="service-card__content">
        <h3 className="service-card__title">{name}</h3>
        <p className="service-card__service">{serviceType}</p>

        <div className="service-card__meta">
          <span>⭐ {rating} ({reviews} reviews)</span>
          <span>📍 {location}</span>
          <span>👨‍💼 {experience} years</span>
        </div>

        <p className="service-card__bio">{bio}</p>

        <div className="service-card__footer">
          <span className="service-card__price">₹{hourlyRate}/hr</span>
          <Link to={`/booking/${id}`}>
            <Button variant="primary" size="sm">Book Service</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderCard;
