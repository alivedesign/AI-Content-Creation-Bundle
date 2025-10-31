// Form handling
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message') || ''
    };

    // Disable submit button during submission
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';

    try {
      // Simulate API call - Replace this with your actual API endpoint
      await simulateAPICall(data);

      // Show success message
      showMessage('Thank you! We\'ll be in touch soon.', 'success');

      // Reset form
      form.reset();
    } catch (error) {
      // Show error message
      showMessage('Oops! Something went wrong. Please try again.', 'error');
      console.error('Form submission error:', error);
    } finally {
      // Re-enable submit button
      submitButton.disabled = false;
      submitButton.textContent = 'Join Waitlist';
    }
  });
}

// Show message helper
function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = `form__message visible ${type}`;

  // Hide message after 5 seconds
  setTimeout(() => {
    formMessage.classList.remove('visible');
  }, 5000);
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
