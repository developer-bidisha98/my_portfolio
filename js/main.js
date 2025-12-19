document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId.length > 1 && document.querySelector(targetId)) {
        e.preventDefault();
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

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
});
