

import React, { useState } from 'react';
import Button from './Button';
import { addReview } from '../utils/storage';

const ReviewForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    author: '',
    rating: 5,
    text: '',
    service: 'Childcare',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      ...formData,
      rating: parseInt(formData.rating),
    };

    // Save to "Simple Backend"
    addReview(newReview);

    if (onSubmit) {
      onSubmit(newReview);
    }

    alert('Thank you for your review!');
    setFormData({ author: '', rating: 5, text: '', service: 'Childcare' });
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3 className="review-form__title">Share Your Experience</h3>

      <div className="form-group">
        <label htmlFor="author">Your Name</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="service">Service Type</label>
        <select id="service" name="service" value={formData.service} onChange={handleChange}>
          <option value="Childcare">Childcare</option>
          <option value="Elderly Care">Elderly Care</option>
          <option value="Medical Assistance">Medical Assistance</option>
          <option value="Physiotherapy">Physiotherapy</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="rating">Rating</label>
        <select id="rating" name="rating" value={formData.rating} onChange={handleChange}>
          <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
          <option value="4">⭐⭐⭐⭐☆ Good</option>
          <option value="3">⭐⭐⭐☆☆ Average</option>
          <option value="2">⭐⭐☆☆☆ Poor</option>
          <option value="1">⭐☆☆☆☆ Very Poor</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="text">Your Review</label>
        <textarea
          id="text"
          name="text"
          rows="5"
          value={formData.text}
          onChange={handleChange}
          placeholder="Share your experience with this service..."
          required
        />
      </div>

      <Button variant="primary" type="submit">
        Submit Review
      </Button>
    </form>
  );
};

export default ReviewForm;
