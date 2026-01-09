// Leapfrog History Page Object
class HistoryPage {
  constructor() {
    this.selectors = {
      addButton: 'button[class*="add-button"]',
      dropdownMenu: '[class$="-menu"]',
      saveButton: 'button.button.button--primary',
      nextButton: 'button[type="submit"]',
      errorMessage: '.error-message, .input-wrapper__error, .form__error'
    };
  }

  addDesignation(designation, area) {
    // Click on Add button for designation
    cy.contains('.button-label', 'Add New Designation').should('be.visible').click({ force: true });
    
    // Select designation from dropdown
    cy.contains('.input-wrapper__label', 'Designation').parent().find('input[id^="react-select"]').type(`${designation}{enter}`);
    
    // Select area from dropdown
    cy.contains('.input-wrapper__label', 'Area').parent().find('input[id^="react-select"]').type(`${area}{enter}`);
    
    // Click Add & Close button
    cy.contains('.btn__label', 'Add & Close').click({ force: true });
  }

  addEmploymentStatus(status) {
    // Click on Add button for employment status
    cy.contains('.button-label', 'Add New Employment Status').should('be.visible').click({ force: true });
    
    // Select status from dropdown
    cy.contains('.input-wrapper__label', 'Employment Status').parent().find('input[id^="react-select"]').type(`${status}{enter}`);
    
    // Click Add & Close button
    cy.contains('.btn__label', 'Add & Close').click({ force: true });
  }

  clickNext() {
    cy.get(this.selectors.nextButton).contains('Next').should('be.visible').should('be.enabled').click({ force: true }).click({ force: true });
  }

  verifyStepCompleted(stepIndex) {
    cy.get('.stepper__content .steppernavigation').eq(stepIndex)
      .find('.steppernavigation__icon img', { timeout: 10000 })
      .should('have.attr', 'src', '/static/media/circle-check.a69dd430e054d6c72b82c3939f7e4e07.svg');
  }

  verifyFieldError(expectedMessage) {
    cy.get(this.selectors.errorMessage, { timeout: 5000 }).should('contain', expectedMessage);
  }
}

module.exports = { HistoryPage };
