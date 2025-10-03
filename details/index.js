/**
 * JS for Details element.
 */
export default function initDetails() {
  const detailsWrapper = document.querySelector('.details__wrapper');
  const detailsElements = document.querySelectorAll('details');

  /**
   * When one details opens, close other open details elements.
   */
  const handleToggle = (event) => {
    if (event.oldState === 'closed') {
      detailsElements.forEach((details) => {
        if (details !== event.target) {
          details.open = false;
        }
      });
    }
  };

  detailsWrapper.addEventListener('toggle', handleToggle, { capture: true });

  /**
   * Check for a hash in the URL and open the corresponding details.
  */
 function disclosureHashCheck() {
   const hash = window.location.hash.replace('#', '');
   const details = document.getElementById(hash);

   if (null !== details && details instanceof HTMLDetailsElement) {
      details.open = true;
    }
  }

  window.addEventListener('load', disclosureHashCheck);
  window.addEventListener('hashchange', disclosureHashCheck);
}
