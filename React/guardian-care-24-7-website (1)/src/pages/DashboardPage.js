

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dashboardStats } from '../data/mockData';
import { getBookings } from '../utils/storage';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Load from "Simple Backend"
    setBookings(getBookings());
  }, []);

  const handleCancelBooking = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      const updated = bookings.filter((b) => b.id !== id);
      setBookings(updated);
      localStorage.setItem('guardian_care_bookings', JSON.stringify(updated));
      alert('Booking cancelled successfully');
    }
  };

  return (
    <main className="dashboard-page">
      <div className="dashboard-header">
        <div className="container">
          <h1>My Dashboard</h1>
          <p>Welcome back! Manage your bookings and services</p>
        </div>
      </div>

      <div className="container dashboard-container">
        <nav className="dashboard-tabs">
          <button
            className={`tab-button ${activeTab === 'overview' ? 'tab-button--active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`tab-button ${activeTab === 'bookings' ? 'tab-button--active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            My Bookings
          </button>
          <button
            className={`tab-button ${activeTab === 'settings' ? 'tab-button--active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </nav>

        {activeTab === 'overview' && (
          <section className="dashboard-content">
            <h2>Dashboard Overview</h2>
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-box__number">{dashboardStats.totalBookings}</div>
                <div className="stat-box__label">Total Bookings</div>
              </div>
              <div className="stat-box">
                <div className="stat-box__number">{dashboardStats.completedServices}</div>
                <div className="stat-box__label">Completed Services</div>
              </div>
              <div className="stat-box">
                <div className="stat-box__number">{dashboardStats.upcomingServices}</div>
                <div className="stat-box__label">Upcoming Services</div>
              </div>
              <div className="stat-box">
                <div className="stat-box__number">⭐ {dashboardStats.avgRating}</div>
                <div className="stat-box__label">Average Rating</div>
              </div>
            </div>
            <div className="total-spent">
              <p>Total Amount Spent: <strong>₹{dashboardStats.totalSpent}</strong></p>
            </div>
          </section>
        )}

        {activeTab === 'bookings' && (
          <section className="dashboard-content">
            <h2>My Bookings</h2>
            {bookings.length > 0 ? (
              <div className="bookings-table-wrapper">
                <table className="bookings-table">
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Provider</th>
                      <th>Date & Time</th>
                      <th>Status</th>
                      <th>Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>{booking.serviceType}</td>
                        <td>{booking.provider}</td>
                        <td>{booking.date} {booking.time}</td>
                        <td>
                          <span className={`status-badge status-badge--${booking.status.toLowerCase()}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td>₹{booking.amount}</td>
                        <td>
                          {booking.status === 'Scheduled' && (
                            <button
                              className="action-button"
                              onClick={() => handleCancelBooking(booking.id)}
                            >
                              Cancel
                            </button>
                          )}
                          {booking.status === 'Completed' && (
                            <Link to="/reviews" className="action-button">Review</Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <p>No bookings yet. <Link to="/services">Browse services</Link></p>
              </div>
            )}
          </section>
        )}

        {activeTab === 'settings' && (
          <section className="dashboard-content">
            <h2>Account Settings</h2>
            <div className="settings-section">
              <div className="setting-item">
                <label>Email</label>
                <input type="email" placeholder="your@email.com" defaultValue="customer@example.com" />
              </div>
              <div className="setting-item">
                <label>Phone</label>
                <input type="tel" placeholder="+1 (555) 000-0000" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="setting-item">
                <label>
                  <input type="checkbox" defaultChecked /> Receive booking notifications
                </label>
              </div>
              <div className="setting-item">
                <label>
                  <input type="checkbox" defaultChecked /> Receive promotional offers
                </label>
              </div>
              <button className="save-button">Save Changes</button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default DashboardPage;
