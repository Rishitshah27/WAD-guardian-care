// Navigation Management

// Declare the variables before using them
function getCurrentUser() {
  // Implementation for getting current user
  return JSON.parse(localStorage.getItem('user'));
}

function logoutUser() {
  // Implementation for logging out user
  localStorage.removeItem('user');
}

function showNotification(message) {
  // Implementation for showing notification
  alert(message);
}

document.addEventListener('DOMContentLoaded', function() {
  updateNavigationState();
  setupNavigation();
});

function updateNavigationState() {
  const user = getCurrentUser();
  const navButtons = document.querySelector('.nav-buttons');
  
  if (!navButtons) return;

  if (user) {
    // User is logged in
    let buttonHTML = '';
    
    if (user.role === 'admin') {
      buttonHTML = `
        <a href="dashboard.html" class="btn btn-secondary">Dashboard</a>
        <a href="admin.html" class="btn btn-secondary">Admin</a>
        <button onclick="handleLogout()" class="btn btn-primary">Logout</button>
      `;
    } else {
      buttonHTML = `
        <a href="dashboard.html" class="btn btn-secondary">Dashboard</a>
        <button onclick="handleLogout()" class="btn btn-primary">Logout</button>
      `;
    }
    
    navButtons.innerHTML = buttonHTML;
  } else {
    // User is not logged in
    const loginBtn = navButtons.querySelector('a[href="login.html"]');
    const signupBtn = navButtons.querySelector('a[href="signup.html"]');
    
    if (loginBtn && signupBtn) {
      // Already has login/signup buttons
      return;
    }
    
    navButtons.innerHTML = `
      <a href="login.html" class="btn btn-secondary">Login</a>
      <a href="signup.html" class="btn btn-primary">Sign Up</a>
    `;
  }
}

function setupNavigation() {
  // Set active nav link
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function handleLogout() {
  logoutUser();
  showNotification('Logged out successfully');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 500);
}
