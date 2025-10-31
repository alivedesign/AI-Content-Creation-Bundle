// Modal handling
const modal = document.getElementById('confirmationModal');
const modalCloseButton = document.getElementById('modalCloseButton');
const modalOverlay = modal?.querySelector('.modal__overlay');

function showModal() {
  if (modal) {
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }
}

function hideModal() {
  if (modal) {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }
}

// Close modal on button click
modalCloseButton?.addEventListener('click', hideModal);

// Close modal on overlay click
modalOverlay?.addEventListener('click', hideModal);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal?.classList.contains('is-active')) {
    hideModal();
  }
});

// Form handling for both forms
const heroForm = document.getElementById('heroForm');
const solutionForm = document.getElementById('solutionForm');

function handleFormSubmit(form) {
  const emailInput = form.querySelector('input[type="email"]');

  // Mark input as touched on blur for validation
  emailInput.addEventListener('blur', () => {
    if (emailInput.value.length > 0) {
      emailInput.classList.add('touched');
    }
  });

  // Remove touched class on focus to reset validation state
  emailInput.addEventListener('focus', () => {
    emailInput.classList.remove('touched');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const email = formData.get('email');

    // Check HTML5 validity
    if (!emailInput.checkValidity()) {
      emailInput.classList.add('touched');
      emailInput.focus();
      return;
    }

    const data = { email };

    // Disable submit button during submission
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';

    try {
      // Simulate API call - Replace this with your actual API endpoint
      await simulateAPICall(data);

      // Show confirmation modal
      showModal();

      // Reset form and clear states
      form.reset();
      emailInput.classList.remove('touched');
    } catch (error) {
      // Show error state
      emailInput.classList.add('touched');
      emailInput.setCustomValidity('Submission failed. Please try again.');
      emailInput.reportValidity();
      emailInput.setCustomValidity('');
      console.error('Form submission error:', error);
    } finally {
      // Re-enable submit button
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}

// Initialize both forms
if (heroForm) {
  handleFormSubmit(heroForm);
}

if (solutionForm) {
  handleFormSubmit(solutionForm);
}

// Simulate API call (replace with your actual API endpoint)
function simulateAPICall(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Log the data (in production, you'd send this to your backend)
      console.log('Form submitted:', data);

      // Simulate success (90% success rate for demo)
      if (Math.random() > 0.1) {
        resolve();
      } else {
        reject(new Error('Random error for demo'));
      }
    }, 1500);
  });
}

// TODO: Replace simulateAPICall with your actual API integration
// Example with fetch:
/*
async function submitToAPI(data) {
  const response = await fetch('https://your-api-endpoint.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('API request failed');
  }

  return response.json();
}
*/

// Smooth scroll for anchor links (if you add navigation)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

console.log('App initialized successfully!');
