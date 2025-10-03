/**
 * Popover Element.
 *
 * Notes:
 * - Popovers don't require JavaScript. This one is a contrived
 *   example of dynamically defining an element as a popup and
 *   invoking it with JavaScript
 */
export default function initPopover() {
  const popover = document.getElementById('jsPopover');

  popover.popover = 'manual';

  document.addEventListener('keydown', (event) => {
    if (event.key === '?') {
      // This `if` statement can be simplified as `popover.togglePopover()`
      if (popover.matches(':popover-open')) {
        popover.hidePopover();
      } else {
        popover.showPopover();
      }
    }
  });
}
