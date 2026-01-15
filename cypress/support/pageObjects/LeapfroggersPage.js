
// Leapfroggers List Page Object
class LeapfroggersPage {
  selectors = {
    addLeapfroggerButton: '[data-cy="add-leapfrogger"]'
  };

  clickAddLeapfrogger() {
    cy.get(this.selectors.addLeapfroggerButton, { timeout: 10000 }).should('be.visible').click();
  }
}

module.exports = { LeapfroggersPage };

