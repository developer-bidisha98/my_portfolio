document.addEventListener('DOMContentLoaded', function () {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId.length > 1 && document.querySelector(targetId)) {
        e.preventDefault();
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Mobile navigation toggle
  var navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      var nav = document.getElementById('navbarNav');
      if (!nav) return;
      var toggler = document.querySelector('.navbar-toggler');
      if (toggler && window.getComputedStyle(toggler).display !== 'none') {
        var bsCollapse = bootstrap.Collapse.getInstance(nav) || new bootstrap.Collapse(nav, { toggle: false });
        bsCollapse.hide();
      }
    });
  });

  // Contact form: open mail client with prefilled message
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var formData = new FormData(contactForm);
      var name = formData.get('name') || '';
      var email = formData.get('email') || '';
      var message = formData.get('message') || '';
      var subject = encodeURIComponent('Portfolio inquiry from ' + name);
      var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
      var mailto = 'mailto:bidishahalder678@gmail.com?subject=' + subject + '&body=' + body;
      window.location.href = mailto;
    });
  }

  // Scroll progress indicator
  function updateScrollProgress() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    var scrollPercent = (scrollTop / scrollHeight) * 100;
    var progressBar = document.getElementById('scrollProgressBar');
    if (progressBar) {
      progressBar.style.width = scrollPercent + '%';
    }
  }

  window.addEventListener('scroll', updateScrollProgress);
  updateScrollProgress(); // Initialize on load

  // Fade-in animations on scroll
  function handleScrollAnimations() {
    var elements = document.querySelectorAll('.fade-in');
    elements.forEach(function (element) {
      var rect = element.getBoundingClientRect();
      var windowHeight = window.innerHeight;
      if (rect.top <= windowHeight * 0.8) {
        element.classList.add('visible');
      }
    });
  }

  // Throttle scroll events for better performance
  var scrollTimeout;
  window.addEventListener('scroll', function() {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function() {
        handleScrollAnimations();
        scrollTimeout = null;
      }, 16); // ~60fps
    }
  });

  // Initialize animations on load
  handleScrollAnimations();

  // Animate skill bars on scroll
  function animateSkillBars() {
    var skillBars = document.querySelectorAll('.progress-bar');
    skillBars.forEach(function (bar) {
      var rect = bar.getBoundingClientRect();
      var windowHeight = window.innerHeight;
      if (rect.top <= windowHeight * 0.8 && !bar.classList.contains('animated')) {
        bar.classList.add('animated');
        var width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(function() {
          bar.style.width = width;
        }, 200);
      }
    });
  }

  window.addEventListener('scroll', animateSkillBars);
  animateSkillBars(); // Initialize on load

  // Add loading state to form submission
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      var submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.textContent = 'Sending...';
        // Remove loading state after a delay (since mailto opens immediately)
        setTimeout(function() {
          submitBtn.classList.remove('loading');
          submitBtn.textContent = 'Send Message';
        }, 2000);
      }
    });
  }

  // Add hover effects for better interactivity
  document.querySelectorAll('.project-card').forEach(function(card) {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-6px)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Scroll indicator click handler
  var scrollIndicator = document.getElementById('scrollIndicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      var aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Accessibility: Add focus trap for mobile menu
  var navbarCollapse = document.getElementById('navbarNav');
  if (navbarCollapse) {
    navbarCollapse.addEventListener('shown.bs.collapse', function () {
      var firstFocusable = navbarCollapse.querySelector('a, button');
      if (firstFocusable) firstFocusable.focus();
    });
  }
});
