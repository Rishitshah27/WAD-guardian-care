// Admin Dashboard Functionality

document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('admin.html')) {
    initAdmin();
  }
});

function initAdmin() {
  const user = getCurrentUser();
  
  if (!user || user.role !== 'admin') {
    showNotification('Admin access only', 'error');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1000);
    return;
  }

  loadAdminData();
  setupAdminTabs();
  setupAdminEventListeners();
}

function loadAdminData() {
  updateAdminStats();
  loadAdminBookings();
  loadAdminReviews();
  loadAdminUsers();
}

function updateAdminStats() {
  const bookings = getAllBookings();
  const users = JSON.parse(localStorage.getItem('USERS'));
  const reviews = getAllReviews();

  const totalUsers = users.filter(u => u.role === 'customer').length;
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, b) => sum + b.price, 0);
  const avgRating = getAverageRating();

  updateStatCard('admin-users', totalUsers);
  updateStatCard('admin-bookings', totalBookings);
  updateStatCard('admin-revenue', formatPrice(totalRevenue));
  updateStatCard('admin-rating', `${avgRating} ★`);
}

function updateStatCard(id, value) {
  const element = document.querySelector(`[data-stat="${id}"]`);
  if (element) {
    element.textContent = value;
  }
}

function loadAdminBookings() {
  const bookings = getAllBookings();
  const container = document.querySelector('[data-admin-bookings]') || document.querySelector('#bookings-tab tbody');
  
  if (!container) return;

  if (bookings.length === 0) {
    container.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">No bookings</td></tr>';
    return;
  }

  container.innerHTML = bookings.map(booking => {
    const user = JSON.parse(localStorage.getItem('USERS'))
      .find(u => u.id === booking.userId);
    
    return `
      <tr>
        <td>#${booking.id}</td>
        <td>${user?.name || 'Unknown'}</td>
        <td>${booking.serviceType}</td>
        <td>${formatDate(booking.date)}</td>
        <td>${formatPrice(booking.price)}</td>
        <td>
          <span class="status-badge status-${booking.status}">
            ${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </td>
        <td>
          ${booking.status === 'pending' ? `
            <button onclick="adminConfirmBooking(${booking.id})" class="btn btn-small" style="background: #10b981; color: white; padding: 5px 10px; margin-right: 5px; border: none; border-radius: 4px; cursor: pointer;">Confirm</button>
            <button onclick="adminRejectBooking(${booking.id})" class="btn btn-small" style="background: #ef4444; color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer;">Reject</button>
          ` : ''}
        </td>
      </tr>
    `;
  }).join('');
}

function loadAdminReviews() {
  const reviews = getAllReviews();
  const container = document.querySelector('[data-admin-reviews]') || document.querySelector('#reviews-tab tbody');
  
  if (!container) return;

  if (reviews.length === 0) {
    container.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px;">No reviews</td></tr>';
    return;
  }

  container.innerHTML = reviews.map(review => `
    <tr>
      <td>#${review.id}</td>
      <td>${review.userName}</td>
      <td>${review.serviceType}</td>
      <td>
        <div style="color: #fbbf24;">
          ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
        </div>
      </td>
      <td>${review.comment.substring(0, 50)}...</td>
      <td>
        <button onclick="adminDeleteReview(${review.id})" class="btn btn-small" style="background: #ef4444; color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer;">Delete</button>
      </td>
    </tr>
  `).join('');
}

function loadAdminUsers() {
  const users = JSON.parse(localStorage.getItem('USERS'));
  const customers = users.filter(u => u.role === 'customer');
  const container = document.querySelector('[data-admin-users]') || document.querySelector('#users-tab tbody');
  
  if (!container) return;

  if (customers.length === 0) {
    container.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px;">No users</td></tr>';
    return;
  }

  container.innerHTML = customers.map(user => `
    <tr>
      <td>#${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>${formatDate(user.createdAt || new Date())}</td>
    </tr>
  `).join('');
}

function adminConfirmBooking(bookingId) {
  const result = updateBookingStatus(bookingId, 'confirmed');
  if (result.success) {
    showNotification('Booking confirmed');
    loadAdminBookings();
  }
}

function adminRejectBooking(bookingId) {
  if (!confirm('Are you sure you want to reject this booking?')) {
    return;
  }
  
  const result = updateBookingStatus(bookingId, 'rejected');
  if (result.success) {
    showNotification('Booking rejected');
    loadAdminBookings();
  }
}

function adminDeleteReview(reviewId) {
  if (!confirm('Are you sure you want to delete this review?')) {
    return;
  }
  
  const result = deleteReview(reviewId);
  if (result.success) {
    showNotification('Review deleted');
    loadAdminReviews();
  }
}

function setupAdminTabs() {
  const tabs = document.querySelectorAll('[data-tab]');
  const tabContents = document.querySelectorAll('[data-tab-content]');

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const tabName = this.getAttribute('data-tab');
      
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      this.classList.add('active');
      const activeContent = document.querySelector(`[data-tab-content="${tabName}"]`);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });
}

function setupAdminEventListeners() {
  const refreshBtn = document.querySelector('[data-refresh-stats]');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', function() {
      loadAdminData();
      showNotification('Data refreshed');
    });
  }
}

function getCurrentUser() {
  // Placeholder for getCurrentUser function
  return JSON.parse(localStorage.getItem('CURRENT_USER'));
}

function showNotification(message, type = 'success') {
  // Placeholder for showNotification function
  alert(message);
}

function getAllBookings() {
  // Placeholder for getAllBookings function
  return JSON.parse(localStorage.getItem('BOOKINGS')) || [];
}

function getAllReviews() {
  // Placeholder for getAllReviews function
  return JSON.parse(localStorage.getItem('REVIEWS')) || [];
}

function getAverageRating() {
  // Placeholder for getAverageRating function
  const reviews = getAllReviews();
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
}

function formatPrice(price) {
  // Placeholder for formatPrice function
  return `$${price.toFixed(2)}`;
}

function formatDate(date) {
  // Placeholder for formatDate function
  return new Date(date).toLocaleDateString();
}

function updateBookingStatus(bookingId, status) {
  // Placeholder for updateBookingStatus function
  const bookings = getAllBookings();
  const booking = bookings.find(b => b.id === bookingId);
  if (booking) {
    booking.status = status;
    localStorage.setItem('BOOKINGS', JSON.stringify(bookings));
    return { success: true };
  }
  return { success: false };
}

function deleteReview(reviewId) {
  // Placeholder for deleteReview function
  const reviews = getAllReviews();
  const updatedReviews = reviews.filter(review => review.id !== reviewId);
  localStorage.setItem('REVIEWS', JSON.stringify(updatedReviews));
  return { success: true };
}
