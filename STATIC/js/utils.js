// Utility Functions and Storage Management

// Local Storage Keys
const STORAGE_KEYS = {
  USERS: 'gc_users',
  BOOKINGS: 'gc_bookings',
  REVIEWS: 'gc_reviews',
  CURRENT_USER: 'gc_current_user',
  EMPLOYEES: 'gc_employees'
};

// Initialize default data
function initializeStorage() {
  // Initialize users
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const defaultUsers = [
      { id: 1, email: 'demo@example.com', password: 'demo123', name: 'John Doe', role: 'customer', phone: '+919876543210' },
      { id: 2, email: 'admin@guardiancare.com', password: 'admin123', name: 'Admin', role: 'admin', phone: '+919876543210' }
    ];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
  }

  // Initialize bookings
  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
    const defaultBookings = [
      { 
        id: 1, 
        userId: 1, 
        serviceType: 'Elderly Care', 
        plan: 'Premium', 
        date: '2024-02-15', 
        time: '10:00', 
        duration: 4, 
        price: 10000, 
        status: 'confirmed', 
        caregiver: 'Priya Sharma',
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(defaultBookings));
  }

  // Initialize reviews
  if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
    const defaultReviews = [
      {
        id: 1,
        userId: 1,
        userName: 'Rajesh Kumar',
        serviceType: 'Elderly Care',
        rating: 5,
        comment: 'Excellent service! Priya was very professional and caring. Highly recommended!',
        createdAt: '2024-01-20'
      },
      {
        id: 2,
        userId: 2,
        userName: 'Priya Verma',
        serviceType: 'Childcare',
        rating: 5,
        comment: 'My kids love Neha! She is patient, fun, and responsible. Perfect choice!',
        createdAt: '2024-01-18'
      },
      {
        id: 3,
        userId: 3,
        userName: 'Amit Singh',
        serviceType: 'Elderly Care',
        rating: 4,
        comment: 'Great service overall. Very punctual and professional.',
        createdAt: '2024-01-15'
      },
      {
        id: 4,
        userId: 4,
        userName: 'Sneha Patel',
        serviceType: 'Childcare',
        rating: 5,
        comment: 'Fantastic! My baby was so comfortable with Anjali. Will book again!',
        createdAt: '2024-01-12'
      },
      {
        id: 5,
        userId: 5,
        userName: 'Vikram Gupta',
        serviceType: 'Both Services',
        rating: 5,
        comment: 'Arjun has been taking care of my elderly mother and our children. Trustworthy and reliable!',
        createdAt: '2024-01-10'
      },
      {
        id: 6,
        userId: 6,
        userName: 'Meera Joshi',
        serviceType: 'Elderly Care',
        rating: 4,
        comment: 'Professional and caring. My mother is very happy with the service.',
        createdAt: '2024-01-08'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(defaultReviews));
  }

  // Initialize employees
  if (!localStorage.getItem(STORAGE_KEYS.EMPLOYEES)) {
    const defaultEmployees = [
      {
        id: 1,
        name: 'Priya Sharma',
        specialization: 'Elderly Care',
        experience: 8,
        rating: 4.9,
        reviews: 45,
        bio: 'Experienced elderly care specialist with certification in geriatric care',
        hourlyRate: 500,
        availability: 'Available'
      },
      {
        id: 2,
        name: 'Rajesh Kumar',
        specialization: 'Childcare',
        experience: 6,
        rating: 4.8,
        reviews: 38,
        bio: 'Certified childcare professional with expertise in child development',
        hourlyRate: 400,
        availability: 'Available'
      },
      {
        id: 3,
        name: 'Anjali Patel',
        specialization: 'Both',
        experience: 10,
        rating: 5.0,
        reviews: 52,
        bio: 'Multi-skilled professional serving both elderly and child care needs',
        hourlyRate: 600,
        availability: 'Busy'
      },
      {
        id: 4,
        name: 'Vikram Singh',
        specialization: 'Elderly Care',
        experience: 7,
        rating: 4.7,
        reviews: 42,
        bio: 'Dedicated elderly care provider with first aid certification',
        hourlyRate: 480,
        availability: 'Available'
      },
      {
        id: 5,
        name: 'Neha Gupta',
        specialization: 'Childcare',
        experience: 5,
        rating: 4.9,
        reviews: 35,
        bio: 'Passionate childcare specialist trained in early childhood education',
        hourlyRate: 380,
        availability: 'Available'
      },
      {
        id: 6,
        name: 'Arjun Verma',
        specialization: 'Both',
        experience: 9,
        rating: 4.8,
        reviews: 48,
        bio: 'Highly experienced in both elderly and childcare services',
        hourlyRate: 550,
        availability: 'On Leave'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(defaultEmployees));
  }
}

// User Management Functions
function registerUser(email, password, name, phone, serviceType) {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS));
  
  if (users.some(u => u.email === email)) {
    return { success: false, message: 'Email already registered' };
  }

  const newUser = {
    id: users.length + 1,
    email,
    password,
    name,
    phone,
    role: 'customer',
    serviceType,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  return { success: true, message: 'Registration successful', user: newUser };
}

function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS));
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return { success: false, message: 'Invalid email or password' };
  }

  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  return { success: true, message: 'Login successful', user };
}

function logoutUser() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

function getCurrentUser() {
  const userJson = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return userJson ? JSON.parse(userJson) : null;
}

function isLoggedIn() {
  return getCurrentUser() !== null;
}

function isAdmin() {
  const user = getCurrentUser();
  return user && user.role === 'admin';
}

// Booking Management Functions
function createBooking(bookingData) {
  const bookings = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS));
  const user = getCurrentUser();

  if (!user) {
    return { success: false, message: 'Please login first' };
  }

  const newBooking = {
    id: bookings.length + 1,
    userId: user.id,
    ...bookingData,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  bookings.push(newBooking);
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  return { success: true, message: 'Booking created successfully', booking: newBooking };
}

function getUserBookings() {
  const user = getCurrentUser();
  if (!user) return [];

  const bookings = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS));
  return bookings.filter(b => b.userId === user.id);
}

function getAllBookings() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS));
}

function updateBookingStatus(bookingId, status) {
  const bookings = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS));
  const booking = bookings.find(b => b.id === bookingId);

  if (!booking) {
    return { success: false, message: 'Booking not found' };
  }

  booking.status = status;
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  return { success: true, message: 'Booking status updated', booking };
}

function cancelBooking(bookingId) {
  return updateBookingStatus(bookingId, 'cancelled');
}

// Review Management Functions
function createReview(reviewData) {
  const reviews = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS));
  const user = getCurrentUser();

  if (!user) {
    return { success: false, message: 'Please login first' };
  }

  const newReview = {
    id: reviews.length + 1,
    userId: user.id,
    userName: user.name,
    ...reviewData,
    createdAt: new Date().toISOString().split('T')[0]
  };

  reviews.push(newReview);
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  return { success: true, message: 'Review posted successfully', review: newReview };
}

function getAllReviews() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS));
}

function deleteReview(reviewId) {
  const reviews = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS));
  const filteredReviews = reviews.filter(r => r.id !== reviewId);
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(filteredReviews));
  return { success: true, message: 'Review deleted' };
}

function getAverageRating() {
  const reviews = getAllReviews();
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return (sum / reviews.length).toFixed(1);
}

// Employee Management Functions
function getEmployees(filter = null) {
  const employees = JSON.parse(localStorage.getItem(STORAGE_KEYS.EMPLOYEES));
  
  if (!filter) return employees;
  
  if (filter.specialization) {
    return employees.filter(e => 
      e.specialization === filter.specialization || e.specialization === 'Both'
    );
  }
  
  if (filter.availability) {
    return employees.filter(e => e.availability === filter.availability);
  }
  
  return employees;
}

function getEmployeeById(id) {
  const employees = JSON.parse(localStorage.getItem(STORAGE_KEYS.EMPLOYEES));
  return employees.find(e => e.id === id);
}

// Utility Helper Functions
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
}

function formatTime(timeString) {
  return timeString;
}

function formatPrice(price) {
  return `₹${price.toLocaleString('en-IN')}`;
}

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    padding: 15px 20px;
    border-radius: 6px;
    z-index: 10000;
    animation: slideIn 0.3s ease-in-out;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-in-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^\+?[1-9]\d{1,14}$/.test(phone.replace(/\s+/g, ''));
}

// Initialize storage when page loads
document.addEventListener('DOMContentLoaded', initializeStorage);
