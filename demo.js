/**
 * Demo JavaScript for Accessible HTML Elements
 * Provides minimal interactivity for dialog elements using BEM class selectors
 */

document.addEventListener('DOMContentLoaded', () => {
  // Get dialog elements and buttons using BEM class selectors
  const modalDialog = document.getElementById('modalDialog');
  const nonModalDialog = document.getElementById('nonModalDialog');
  const openModalButton = document.getElementById('openDialog');
  const openNonModalButton = document.getElementById('openNonModalDialog');
  const closeModalButton = document.getElementById('closeModalDialog');
  const closeNonModalButton = document.getElementById('closeNonModalDialog');

  // Modal dialog functionality
  if (openModalButton && modalDialog) {
    openModalButton.addEventListener('click', () => {
      modalDialog.showModal();
    });
  }

  if (closeModalButton && modalDialog) {
    closeModalButton.addEventListener('click', () => {
      modalDialog.close();
    });
  }

  // Non-modal dialog functionality
  if (openNonModalButton && nonModalDialog) {
    openNonModalButton.addEventListener('click', () => {
      nonModalDialog.show();
    });
  }

  if (closeNonModalButton && nonModalDialog) {
    closeNonModalButton.addEventListener('click', () => {
      nonModalDialog.close();
    });
  }

  // Close modal dialog when clicking outside (backdrop click)
  if (modalDialog) {
    modalDialog.addEventListener('click', (event) => {
      // Check if the click was on the backdrop (not the dialog content)
      if (event.target === modalDialog) {
        modalDialog.close();
      }
    });
  }

  // Close non-modal dialog when clicking outside
  if (nonModalDialog) {
    nonModalDialog.addEventListener('click', (event) => {
      if (event.target === nonModalDialog) {
        nonModalDialog.close();
      }
    });
  }

  // Handle form submission in dialogs (prevent default form submission)
  const dialogForms = document.querySelectorAll('.dialog form');
  dialogForms.forEach(form => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      // Close the dialog when form is submitted
      const dialog = form.closest('.dialog');
      if (dialog) {
        dialog.close();
      }
    });
  });

  // Add keyboard navigation enhancements
  document.addEventListener('keydown', (event) => {
    // Close dialogs with Escape key (this is built-in for modal dialogs)
    if (event.key === 'Escape') {
      const openDialogs = document.querySelectorAll('.dialog[open]');
      openDialogs.forEach(dialog => {
        if (dialog.open) {
          dialog.close();
        }
      });
    }
  });

  // Add focus management for better accessibility
  if (modalDialog) {
    modalDialog.addEventListener('close', () => {
      // Return focus to the button that opened the dialog
      if (openModalButton) {
        openModalButton.focus();
      }
    });
  }

  if (nonModalDialog) {
    nonModalDialog.addEventListener('close', () => {
      // Return focus to the button that opened the dialog
      if (openNonModalButton) {
        openNonModalButton.focus();
      }
    });
  }

  // Handle customizable select elements
  const selectElements = document.querySelectorAll('.select');
  selectElements.forEach(select => {
    const button = select.querySelector('.select__button');
    const selectedContent = select.querySelector('.select__selected-content');
    const options = select.querySelectorAll('.select__option');

    // Update selected content when option changes
    select.addEventListener('change', (event) => {
      const selectedOption = event.target.options[event.target.selectedIndex];
      if (selectedContent && selectedOption) {
        selectedContent.textContent = selectedOption.textContent;

        // Add visual feedback
        button.style.borderColor = '#28a745';
        button.style.transition = 'border-color 0.3s ease';

        setTimeout(() => {
          button.style.borderColor = '';
        }, 300);
      }
    });

    // Handle multiple select changes
    if (select.hasAttribute('multiple')) {
      select.addEventListener('change', (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions);
        if (selectedContent) {
          if (selectedOptions.length === 0) {
            selectedContent.textContent = 'Select frameworks';
          } else if (selectedOptions.length === 1) {
            selectedContent.textContent = selectedOptions[0].textContent;
          } else {
            selectedContent.textContent = `${selectedOptions.length} frameworks selected`;
          }
        }
      });
    }

    // Add keyboard navigation support
    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        select.focus();
        select.click();
      }
    });

    // Add focus management
    select.addEventListener('focus', () => {
      button.classList.add('select__button--focused');
    });

    select.addEventListener('blur', () => {
      button.classList.remove('select__button--focused');
    });

    // Handle option selection with visual feedback
    options.forEach(option => {
      option.addEventListener('click', () => {
        // Remove selected class from all options
        options.forEach(opt => opt.removeAttribute('selected'));
        // Add selected class to clicked option
        option.setAttribute('selected', '');
      });
    });
  });

  // Initialize selected content for all selects
  selectElements.forEach(select => {
    const selectedContent = select.querySelector('.select__selected-content');
    const selectedOption = select.querySelector('option[selected]') || select.querySelector('option:first-child');

    if (selectedContent && selectedOption) {
      selectedContent.textContent = selectedOption.textContent;
    }
  });

  // Add interaction feedback for details elements
  const detailsElements = document.querySelectorAll('.details');
  detailsElements.forEach(details => {
    details.addEventListener('toggle', (event) => {
      // Add visual feedback when details are opened/closed
      if (event.target.open) {
        event.target.style.transform = 'scale(1.02)';
        setTimeout(() => {
          event.target.style.transform = 'scale(1)';
        }, 200);
      }
    });
  });

  // Add hover effects for buttons using BEM classes
  const buttons = document.querySelectorAll('.button');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', (event) => {
      event.target.style.transform = 'translateY(-2px)';
    });

    button.addEventListener('mouseleave', (event) => {
      event.target.style.transform = 'translateY(0)';
    });
  });

  // Log accessibility information for demonstration
  console.log('Accessible HTML Elements Demo loaded successfully!');
  console.log('Features demonstrated:');
  console.log('- Details/Summary elements with native keyboard support');
  console.log('- Dialog elements with focus management');
  console.log('- Select elements with full keyboard navigation');
  console.log('- Semantic HTML structure for screen readers');
  console.log('- BEM methodology for maintainable CSS architecture');
});
