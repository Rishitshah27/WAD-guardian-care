// Dashboard Functionality

document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('dashboard.html')) {
    initDashboard();
  }
});

function initDashboard() {
  const user = window.getCurrentUser(); // Declare getCurrentUser
  const showNotification = window.showNotification; // Declare showNotification
  
  if (!user || user.role === 'admin') {
    showNotification('Please login as a customer', 'error');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1000);
    return;
  }

  loadDashboardData();
  setupDashboardEventListeners();
}

function loadDashboardData() {
  const user = window.getCurrentUser(); // Declare getCurrentUser
  const bookings = window.getUserBookings(); // Declare getUserBookings
  const formatPrice = window.formatPrice; // Declare formatPrice
  const formatDate = window.formatDate; // Declare formatDate

  // Update welcome message
  const welcomeElement = document.querySelector('[data-welcome]');
  if (welcomeElement) {
    welcomeElement.textContent = `Welcome, ${user.name}!`;
  }

  // Calculate stats
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const completedBookings = bookings.filter(b => b.status === 'completed').length;
  const totalSpent = bookings.reduce((sum, b) => sum + b.price, 0);

  // Update stats cards
  updateStatCard('total-bookings', totalBookings);
  updateStatCard('confirmed-bookings', confirmedBookings);
  updateStatCard('completed-bookings', completedBookings);
  updateStatCard('total-spent', formatPrice(totalSpent));

  // Display bookings
  displayBookings(bookings);
}

function updateStatCard(id, value) {
  const element = document.querySelector(`[data-stat="${id}"]`);
  if (element) {
    element.textContent = value;
  }
}

function displayBookings(bookings) {
  const container = document.querySelector('[data-bookings]') || document.querySelector('table tbody');
  const formatPrice = window.formatPrice; // Declare formatPrice
  const formatDate = window.formatDate; // Declare formatDate
  
  if (!container) return;

  if (bookings.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 30px; color: #9ca3af;">
          No bookings yet. <a href="booking.html" style="color: #1e40af;">Book a service</a>
        </td>
      </tr>
    `;
    return;
  }

  container.innerHTML = bookings.map(booking => `
    <tr>
      <td>${booking.id}</td>
      <td>${booking.serviceType}</td>
      <td>${booking.plan}</td>
      <td>${formatDate(booking.date)} ${booking.time}</td>
      <td>${formatPrice(booking.price)}</td>
      <td>
        <span class="status-badge status-${booking.status}">
          ${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </td>
      <td>
        ${booking.status !== 'cancelled' && booking.status !== 'completed' 
          ? `<button onclick="cancelBookingAction(${booking.id})" class="btn btn-small" style="background: #ef4444; color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer;">Cancel</button>`
          : ''}
      </td>
    </tr>
  `).join('');
}

function cancelBookingAction(bookingId) {
  const cancelBooking = window.cancelBooking; // Declare cancelBooking
  const showNotification = window.showNotification; // Declare showNotification
  
  if (!confirm('Are you sure you want to cancel this booking?')) {
    return;
  }

  const result = cancelBooking(bookingId);
  
  if (result.success) {
    showNotification('Booking cancelled successfully');
    setTimeout(() => {
      location.reload();
    }, 500);
  } else {
    showNotification(result.message, 'error');
  }
}

function setupDashboardEventListeners() {
  const bookMoreBtn = document.querySelector('a[href="booking.html"]');
  const showNotification = window.showNotification; // Declare showNotification
  const getCurrentUser = window.getCurrentUser; // Declare getCurrentUser
  
  if (bookMoreBtn) {
    bookMoreBtn.addEventListener('click', function(e) {
      if (!getCurrentUser()) {
        e.preventDefault();
        showNotification('Please login first', 'error');
        window.location.href = 'login.html';
      }
    });
  }
}

// Declare global functions
window.getCurrentUser = function() {
  // Implementation for getCurrentUser
  return JSON.parse(localStorage.getItem('user'));
};

window.getUserBookings = function() {
  // Implementation for getUserBookings
  return JSON.parse(localStorage.getItem('bookings')) || [];
};

window.formatPrice = function(price) {
  // Implementation for formatPrice
  return `$${price.toFixed(2)}`;
};

window.formatDate = function(date) {
  // Implementation for formatDate
  return new Date(date).toLocaleDateString();
};

window.cancelBooking = function(bookingId) {
  // Implementation for cancelBooking
  const bookings = window.getUserBookings();
  const updatedBookings = bookings.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b);
  localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  return { success: true, message: 'Booking cancelled successfully' };
};

window.showNotification = function(message, type = 'success') {
  // Implementation for showNotification
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => {
    document.body.removeChild(notification);
  }, 3000);
};
