

import React, { useState, useMemo, useEffect } from 'react';
import ServiceProviderCard from '../components/ServiceProviderCard';
import { serviceCategories } from '../data/mockData';
import { getProviders } from '../utils/storage';

const ServicesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    setProviders(getProviders());
  }, []);

  const filteredProviders = useMemo(() => {
    return providers.filter((provider) => {
      const categoryMatch = selectedCategory === 'all' || provider.serviceType === selectedCategory;
      const availabilityMatch = selectedAvailability === 'all' || provider.availability === selectedAvailability;
      return categoryMatch && availabilityMatch;
    });
  }, [selectedCategory, selectedAvailability, providers]);

  return (
    <main className="services-page">
      <div className="services-header">
        <div className="container">
          <h1>Browse Our Service Professionals</h1>
          <p>Find trusted professionals for all your service needs</p>
        </div>
      </div>

      <div className="services-container container">
        <aside className="services-sidebar">
          <div className="filter-group">
            <h3>Service Category</h3>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Services</option>
              {serviceCategories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <h3>Availability</h3>
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="Available">Available Now</option>
              <option value="Busy">Busy</option>
            </select>
          </div>

          <div className="filter-info">
            <p>Found <strong>{filteredProviders.length}</strong> service provider{filteredProviders.length !== 1 ? 's' : ''}</p>
          </div>
        </aside>

        <section className="services-grid">
          {filteredProviders.length > 0 ? (
            <div className="providers-grid">
              {filteredProviders.map((provider) => (
                <ServiceProviderCard key={provider.id} {...provider} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No service providers found matching your criteria.</p>
              <button onClick={() => { setSelectedCategory('all'); setSelectedAvailability('all'); }}>
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default ServicesPage;
