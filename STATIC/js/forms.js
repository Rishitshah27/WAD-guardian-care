// Form Handling and Validation

document.addEventListener('DOMContentLoaded', function() {
  setupFormListeners();
});

function setupFormListeners() {
  // Login form
  const loginForm = document.querySelector('form') || null;
  if (loginForm && window.location.pathname.includes('login.html')) {
    loginForm.addEventListener('submit', handleLoginSubmit);
  }

  // Signup form
  if (window.location.pathname.includes('signup.html')) {
    const signupForm = document.querySelector('form');
    if (signupForm) {
      signupForm.addEventListener('submit', handleSignupSubmit);
    }
  }

  // Booking form
  if (window.location.pathname.includes('booking.html')) {
    const bookingForm = document.querySelector('form');
    if (bookingForm) {
      bookingForm.addEventListener('submit', handleBookingSubmit);
    }
  }

  // Review form
  if (window.location.pathname.includes('reviews.html')) {
    const reviewForm = document.querySelector('form');
    if (reviewForm) {
      reviewForm.addEventListener('submit', handleReviewSubmit);
    }
  }
}

// Login Form Handler
function handleLoginSubmit(e) {
  e.preventDefault();

  const email = document.querySelector('input[type="email"]').value.trim();
  const password = document.querySelector('input[type="password"]').value.trim();

  if (!email || !password) {
    showNotification('Please fill all fields', 'error');
    return;
  }

  if (!validateEmail(email)) {
    showNotification('Invalid email format', 'error');
    return;
  }

  const result = loginUser(email, password);

  if (result.success) {
    showNotification('Login successful!');
    setTimeout(() => {
      if (result.user.role === 'admin') {
        window.location.href = 'admin.html';
      } else {
        window.location.href = 'dashboard.html';
      }
    }, 500);
  } else {
    showNotification(result.message, 'error');
  }
}

// Signup Form Handler
function handleSignupSubmit(e) {
  e.preventDefault();

  const firstName = document.querySelector('input[name="firstName"]').value.trim();
  const lastName = document.querySelector('input[name="lastName"]').value.trim();
  const email = document.querySelector('input[name="signupEmail"]').value.trim();
  const phone = document.querySelector('input[name="phone"]').value.trim();
  const password = document.querySelector('input[name="signupPassword"]').value.trim();
  const confirmPassword = document.querySelector('input[name="confirmPassword"]').value.trim();
  const userType = document.querySelector('select[name="userType"]').value;
  const termsCheckbox = document.querySelector('input[name="terms"]').checked;

  // Validation
  if (!firstName || !lastName || !email || !phone || !password || !confirmPassword || !userType) {
    showNotification('Please fill all required fields', 'error');
    return;
  }

  if (!validateEmail(email)) {
    showNotification('Invalid email format', 'error');
    return;
  }

  if (!validatePhone(phone)) {
    showNotification('Invalid phone number', 'error');
    return;
  }

  if (password.length < 6) {
    showNotification('Password must be at least 6 characters', 'error');
    return;
  }

  if (password !== confirmPassword) {
    showNotification('Passwords do not match', 'error');
    return;
  }

  if (!termsCheckbox) {
    showNotification('Please accept terms and conditions', 'error');
    return;
  }

  const fullName = `${firstName} ${lastName}`;
  const result = registerUser(email, password, fullName, phone, userType);

  if (result.success) {
    showNotification('Account created successfully! Redirecting to login...');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
  } else {
    showNotification(result.message, 'error');
  }
}

// Booking Form Handler
function handleBookingSubmit(e) {
  e.preventDefault();

  const user = getCurrentUser();
  if (!user) {
    showNotification('Please login first', 'error');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 500);
    return;
  }

  const serviceType = document.querySelector('select[name="serviceType"]')?.value || '';
  const plan = document.querySelector('select[name="plan"]')?.value || '';
  const date = document.querySelector('input[name="date"]')?.value || '';
  const time = document.querySelector('input[name="time"]')?.value || '';
  const duration = document.querySelector('input[name="duration"]')?.value || '';
  const specialRequirements = document.querySelector('textarea[name="requirements"]')?.value || '';

  if (!serviceType || !plan || !date || !time || !duration) {
    showNotification('Please fill all required fields', 'error');
    return;
  }

  // Get pricing
  const pricingMap = {
    'Basic Plan': 2500,
    'Standard Plan': 5000,
    'Premium Plan': 10000,
    'Elderly Specialized': 7500,
    'Childcare Plus': 6500
  };

  const price = pricingMap[plan] || 0;
  const totalPrice = price * parseInt(duration);

  const bookingData = {
    serviceType,
    plan,
    date,
    time,
    duration: parseInt(duration),
    price: totalPrice,
    specialRequirements,
    caregiver: 'To be assigned'
  };

  const result = createBooking(bookingData);

  if (result.success) {
    showNotification('Booking created successfully!');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1000);
  } else {
    showNotification(result.message, 'error');
  }
}

// Review Form Handler
function handleReviewSubmit(e) {
  e.preventDefault();

  const user = getCurrentUser();
  if (!user) {
    showNotification('Please login first', 'error');
    return;
  }

  const serviceType = document.querySelector('select[name="serviceType"]')?.value || '';
  const rating = document.querySelector('select[name="rating"]')?.value || '';
  const comment = document.querySelector('textarea[name="comment"]')?.value || '';

  if (!serviceType || !rating || !comment) {
    showNotification('Please fill all fields', 'error');
    return;
  }

  if (comment.length < 10) {
    showNotification('Review must be at least 10 characters', 'error');
    return;
  }

  const reviewData = {
    serviceType,
    rating: parseInt(rating),
    comment
  };

  const result = createReview(reviewData);

  if (result.success) {
    showNotification('Review posted successfully!');
    
    // Reset form
    e.target.reset();
    
    // Refresh reviews display
    setTimeout(() => {
      location.reload();
    }, 1000);
  } else {
    showNotification(result.message, 'error');
  }
}

// Generic form input handler
function setFormValue(fieldName, value) {
  const input = document.querySelector(`[name="${fieldName}"]`);
  if (input) {
    input.value = value;
  }
}

function getFormValue(fieldName) {
  const input = document.querySelector(`[name="${fieldName}"]`);
  return input ? input.value : '';
}

// Clear form fields
function clearForm(formSelector = 'form') {
  const form = document.querySelector(formSelector);
  if (form) {
    form.reset();
  }
}

// Disable form submit button
function disableFormSubmit(disabled = true) {
  const button = document.querySelector('button[type="submit"]');
  if (button) {
    button.disabled = disabled;
    button.style.opacity = disabled ? '0.5' : '1';
    button.style.cursor = disabled ? 'not-allowed' : 'pointer';
  }
}

// Declare variables here or import them
function showNotification(message, type = 'success') {
  // Implementation for showNotification
}

function validateEmail(email) {
  // Implementation for validateEmail
}

function loginUser(email, password) {
  // Implementation for loginUser
}

function validatePhone(phone) {
  // Implementation for validatePhone
}

function registerUser(email, password, fullName, phone, userType) {
  // Implementation for registerUser
}

function getCurrentUser() {
  // Implementation for getCurrentUser
}

function createBooking(bookingData) {
  // Implementation for createBooking
}

function createReview(reviewData) {
  // Implementation for createReview
}
