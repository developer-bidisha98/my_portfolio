// Toast notification system
function showToast(message, type) {
  type = type || 'success';
  var toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.className = 'toast-notification show ' + type;

  setTimeout(function () {
    toast.classList.remove('show');
  }, 3000);
}

// Sticky navbar effect
window.addEventListener('scroll', function () {
  var navbar = document.querySelector('.sticky-navbar');
  if (navbar) {
    if (window.pageYOffset > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

// Animate counters in About section
function animateCounters() {
  var statNumbers = document.querySelectorAll('.stat-number');

  statNumbers.forEach(function (stat) {

    // Prevent animation from running multiple times
    if (stat.dataset.animated === "true") return;

    var rect = stat.getBoundingClientRect();

    if (rect.top < window.innerHeight) {

      stat.dataset.animated = "true";

      var finalValue = stat.textContent;
      var isPercentage = finalValue.includes('%');
      var isDecimal = finalValue.includes('.');
      var numValue = parseFloat(finalValue);

      var currentValue = 0;
      var increment = numValue / 40;

      var counter = setInterval(function () {

        currentValue += increment;

        if (currentValue >= numValue) {
          stat.textContent = finalValue;
          clearInterval(counter);
        } else {

          if (isPercentage) {
            stat.textContent = Math.ceil(currentValue) + "%";
          }
          else if (isDecimal) {
            stat.textContent = currentValue.toFixed(1) + "+";
          }
          else {
            stat.textContent = Math.ceil(currentValue) + "+";
          }

        }

      }, 40);

    }

  });
}

window.addEventListener('scroll', function () {
  requestAnimationFrame(animateCounters);
});

// Copy email to clipboard
var copyEmailBtn = document.getElementById('copyEmailBtn');
if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', function (e) {
    e.preventDefault();
    var email = 'bidishahalder678@gmail.com';
    navigator.clipboard.writeText(email).then(function () {
      showToast('Email copied to clipboard!', 'success');
      copyEmailBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
      setTimeout(function () {
        copyEmailBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>';
      }, 2000);
    }).catch(function () {
      showToast('Failed to copy email', 'error');
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  animateCounters();
  // typeWriter();

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId.length > 1 && document.querySelector(targetId)) {
        e.preventDefault();
        var targetElement = document.querySelector(targetId);
        var headerOffset = 80;
        var elementPosition = targetElement.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
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

  // ===== BACK TO TOP BUTTON =====
  var backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }



  // ===== ACTIVE NAVIGATION HIGHLIGHTING =====
  function updateActiveNav() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    var windowHeight = window.innerHeight;
    var currentScroll = window.pageYOffset;

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop - 100;
      var sectionHeight = section.offsetHeight;

      if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
        var sectionId = section.getAttribute('id');
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  // ===== FORM VALIDATION =====
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    var inputs = contactForm.querySelectorAll('.form-control');
    inputs.forEach(function (input) {
      input.addEventListener('blur', function () {
        validateField(this);
      });
      input.addEventListener('input', function () {
        if (this.classList.contains('is-invalid')) {
          validateField(this);
        }
      });
    });
  }

  function validateField(field) {
    var isValid = true;
    var errorMsg = field.parentElement.querySelector('.form-error');

    if (field.name === 'name') {
      isValid = field.value.trim().length > 0;
      if (errorMsg) errorMsg.textContent = 'Name is required';
    } else if (field.name === 'email') {
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(field.value);
      if (errorMsg) errorMsg.textContent = 'Valid email is required';
    } else if (field.name === 'message') {
      isValid = field.value.trim().length > 0;
      if (errorMsg) errorMsg.textContent = 'Message cannot be empty';
    }

    if (!isValid) {
      field.classList.add('is-invalid');
      if (errorMsg) errorMsg.classList.add('show');
    } else {
      field.classList.remove('is-invalid');
      if (errorMsg) errorMsg.classList.remove('show');
    }

    return isValid;
  }

  // ===== CONTACT FORM WITH MAILTO =====
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Validate all fields
      var allInputs = contactForm.querySelectorAll('.form-control');
      var allValid = true;
      allInputs.forEach(function (input) {
        if (!validateField(input)) {
          allValid = false;
        }
      });

      if (!allValid) {
        showToast('Please fix the errors above', 'error');
        return;
      }

      var formData = new FormData(contactForm);
      var name = formData.get('name') || '';
      var email = formData.get('email') || '';
      var message = formData.get('message') || '';
      var subject = encodeURIComponent('Portfolio inquiry from ' + name);
      var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
      var mailto = 'mailto:bidishahalder678@gmail.com?subject=' + subject + '&body=' + body;
      window.location.href = mailto;

      // Show success message
      var submitBtn = document.getElementById('submitBtn');
      var formMessage = document.getElementById('formMessage');
      if (submitBtn && formMessage) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Opening email client...';
        formMessage.textContent = 'Email client opened! Please complete sending the email.';
        formMessage.classList.add('success');
        formMessage.classList.remove('error');
        formMessage.style.display = 'block';

        setTimeout(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
          formMessage.style.display = 'none';
        }, 3000);
      }
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
  updateScrollProgress();

  // ===== PROJECT SEARCH/FILTER =====
    var projectSearch = document.getElementById('projectSearch');

if (projectSearch) {

  var projectItems = document.querySelectorAll('.project-item');
  var projectGroups = document.querySelectorAll('.project-group');
  var projectsContainer = document.querySelector('.projects-container');

  // Create message once
  var noResultsMessage = document.createElement('div');
  noResultsMessage.className = 'no-results-message';
  noResultsMessage.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.35-4.35"></path>
    </svg>
    <p><strong>No projects found</strong></p>
    <p>Try searching with different keywords</p>
  `;

  noResultsMessage.style.display = "none";
  projectsContainer.appendChild(noResultsMessage);

  projectSearch.addEventListener('keyup', function () {

    var searchQuery = this.value.toLowerCase();
    var visibleCount = 0;

    projectItems.forEach(function (item) {

      var projectTitle = item.querySelector('.project-title').textContent.toLowerCase();
      var projectDesc = item.querySelector('.project-desc').textContent.toLowerCase();

      var techBadges = Array.from(item.querySelectorAll('.tech-badge'))
        .map(function (badge) {
          return badge.textContent.toLowerCase();
        }).join(' ');

      var matchesSearch =
        projectTitle.includes(searchQuery) ||
        projectDesc.includes(searchQuery) ||
        techBadges.includes(searchQuery);

      if (searchQuery === '' || matchesSearch) {

        item.style.display = 'block';
        item.style.opacity = '1';
        visibleCount++;

      } else {

        item.style.display = 'none';
        item.style.opacity = '0';

      }

    });

    // Show or hide "no results"
    if (searchQuery !== '' && visibleCount === 0) {
      noResultsMessage.style.display = "block";
    } else {
      noResultsMessage.style.display = "none";
    }

    // Show or hide groups
    projectGroups.forEach(function (group) {

      var visibleInGroup = Array.from(group.querySelectorAll('.project-item'))
        .filter(function (item) {
          return item.style.display !== 'none';
        }).length;

      group.style.display = visibleInGroup === 0 ? 'none' : 'block';

    });

  });

}

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
  window.addEventListener('scroll', function () {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function () {
        handleScrollAnimations();
        scrollTimeout = null;
      }, 16); // ~60fps
    }
  });

  // Initialize animations on load
  handleScrollAnimations();

  // Animate skill bars on scroll
  function animateSkillBars() {
    var skillBars = document.querySelectorAll('.progress-fill');
    skillBars.forEach(function (bar) {
      var rect = bar.getBoundingClientRect();
      var windowHeight = window.innerHeight;
      if (rect.top <= windowHeight * 0.8 && !bar.classList.contains('animated')) {
        bar.classList.add('animated');
        var width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(function () {
          bar.style.width = width;
        }, 200);
      }
    });
  }

  window.addEventListener('scroll', animateSkillBars);
  animateSkillBars();

  // Scroll indicator click handler
  var scrollIndicator = document.getElementById('scrollIndicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function () {
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
