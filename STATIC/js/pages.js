// Page-Specific Functionality

document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('pricing.html')) {
    initPricingPage();
  } else if (window.location.pathname.includes('employees.html')) {
    initEmployeesPage();
  } else if (window.location.pathname.includes('reviews.html')) {
    initReviewsPage();
  }
});

// Pricing Page
function initPricingPage() {
  setupPricingFilters();
  displayPricingPlans();
}

function setupPricingFilters() {
  const filterButtons = document.querySelectorAll('[data-filter]');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      filterPricingPlans(filter);
    });
  });
}

function displayPricingPlans() {
  const plans = [
    {
      id: 1,
      name: 'Basic Plan',
      price: 2500,
      serviceType: 'Elderly Care',
      features: [
        'Up to 4 hours per day',
        'Weekday service only',
        'Basic medical support',
        'Monthly health check',
        'Emergency contact available'
      ]
    },
    {
      id: 2,
      name: 'Standard Plan',
      price: 5000,
      serviceType: 'Childcare',
      features: [
        'Up to 8 hours per day',
        'Weekday and weekend',
        'Educational activities included',
        'Daily progress reports',
        'Flexible scheduling'
      ]
    },
    {
      id: 3,
      name: 'Premium Plan',
      price: 10000,
      serviceType: 'Both',
      features: [
        '24/7 service availability',
        'Specialized medical care',
        'Round-the-clock monitoring',
        'Priority emergency response',
        'Dedicated caregiver'
      ]
    },
    {
      id: 4,
      name: 'Elderly Specialized',
      price: 7500,
      serviceType: 'Elderly Care',
      features: [
        'Geriatric care specialist',
        'Medication management',
        'Mobility assistance',
        'Regular health monitoring',
        'Family updates included'
      ]
    },
    {
      id: 5,
      name: 'Childcare Plus',
      price: 6500,
      serviceType: 'Childcare',
      features: [
        'Certified childcare professional',
        'Educational programs',
        'Meal preparation',
        'Activity planning',
        'Daily reports with photos'
      ]
    }
  ];

  const container = document.querySelector('[data-pricing-plans]');
  if (!container) return;

  container.innerHTML = plans.map(plan => `
    <div class="pricing-card" data-service="${plan.serviceType}">
      <h3>${plan.name}</h3>
      <div class="price">₹${plan.price.toLocaleString('en-IN')}</div>
      <p class="service-type">${plan.serviceType}</p>
      <ul style="list-style: none; padding: 20px 0; margin: 0;">
        ${plan.features.map(feature => `
          <li style="padding: 8px 0; color: #6b7280;">✓ ${feature}</li>
        `).join('')}
      </ul>
      <a href="booking.html" class="btn btn-primary" style="display: block; text-align: center; width: 100%;">Book Now</a>
    </div>
  `).join('');
}

function filterPricingPlans(filter) {
  const cards = document.querySelectorAll('.pricing-card');
  
  cards.forEach(card => {
    if (filter === 'all' || card.getAttribute('data-service') === filter) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Employees Page
function initEmployeesPage() {
  displayEmployees();
  setupEmployeeFilters();
  setupRatings();
}

function displayEmployees() {
  const employees = [
    {
      id: 1,
      name: 'John Doe',
      specialization: 'Elderly Care',
      experience: 5,
      hourlyRate: 2000,
      availability: 'Available',
      bio: 'Experienced caregiver with a passion for elderly care.'
    },
    {
      id: 2,
      name: 'Jane Smith',
      specialization: 'Childcare',
      experience: 3,
      hourlyRate: 1500,
      availability: 'Busy',
      bio: 'Certified childcare professional with a background in education.'
    },
    {
      id: 3,
      name: 'Emily Johnson',
      specialization: 'Both',
      experience: 7,
      hourlyRate: 2500,
      availability: 'Available',
      bio: 'Specialized in both elderly care and childcare with a focus on round-the-clock support.'
    }
  ]; // Dummy data for illustration purposes

  const container = document.querySelector('[data-employees]');
  
  if (!container) return;

  container.innerHTML = employees.map(emp => `
    <div class="employee-card" data-specialization="${emp.specialization}" data-availability="${emp.availability}">
      <div style="background: linear-gradient(135deg, #1e40af 0%, #0891b2 100%); height: 200px; border-radius: 8px 8px 0 0; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px;">
        ${emp.name.charAt(0)}
      </div>
      <div style="padding: 20px;">
        <h3 style="margin: 0 0 5px 0; font-size: 18px;">${emp.name}</h3>
        <p style="margin: 0 0 10px 0; color: #0891b2; font-weight: 600;">${emp.specialization}</p>
        <div style="margin-bottom: 15px; display: flex; justify-content: space-between; color: #6b7280; font-size: 14px;">
          <span>${emp.experience} years exp.</span>
          <span>₹${emp.hourlyRate}/hour</span>
        </div>
        <div style="margin-bottom: 15px; display: flex; align-items: center; gap: 5px;">
          <span style="color: #fbbf24;">${'★'.repeat(5)}</span>
          <span style="color: #6b7280; font-size: 14px;">5 (${3} reviews)</span>
        </div>
        <p style="margin: 0 0 15px 0; color: #6b7280; font-size: 14px;">${emp.bio}</p>
        <div style="display: flex; gap: 10px;">
          <span class="status-badge status-${emp.availability.toLowerCase().replace(' ', '-')}" style="padding: 5px 10px; border-radius: 4px; font-size: 12px; background: ${emp.availability === 'Available' ? '#d1fae5' : emp.availability === 'Busy' ? '#fef3c7' : '#fee2e2'}; color: ${emp.availability === 'Available' ? '#065f46' : emp.availability === 'Busy' ? '#92400e' : '#7f1d1d'};">
            ${emp.availability}
          </span>
          <a href="booking.html" class="btn btn-primary" style="flex: 1; text-align: center; padding: 5px 10px; font-size: 12px;">Book</a>
        </div>
      </div>
    </div>
  `).join('');
}

function setupEmployeeFilters() {
  const filterButtons = document.querySelectorAll('[data-employee-filter]');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.getAttribute('data-employee-filter');
      filterEmployees(filter);
    });
  });
}

function filterEmployees(filter) {
  const cards = document.querySelectorAll('.employee-card');
  
  cards.forEach(card => {
    if (filter === 'all') {
      card.style.display = 'block';
    } else if (filter === 'available') {
      card.style.display = card.getAttribute('data-availability') === 'Available' ? 'block' : 'none';
    } else {
      card.style.display = card.getAttribute('data-specialization') === filter ? 'block' : 'none';
    }
  });
}

// Reviews Page
function initReviewsPage() {
  displayReviews();
  setupRatings();
  displayAverageRating();
}

function displayReviews() {
  const reviews = [
    {
      id: 1,
      userName: 'Alice',
      serviceType: 'Elderly Care',
      rating: 5,
      comment: 'Great care from John Doe.',
      createdAt: '2023-10-01'
    },
    {
      id: 2,
      userName: 'Bob',
      serviceType: 'Childcare',
      rating: 4,
      comment: 'Jane Smith was very helpful.',
      createdAt: '2023-09-25'
    },
    {
      id: 3,
      userName: 'Charlie',
      serviceType: 'Both',
      rating: 3,
      comment: 'Emily Johnson is reliable.',
      createdAt: '2023-09-30'
    }
  ]; // Dummy data for illustration purposes

  const container = document.querySelector('[data-all-reviews]');
  
  if (!container) return;

  container.innerHTML = reviews.map(review => `
    <div class="review-card" style="border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
        <div>
          <h4 style="margin: 0 0 5px 0; font-size: 16px;">${review.userName}</h4>
          <p style="margin: 0; color: #6b7280; font-size: 14px;">${review.serviceType}</p>
        </div>
        <div style="color: #fbbf24; text-align: right;">
          ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
        </div>
      </div>
      <p style="margin: 10px 0 0 0; color: #374151; line-height: 1.6;">${review.comment}</p>
      <p style="margin: 10px 0 0 0; color: #9ca3af; font-size: 12px;">${formatDate(review.createdAt)}</p>
    </div>
  `).join('');
}

function displayAverageRating() {
  const reviews = [
    {
      id: 1,
      userName: 'Alice',
      serviceType: 'Elderly Care',
      rating: 5,
      comment: 'Great care from John Doe.',
      createdAt: '2023-10-01'
    },
    {
      id: 2,
      userName: 'Bob',
      serviceType: 'Childcare',
      rating: 4,
      comment: 'Jane Smith was very helpful.',
      createdAt: '2023-09-25'
    },
    {
      id: 3,
      userName: 'Charlie',
      serviceType: 'Both',
      rating: 3,
      comment: 'Emily Johnson is reliable.',
      createdAt: '2023-09-30'
    }
  ]; // Dummy data for illustration purposes

  const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;
  
  const ratingElement = document.querySelector('[data-average-rating]');
  if (ratingElement) {
    ratingElement.innerHTML = `
      <div style="text-align: center;">
        <div style="font-size: 48px; font-weight: bold; color: #1e40af; margin-bottom: 10px;">${avgRating.toFixed(1)}</div>
        <div style="color: #fbbf24; font-size: 20px; margin-bottom: 10px;">
          ${'★'.repeat(Math.round(avgRating))}
        </div>
        <p style="color: #6b7280; margin: 0;">Based on ${totalReviews} reviews</p>
      </div>
    `;
  }
}

function setupRatings() {
  const ratingSelects = document.querySelectorAll('select[name="rating"]');
  
  ratingSelects.forEach(select => {
    select.innerHTML = `
      <option value="">Select rating</option>
      <option value="5">5 Stars - Excellent</option>
      <option value="4">4 Stars - Good</option>
      <option value="3">3 Stars - Average</option>
      <option value="2">2 Stars - Poor</option>
      <option value="1">1 Star - Very Poor</option>
    `;
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}
