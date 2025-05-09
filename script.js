document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Mobile menu toggle
  const menuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      menuButton.classList.toggle('open');
    });
  }

  // Gallery modal functionality
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('imageModal');

  if (galleryItems.length > 0 && modal) {
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeButton = document.querySelector('.close-button');

    // Open modal when clicking on gallery item
    galleryItems.forEach(item => {
      item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').getAttribute('src');
        const imgAlt = this.querySelector('img').getAttribute('alt');
        const imgDesc = this.getAttribute('data-description');

        modalImage.src = imgSrc;
        modalTitle.textContent = imgAlt;
        modalDescription.textContent = imgDesc;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
      });
    });

    // Close modal when clicking on close button
    if (closeButton) {
      closeButton.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
      });
    }

    // Close modal when clicking outside the content
    modal.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });

    // Close modal on ESC key press
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Form validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const nameInput = contactForm.querySelector('input[placeholder="Jūsu vārds"]');
      const emailInput = contactForm.querySelector('input[placeholder="Jūsu e-pasts"]');
      const messageInput = contactForm.querySelector('textarea');

      let isValid = true;

      if (!nameInput.value.trim()) {
        highlightInvalid(nameInput);
        isValid = false;
      } else {
        resetHighlight(nameInput);
      }

      if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
        highlightInvalid(emailInput);
        isValid = false;
      } else {
        resetHighlight(emailInput);
      }

      if (!messageInput.value.trim()) {
        highlightInvalid(messageInput);
        isValid = false;
      } else {
        resetHighlight(messageInput);
      }

      if (isValid) {
        // For a real implementation, you would send this data to a server
        alert('Paldies par jūsu ziņojumu! Mēs sazināsimies ar jums tuvākajā laikā.');
        contactForm.reset();
      }
    });
  }

  // Newsletter form validation
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  if (newsletterForms.length > 0) {
    newsletterForms.forEach(form => {
      form.addEventListener('submit', function(event) {
        event.preventDefault();

        const emailInput = form.querySelector('input[type="email"]');

        if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
          highlightInvalid(emailInput);
        } else {
          resetHighlight(emailInput);
          alert('Paldies par pieteikšanos jaunumiem!');
          form.reset();
        }
      });
    });
  }

  // Helper functions
  function highlightInvalid(element) {
    element.style.borderColor = '#e63946';
  }

  function resetHighlight(element) {
    element.style.borderColor = '#ddd';
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
