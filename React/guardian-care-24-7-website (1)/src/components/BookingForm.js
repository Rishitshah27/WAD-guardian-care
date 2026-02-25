

import React, { useState } from 'react';
import Button from './Button';
import { addBooking } from '../utils/storage';

const BookingForm = ({ providerId, providerName }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    address: '',
    description: '',
    emergency: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save to "Simple Backend" (localStorage)
    addBooking({
      ...formData,
      providerId,
      providerName,
      createdAt: new Date().toISOString()
    });

    alert(`Booking request sent for ${providerName}! Check your dashboard for status updates.`);
    setFormData({ date: '', time: '', address: '', description: '', emergency: false });
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h3 className="booking-form__title">Book Service with {providerName}</h3>

      <div className="form-group">
        <label htmlFor="date">Preferred Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="time">Preferred Time</label>
        <input
          type="time"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="address">Service Address</label>
        <textarea
          id="address"
          name="address"
          rows="3"
          placeholder="e.g. Flat 402, Sunshine Apartments, Mumbai"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Contact Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="+91 98765-43210"
          value={formData.phone || ''}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Service Description / Special Requests</label>
        <textarea
          id="description"
          name="description"
          rows="3"
          placeholder="Describe the issue or any special requirements"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group checkbox">
        <input
          type="checkbox"
          id="emergency"
          name="emergency"
          checked={formData.emergency}
          onChange={handleChange}
        />
        <label htmlFor="emergency">Emergency Service (24/7)</label>
      </div>

      <Button variant="primary" type="submit">
        Confirm Booking
      </Button>
    </form>
  );
};

export default BookingForm;
