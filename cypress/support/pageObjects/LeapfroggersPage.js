// Leapfroggers List Page Object
class LeapfroggersPage {
  constructor() {
    this.selectors = {
      addLeapfroggerButton: '[data-cy="add-leapfrogger"]'
    };
  }

  clickAddLeapfrogger() {
    cy.get(this.selectors.addLeapfroggerButton).click();
  }
}

module.exports = { LeapfroggersPage };
