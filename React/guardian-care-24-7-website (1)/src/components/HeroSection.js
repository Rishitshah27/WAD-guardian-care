import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero__content container">
        <h1 className="hero__title">Trusted Care for Your Loved Ones</h1>
        <p className="hero__subtitle">
          Professional caregiving services available 24/7 for elderly care and childcare needs.
        </p>
        <div className="hero__actions">
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
