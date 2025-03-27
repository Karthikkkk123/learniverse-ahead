
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

  // Update theme toggle icon
  updateThemeIcon();

  // Sidebar toggle (desktop)
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    
    // Store sidebar state in localStorage
    const isCollapsed = sidebar.classList.contains('collapsed');
    localStorage.setItem('sidebarCollapsed', isCollapsed);
  });

  // Mobile sidebar toggle
  const mobileSidebarToggle = document.getElementById('mobile-sidebar-toggle');
  
  if (mobileSidebarToggle) {
    mobileSidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('visible');
      
      // Create/remove overlay
      toggleMobileOverlay();
    });
  }

  // Initialize sidebar state from localStorage
  const savedSidebarState = localStorage.getItem('sidebarCollapsed');
  if (savedSidebarState === 'true') {
    sidebar.classList.add('collapsed');
  }

  // Initialize progress bars animation
  setTimeout(() => {
    document.getElementById('xp-progress').style.width = '65%'; // 325/500 XP
  }, 300);

  // Handle click outside sidebar on mobile to close it
  document.addEventListener('click', (e) => {
    const clickedInsideSidebar = sidebar.contains(e.target);
    const clickedOnToggleButton = mobileSidebarToggle && mobileSidebarToggle.contains(e.target);
    const isMobileView = window.innerWidth < 1024;
    const isSidebarVisible = sidebar.classList.contains('visible');
    
    if (isMobileView && isSidebarVisible && !clickedInsideSidebar && !clickedOnToggleButton) {
      sidebar.classList.remove('visible');
      toggleMobileOverlay();
    }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      // On desktop view, remove the 'visible' class and the overlay
      sidebar.classList.remove('visible');
      const overlay = document.querySelector('.mobile-overlay');
      if (overlay) {
        document.body.removeChild(overlay);
      }
    }
  });
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

// Toggle mobile overlay
function toggleMobileOverlay() {
  const existingOverlay = document.querySelector('.mobile-overlay');
  
  if (existingOverlay) {
    document.body.removeChild(existingOverlay);
  } else {
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    document.body.appendChild(overlay);
    
    // Add click event to close sidebar
    overlay.addEventListener('click', () => {
      const sidebar = document.getElementById('sidebar');
      sidebar.classList.remove('visible');
      document.body.removeChild(overlay);
    });
  }
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
