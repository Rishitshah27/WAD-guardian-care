import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';

const LandingPage = () => {
  return (
    <main className="landing-page">
      <HeroSection />

      <section style={{ padding: '4rem 2rem', textAlign: 'center', background: 'white' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>Professional Care You Can Trust</h2>
          <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.6' }}>
            GuardianCare 24/7 is dedicated to providing top-tier childcare and elderly care services across India.
            Our verified professionals ensure your loved ones are in safe hands.
          </p>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
