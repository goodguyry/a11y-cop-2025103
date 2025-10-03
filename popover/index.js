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
