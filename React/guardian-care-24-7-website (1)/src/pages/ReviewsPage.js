import React, { useState, useEffect } from 'react';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import { getReviews } from '../utils/storage';
import '../index.css';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setReviews(getReviews());
  }, []);

  const handleReviewSubmit = (newReview) => {
    // Note: addReview is already called inside ReviewForm, 
    // we just update local state for immediate feedback
    setReviews([newReview, ...reviews]);
  };

  return (
    <main className="reviews-page" style={{ padding: '2rem' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>Client Experiences</h1>
          <p style={{ color: '#7f8c8d' }}>See what families across India rely on us for.</p>
        </div>

        <div className="reviews-layout">
          {/* Reviews Grid */}
          <div className="reviews-list">
            <div className="reviews-grid-modern">
              {reviews.map((review, index) => (
                <ReviewCard key={index} {...review} />
              ))}
            </div>
          </div>

          {/* Sticky Form Sidebar */}
          <aside className="reviews-form-section" style={{ position: 'sticky', top: '20px' }}>
            <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: '1px solid #e0e0e0' }}>
              <ReviewForm onSubmit={handleReviewSubmit} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default ReviewsPage;
