// Leapfrog History Page Object
class HistoryPage {
  selectors = {
    addButton: 'button[class*="add-button"]',
    dropdownMenu: '[class$="-menu"]',
    saveButton: 'button.button.button--primary',
    nextButton: 'button[type="submit"]',
    errorMessage: '.error-message, .input-wrapper__error, .form__error',
    buttonLabel: '.button-label',
    fieldLabel: '.input-wrapper__label',
    addAndCloseButton: '.btn__label',
    stepperNavigation: '.stepper__content .steppernavigation',
    stepperIcon: '.steppernavigation__icon img',
    completedCheckIcon: '/static/media/circle-check.a69dd430e054d6c72b82c3939f7e4e07.svg',
    stepTitle: 'p.title'
  };

  addDesignation(designation, area) {
    cy.contains(this.selectors.buttonLabel, 'Add New Designation').should('be.visible').click({ force: true });
    cy.contains(this.selectors.fieldLabel, 'Designation').should('exist').should('be.visible').parent().find('input[id^="react-select"]').type(`${designation}{enter}`);
    // cy.wait(500); // Wait for area dropdown to populate based on designation
    cy.contains(this.selectors.fieldLabel, 'Area').should('exist').should('be.visible').parent().find('input[id^="react-select"]').should('exist').should('be.visible').type(`${area}{enter}`);
    // cy.wait(500); // Wait for employment status dropdown to populate based on area
    cy.contains(this.selectors.addAndCloseButton, 'Add & Close').click({ force: true });
  }

  addEmploymentStatus(status) {
    cy.contains(this.selectors.buttonLabel, 'Add New Employment Status').should('exist').should('be.visible').click({ force: true });
    cy.contains(this.selectors.fieldLabel, 'Employment Status').should('exist').should('be.visible').parent().find('input[id^="react-select"]').should('exist').should('be.visible').type(`${status}{enter}`);
    cy.contains(this.selectors.addAndCloseButton, 'Add & Close').click({ force: true });
  }

  clickNext() {
     cy.get(this.selectors.nextButton).should('exist').and('be.visible').contains('Next').should('be.visible').should('be.enabled').click({ force: true }).click({ force: true });
  }

  clickStepTitle() {
    cy.contains(this.selectors.stepTitle, 'Leapfrog History').should('exist').should('be.visible').click();
  }

  attemptNext() {
    cy.get(this.selectors.nextButton).contains('Next').click({ force: true });
  }

  verifyStepCompleted(stepIndex) {
    cy.get(this.selectors.stepperNavigation).eq(stepIndex)
      .find(this.selectors.stepperIcon, { timeout: 10000 })
      .should('have.attr', 'src', this.selectors.completedCheckIcon);
  }

  verifyFieldError(expectedMessage) {
    cy.get(this.selectors.errorMessage, { timeout: 5000 }).should('contain', expectedMessage);
  }
}

module.exports = { HistoryPage };
