
// Theme handling
document.addEventListener('DOMContentLoaded', () => {
  // Theme initialization
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  const theme = savedTheme || (prefersDarkMode ? 'dark' : 'light');
  setTheme(theme);

  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  });

  // Scroll effect for header
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('bg-white/80', 'dark:bg-gray-900/80', 'backdrop-blur-md', 'shadow-sm');
    } else {
      header.classList.remove('bg-white/80', 'dark:bg-gray-900/80', 'backdrop-blur-md', 'shadow-sm');
    }
  });

  // Update theme toggle icon
  updateThemeIcon();

  // Navigation buttons
  setupNavigationButtons();
  
  // Authentication modal
  setupAuthModal();
});

// Set theme function
function setTheme(theme) {
  const root = document.documentElement;
  
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  
  localStorage.setItem('theme', theme);
  updateThemeIcon();
}

// Update theme toggle icon
function updateThemeIcon() {
  const themeToggle = document.getElementById('theme-toggle');
  const isDark = document.documentElement.classList.contains('dark');
  
  if (themeToggle) {
    // Clear current icon
    themeToggle.innerHTML = '';
    
    // Add appropriate icon
    if (isDark) {
      themeToggle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    } else {
      themeToggle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
    }
  }
}

// Setup navigation buttons
function setupNavigationButtons() {
  // Login button
  const loginBtn = document.getElementById('login-btn');
  if (loginBtn) {
    loginBtn.addEventListener('click', showAuthModal);
  }

  // Get Started buttons
  const getStartedBtn = document.getElementById('get-started-btn');
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => {
      showAuthModal('signup');
    });
  }

  // All signup buttons
  const signupBtns = document.querySelectorAll('.signup-btn');
  signupBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showAuthModal('signup');
    });
  });

  // All guest buttons
  const guestBtns = document.querySelectorAll('.try-guest-btn');
  guestBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navigateToDashboard('guest');
    });
  });
}

// Auth modal setup
function setupAuthModal() {
  const modal = document.getElementById('auth-modal');
  const closeBtn = document.getElementById('close-modal');
  const toggleModeBtn = document.getElementById('toggle-auth-mode');
  const authSubmitBtn = document.getElementById('auth-submit-btn');
  const guestAccessBtn = document.getElementById('guest-access-btn');
  const authModeText = document.getElementById('auth-mode-text');
  
  let currentMode = 'login';

  // Close modal
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }

  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });

  // Toggle between login and signup
  if (toggleModeBtn) {
    toggleModeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentMode = currentMode === 'login' ? 'signup' : 'login';
      updateAuthModalUI(currentMode);
    });
  }

  // Submit auth form
  if (authSubmitBtn) {
    authSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      if (!email || !password) {
        showToast('Please fill in all required fields', 'error');
        return;
      }
      
      // Simulate authentication process
      authSubmitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Processing...
      `;
      
      setTimeout(() => {
        if (currentMode === 'login') {
          showToast('Login successful!', 'success');
        } else {
          showToast('Account created successfully!', 'success');
        }
        
        // Reset button text
        authSubmitBtn.innerHTML = currentMode === 'login' ? 'Sign In' : 'Create Account';
        
        // Close modal and navigate to dashboard
        modal.classList.add('hidden');
        navigateToDashboard('authenticated');
      }, 1500);
    });
  }

  // Guest access
  if (guestAccessBtn) {
    guestAccessBtn.addEventListener('click', () => {
      showToast('Entering as guest. Your progress won\'t be saved.', 'info');
      modal.classList.add('hidden');
      navigateToDashboard('guest');
    });
  }
}

// Show auth modal
function showAuthModal(mode = 'login') {
  const modal = document.getElementById('auth-modal');
  modal.classList.remove('hidden');
  updateAuthModalUI(mode);
}

// Update auth modal UI based on mode
function updateAuthModalUI(mode) {
  const toggleModeBtn = document.getElementById('toggle-auth-mode');
  const authSubmitBtn = document.getElementById('auth-submit-btn');
  const authModeText = document.getElementById('auth-mode-text');
  const confirmPasswordField = document.getElementById('confirm-password');
  
  if (mode === 'login') {
    document.querySelector('#login-form h2').textContent = 'Sign In';
    authSubmitBtn.textContent = 'Sign In';
    authModeText.textContent = 'Don\'t have an account? ';
    toggleModeBtn.textContent = 'Sign up';
    
    // Hide confirm password if it exists
    if (confirmPasswordField) {
      confirmPasswordField.parentElement.style.display = 'none';
    }
  } else {
    document.querySelector('#login-form h2').textContent = 'Create Account';
    authSubmitBtn.textContent = 'Create Account';
    authModeText.textContent = 'Already have an account? ';
    toggleModeBtn.textContent = 'Sign in';
    
    // Add confirm password field if it doesn't exist
    if (!confirmPasswordField) {
      const passwordField = document.querySelector('input[type="password"]').parentElement;
      const confirmPasswordHTML = `
        <div class="space-y-2">
          <label for="confirm-password" class="text-sm font-medium">Confirm Password</label>
          <input id="confirm-password" type="password" placeholder="••••••••" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
        </div>
      `;
      passwordField.insertAdjacentHTML('afterend', confirmPasswordHTML);
    } else {
      confirmPasswordField.parentElement.style.display = 'block';
    }
  }
}

// Navigate to dashboard
function navigateToDashboard(userType) {
  // In a real app, we would redirect to the dashboard
  // For this demo, we're simulating a route change by loading the dashboard HTML
  window.location.href = 'dashboard.html';

  // In a real app with proper routing:
  // window.location.href = '/dashboard';
}

// Toast notification system
function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toast-container');
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerText = message;
  
  toastContainer.appendChild(toast);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.style.animation = 'slide-out-right 0.3s forwards';
    setTimeout(() => {
      toastContainer.removeChild(toast);
    }, 300);
  }, 3000);
}
