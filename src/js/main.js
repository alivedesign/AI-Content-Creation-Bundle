import { supabase } from './supabase.js';

// Device detection helper
function getDeviceType() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const isTablet = /ipad|android(?!.*mobile)|tablet/i.test(userAgent);

  if (isTablet) return 'tablet';
  if (isMobile) return 'mobile';
  return 'desktop';
}

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

function handleFormSubmit(form, formSource) {
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

    const data = {
      email,
      source: formSource,
      device: getDeviceType()
    };

    // Disable submit button during submission
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';

    try {
      // Submit to Supabase
      await submitEmailToSupabase(data);

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

// Initialize both forms with source tracking
if (heroForm) {
  handleFormSubmit(heroForm, 'hero');
}

if (solutionForm) {
  handleFormSubmit(solutionForm, 'solution');
}

// Submit email to Supabase database
async function submitEmailToSupabase(data) {
  const { error } = await supabase
    .from('email_submissions')
    .insert([
      {
        email: data.email,
        source: data.source,
        device: data.device
      }
    ]);

  if (error) {
    console.error('Supabase error:', error);
    throw new Error(`Failed to save email: ${error.message}`);
  }

  console.log('Email successfully saved to Supabase:', data);
}

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
