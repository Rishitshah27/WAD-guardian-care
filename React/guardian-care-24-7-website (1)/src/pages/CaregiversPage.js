import React, { useState } from 'react';
import { serviceProviders } from '../data/mockData';
import '../index.css';

function CaregiversPage() {
    const [filter, setFilter] = useState('All');

    const filteredProviders = filter === 'All'
        ? serviceProviders
        : serviceProviders.filter(p => p.serviceType === filter);

    const categories = ['All', ...new Set(serviceProviders.map(p => p.serviceType))];

    return (
        <div className="container">
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#2c3e50' }}>Our Trusted Caregivers</h2>

            {/* Filter Buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '2rem', flexWrap: 'wrap' }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '20px',
                            border: 'none',
                            background: filter === cat ? '#3498db' : '#ecf0f1',
                            color: filter === cat ? 'white' : '#2c3e50',
                            cursor: 'pointer',
                            fontWeight: '500',
                            transition: 'all 0.2s'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="caregivers-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem',
                padding: '0 1rem'
            }}>
                {filteredProviders.map(provider => (
                    <div key={provider.id} className="provider-card" style={{
                        background: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                        overflow: 'hidden',
                        border: '1px solid #eee',
                        transition: 'transform 0.2s'
                    }}>
                        <div style={{ display: 'flex', padding: '1.5rem', alignItems: 'center', borderBottom: '1px solid #f0f0f0' }}>
                            <img
                                src={provider.image}
                                alt={provider.name}
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    marginRight: '1rem',
                                    border: '3px solid #f0f9ff'
                                }}
                            />
                            <div>
                                <h3 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>{provider.name}</h3>
                                <span style={{
                                    background: '#e1f5fe',
                                    color: '#0288d1',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    fontSize: '0.8rem',
                                    fontWeight: '500'
                                }}>
                                    {provider.serviceType}
                                </span>
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem' }}>
                            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.5', margin: '0 0 1rem 0' }}>{provider.bio}</p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#7f8c8d', marginBottom: '0.5rem' }}>
                                <span>Experience:</span>
                                <span style={{ color: '#2c3e50', fontWeight: 'bold' }}>{provider.experience} Years</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#7f8c8d', marginBottom: '0.5rem' }}>
                                <span>Location:</span>
                                <span style={{ color: '#2c3e50', fontWeight: 'bold' }}>{provider.location}</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#7f8c8d', marginBottom: '1.5rem' }}>
                                <span>Rate:</span>
                                <span style={{ color: '#27ae60', fontWeight: 'bold' }}>₹{provider.hourlyRate}/hr</span>
                            </div>

                            <button style={{
                                width: '100%',
                                padding: '12px',
                                background: '#3498db',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '1rem'
                            }}>
                                Book Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CaregiversPage;
