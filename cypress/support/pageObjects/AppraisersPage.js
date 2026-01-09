// Appraisers Page Object
class AppraisersPage {
  constructor() {
    this.selectors = {
      nextButton: 'button[type="submit"]'
    };
  }

  selectAppraiser(name) {
    cy.contains('.input-wrapper__label', 'Appraiser').parent().find('input[id^="react-select"]')
      .type(name);
    cy.wait(500);
    cy.contains('.input-wrapper__label', 'Appraiser').parent().find('input[id^="react-select"]')
      .type('{enter}');
  }

  selectCoAppraiser(name) {
    cy.contains('.input-wrapper__label', 'Co Appraiser').parent().find('input[id^="react-select"]')
      .type(name);
    cy.wait(500);
    cy.contains('.input-wrapper__label', 'Co Appraiser').parent().find('input[id^="react-select"]')
      .type('{enter}');
  }

  clickNext() {
    cy.get(this.selectors.nextButton).contains('Next').click({ force: true });
  }

  verifyStepCompleted(stepIndex) {
    cy.get('.stepper__content .steppernavigation').eq(stepIndex)
      .find('.steppernavigation__icon img', { timeout: 10000 })
      .should('have.attr', 'src', '/static/media/circle-check.a69dd430e054d6c72b82c3939f7e4e07.svg');
  }

  clickSave() {
    cy.get('button.btn.btn--primary[type="submit"]').contains('Save').click();
  }
}

module.exports = { AppraisersPage };
