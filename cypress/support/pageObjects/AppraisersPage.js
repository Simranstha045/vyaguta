
// Appraisers Page Object
class AppraisersPage {
  selectors = {
    nextButton: 'button[type="submit"]',
    stepperNavigation: '.stepper__content .steppernavigation',
    stepperIcon: '.steppernavigation__icon img',
    completedCheckIcon: '/static/media/circle-check.a69dd430e054d6c72b82c3939f7e4e07.svg',
    saveButton: 'button.btn.btn--primary[type="submit"]',
    stepTitle: 'p.title',
    errorMessage: '.input-wrapper__error',
    dropdownSelector: 'input[id^="react-select"]',
    dropdownMenu: '[class$="-menu"]'
  };

  selectAppraiser(name) {
    cy.intercept('GET', '**api/core/users*').as('searchUser');
    cy.contains('.input-wrapper__label', 'Appraiser').parent().find(this.selectors.dropdownSelector)
      .type(name);
     cy.wait('@searchUser').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
       
      // Get API response data
      const users = interception.response.body.data;
      expect(users).to.be.an('array').and.not.be.empty;
      
      // Find the user in API response
      const matchedUser = users.find(
        (u) => u.firstName?.toLowerCase().includes(name.toLowerCase()) ||
        `${u.firstName} ${u.middleName} ${u.lastName}`.toLowerCase().includes(name.toLowerCase())
      );
      expect(matchedUser, `User matching "${name}" should exist in API response`).to.exist;
      
      // Verify the user appears in the dropdown UI
      const fullName = `${matchedUser.firstName} ${matchedUser.middleName} ${matchedUser.lastName}`;
      cy.get(this.selectors.dropdownMenu).should('be.visible').within(() => {
        cy.contains(fullName).should('be.visible');
      });
      
      // Select the user
      cy.get(this.selectors.dropdownSelector).eq(0).type('{enter}');
    });
  }

  selectCoAppraiser(name) {
    cy.intercept('GET', '**api/core/users*').as('searchUser');
    cy.contains('.input-wrapper__label', 'Co Appraiser').parent().find(this.selectors.dropdownSelector)
      .type(name);
    cy.wait('@searchUser').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      
      // Get API response data
      const users = interception.response.body.data;
      expect(users).to.be.an('array').and.not.be.empty;
      
      // Find the user in API response
      const matchedUser = users.find(
        (u) => u.firstName?.toLowerCase().includes(name.toLowerCase()) ||
               `${u.firstName}${u.lastName}`.toLowerCase().includes(name.toLowerCase())
      );
      expect(matchedUser, `User matching "${name}" should exist in API response`).to.exist;
      
      // Verify the user appears in the dropdown UI
      const fullName = `${matchedUser.firstName} ${matchedUser.lastName}`;
      cy.get(this.selectors.dropdownMenu).should('be.visible').within(() => {
        cy.contains(fullName).should('be.visible');
      });
      
      // Select the user
      cy.get(this.selectors.dropdownSelector).eq(1).type('{enter}');
    });
  }

  clickNext() {
    cy.get(this.selectors.nextButton).should('be.visible').contains('Next').click();
  }

  clickStepTitle() {
    cy.contains(this.selectors.stepTitle, 'Appraisers').should('be.visible').click();
  }

  attemptSave() {
    cy.get(this.selectors.saveButton).contains('Save').click({ force: true });
  }

  verifyStepCompleted(stepIndex) {
    cy.get(this.selectors.stepperNavigation).should('exist').should('be.visible').eq(stepIndex)
      .find(this.selectors.stepperIcon, { timeout: 10000 })
      .should('have.attr', 'src', this.selectors.completedCheckIcon);
  }

  verifyFieldError(expectedMessage) {
    cy.get(this.selectors.errorMessage, { timeout: 5000 }).should('contain', expectedMessage);
  }

  clickSave() { 
    cy.get(this.selectors.saveButton).should('be.visible').should('exist').contains('Save').click({ force: true });
  }
}

module.exports = { AppraisersPage };

