

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import { serviceProviders } from '../data/mockData';

const BookingPage = () => {
  const { providerId } = useParams();
  const provider = serviceProviders.find((p) => p.id === parseInt(providerId));

  if (!provider) {
    return (
      <main className="booking-page">
        <div className="container">
          <div className="not-found">
            <h2>Service Provider Not Found</h2>
            <p>The service provider you're looking for doesn't exist.</p>
            <Link to="/services">← Back to Services</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="booking-page">
      <div className="container">
        <Link to="/services" className="back-link">← Back to Services</Link>

        <div className="booking-container">
          <div className="provider-info">
            <img src={provider.image} alt={provider.name} className="provider-info__image" />
            <h1 className="provider-info__name">{provider.name}</h1>
            <p className="provider-info__service">{provider.serviceType}</p>

            <div className="provider-info__details">
              <div className="detail">
                <span className="detail__label">Experience:</span>
                <span className="detail__value">{provider.experience} years</span>
              </div>
              <div className="detail">
                <span className="detail__label">Location:</span>
                <span className="detail__value">{provider.location}</span>
              </div>
              <div className="detail">
                <span className="detail__label">Rating:</span>
                <span className="detail__value">⭐ {provider.rating} ({provider.reviews} reviews)</span>
              </div>
              <div className="detail">
                <span className="detail__label">Hourly Rate:</span>
                <span className="detail__value">${provider.hourlyRate}</span>
              </div>
            </div>

            <div className="provider-info__bio">
              <h3>About</h3>
              <p>{provider.bio}</p>
            </div>
          </div>

          <BookingForm providerId={provider.id} providerName={provider.name} />
        </div>
      </div>
    </main>
  );
};

export default BookingPage;
