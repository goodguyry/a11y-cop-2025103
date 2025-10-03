/**
 * Dialog Element.
 *
 * Notes:
 * - A dialog displayed by toggling the `open` attribute is rendered as a
 *   non-modal dialog.
 * - While it's possible to show and hide the dialog by toggling the `open`
 *   attribute, this is not recommended.
 *
 * # Modal dialog.
 *
 * Modal dialogs imply `aria-modal="true"` and the browser handles setting the
 * page content behind the modal to `inert`.
 *
 * By default, a dialog invoked via `showModal()` will close on ESC key press.
 *
 * Modal dialogs include a `::backdrop` pseudo-element that can be styled via
 * CSS to obscure the surrounding page content.
 *
 * # Non-modal dialog.
 *
 * Non-modal dialogs imply `aria-modal="false"`.
 *
 * By default, a dialog invoked via `show()` will NOT close on ESC key press.
 * Generally, when the non-modal dialog covers content, it's best to allow
 * users to dismiss it via the ESC key. When this functionality is included,
 * we can signal its support to the user via the `closedby="closerequest"`
 * dialog attribute.
 */
export default function initDialog() {
  // Get dialog elements and buttons using BEM class selectors
  const modalDialog = document.getElementById('modalDialog');
  const nonModalDialog = document.getElementById('nonModalDialog');
  const openModalButton = document.getElementById('openDialog');
  const openNonModalButton = document.getElementById('openNonModalDialog');
  const closeModalButton = modalDialog.querySelector('button');
  const closeNonModalButton = nonModalDialog.querySelector('button');

  /**
   * Handle click events on dialog 'close' button.
   */
  const handleModalClose = (event) => {
    const dialog = event.target.closest('dialog');
    if (dialog?.open) {
      dialog.close();
    }
  };

  /**
   * Modal dialog.
   */

  // Open the modal dialog.
  openModalButton.addEventListener('click', () => {
    modalDialog.showModal();
  });

  // Close the modal dialog.
  closeModalButton.addEventListener('click', handleModalClose);

  /**
   * Close modal dialog when clicking outside.
   *
   * Firefox & Chrome
   * - Only necessary if the dialog element does not include `closedby="any"`.
   * Safari
   * - The dialog does not close on outside click without this, even with `closedby="any"`.
   */
  modalDialog.addEventListener('click', (event) => {
    /*
     * The dialog contents are within a div, whereas the backdrop is within the
     * dialog element itself. This condition verifies the click is on the
     * dialog (backdrop) and not its contents.
     */
    if (event.currentTarget.open && event.target === event.currentTarget) {
      modalDialog.close();
    }
  });

  /**
   * Non-modal dialog.
   */

  // Open the non-modal dialog.
  openNonModalButton.addEventListener('click', () => {
    nonModalDialog.show();
  });

  // Close the non-modal dialog.
  closeNonModalButton.addEventListener('click', handleModalClose);

  // Close dialogs with Escape key (built-in for modal dialogs).
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const openDialogs = document.querySelectorAll('dialog[open]');
      openDialogs.forEach((dialog) => {
        if (dialog.open) {
          dialog.close();
        }
      });
    }
  });

  // Return focus to the button that invoked the dialog
  nonModalDialog.addEventListener('close', () => {
    openNonModalButton.focus();
  });
}
