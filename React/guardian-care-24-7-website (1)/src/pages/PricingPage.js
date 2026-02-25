import React from 'react';
import '../index.css';

function PricingPage() {
    const plans = [
        {
            name: 'Hourly Care',
            price: '₹200',
            duration: 'per hour',
            features: ['Ideal for quick errands', 'Minimum 2 hours', 'Verified Caregiver'],
            recommended: false,
        },
        {
            name: 'Daily Care',
            price: '₹1,500',
            duration: 'per day (10 hrs)',
            features: ['Full day assistance', 'Meal preparation inc.', 'Activity engagement'],
            recommended: true,
        },
        {
            name: 'Monthly Care',
            price: '₹35,000',
            duration: 'per month',
            features: ['Dedicated caregiver', '24/7 Support', 'Replacement guarantee'],
            recommended: false,
        },
    ];

    return (
        <div className="pricing-page">
            <h2 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>Transparent Pricing</h2>
            <div className="pricing-container">
                {plans.map((plan, index) => (
                    <div key={index} className={`pricing-card ${plan.recommended ? 'recommended' : ''}`}>
                        {plan.recommended && <span style={{ background: '#3498db', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '0.8rem', marginBottom: '0.5rem', display: 'inline-block' }}>Recommended</span>}
                        <h3 style={{ color: '#34495e', marginBottom: '0.5rem' }}>{plan.name}</h3>
                        <div className="price" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2c3e50', marginBottom: '0.2rem' }}>{plan.price}</div>
                        <span className="duration" style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>{plan.duration}</span>
                        <ul style={{ listStyle: 'none', padding: 0, margin: '1.5rem 0', textAlign: 'left' }}>
                            {plan.features.map((feature, i) => (
                                <li key={i} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', color: '#555' }}>
                                    <span style={{ color: '#2ecc71', marginRight: '8px' }}>✓</span> {feature}
                                </li>
                            ))}
                        </ul>
                        <button style={{
                            background: '#3498db',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            width: '100%',
                            fontSize: '1rem',
                            fontWeight: 'bold'
                        }}>Choose Plan</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PricingPage;
