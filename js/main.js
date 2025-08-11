// Scroll to top when logo clicked
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Theme toggle functionality
function toggleTheme() {
  const body = document.body;
  const isDarkMode = body.classList.contains('dark-mode');
  
  if (isDarkMode) {
    body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  }
}

// Initialize theme on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Apply saved theme or system preference
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
  }
  
  // Add click event listener to theme toggle button
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  // Navbar collapse/expand functionality
  const header = document.querySelector('header');
  let lastScrollTop = 0;
  let scrollThreshold = 50; // Reduced threshold for more responsive behavior
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDelta = scrollTop - lastScrollTop;
    
    // Only trigger if scroll distance is significant
    if (Math.abs(scrollDelta) > scrollThreshold) {
      if (scrollDelta > 0 && scrollTop > 150) {
        // Scrolling down - collapse navbar
        header.classList.remove('expanded');
        header.classList.add('collapsed');
      }
      lastScrollTop = scrollTop;
    }
    
    // Expand navbar only when at top
    if (scrollTop < 100) {
      header.classList.remove('collapsed');
      header.classList.add('expanded');
    } else {
      // Keep collapsed when not at top
      header.classList.remove('expanded');
      header.classList.add('collapsed');
    }
  });
  
  // Scroll to top button functionality
  const scrollTopBtn = document.querySelector('.scroll-top');
  
  // Show/hide scroll to top button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });
  
  // Smooth scroll to top when button is clicked
  scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById('nav-toggle');
  const navbar = document.getElementById('navbar');

  navToggle.addEventListener('click', () => {
    navbar.classList.toggle('open');
  });

  // Optionally close nav when a link is clicked
  navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('open');
    });
  });
});