// Personal Information Page Object (Profile Page)
class ProfilePage {
  selectors = {
    dateInput: '#date',
    dropdownMenu: '[class$="-menu"]',
    nextButton: 'button.btn.btn--primary[type="submit"]',
    errorMessage: '.error-message, .input-wrapper__error, .form__error',
    personalEmailInput: 'input[name="personalEmail"]',
    mobilePhoneInput: 'input[name="mobilePhone"]',
    emergencyPhoneInput: 'input[name="emergencyPhone"]',
    emergencyRelationshipInput: 'input[name="emergencyContactRelationship"]',
    temporaryAddressInput: 'input[name="temporaryAddress"]',
    permanentAddressInput: 'input[name="permanentAddress"]',
    githubIdInput: 'input[name="githubId"]',
    radioLabel: '.radio-label__content',
    inputLabel: '.input-wrapper__label',
    maritalStatusInput: 'input[name="maritialStatus"]',
    reactSelectInput: 'input[id^="react-select"]',
    stepperNavigation: '.stepper__content .steppernavigation',
    stepperIcon: '.steppernavigation__icon img',
    completedCheckIcon: '/static/media/circle-check.a69dd430e054d6c72b82c3939f7e4e07.svg',
    stepTitle: 'p.title',
    // Profile View Selectors
    profileHeader: '.profile-info .font-24.font-bold',
    profileDesignation: '.designation-name',
    workInfoCard: '.full-scope-card.emp-info-container',
    personalInfoCard: '.full-scope-card.emp-info-container',
    employeeContact: '.employee-contact',
    employmentHistoryCard: '.full-scope-card.emp-history-area',
    fieldLabel: '.emp-detail-name',

    fieldValue: '.emp-profile-info',
    designationTitle: '.designation-title',
    engagementStatus: '.engagement-status',
    phoneLink: 'a[href*="tel:"]',
    githubLink: 'a[href*="github"]'
  };

  selectGender(gender) {
    cy.contains(this.selectors.radioLabel, gender, { timeout: 10000 }).should('be.visible').click();
  }

  fillDateOfBirth(date) {
    cy.get(this.selectors.dateInput).type(date);
  }

  selectBloodGroup(bloodGroup) {
    cy.contains(this.selectors.inputLabel, 'Blood Group').parent().find(this.selectors.reactSelectInput).type(bloodGroup);
    cy.get(this.selectors.dropdownMenu).should('be.visible');
    cy.contains(this.selectors.dropdownMenu, bloodGroup).click();
  }

  selectMaritalStatus(maritalStatus) {
    cy.get(`${this.selectors.maritalStatusInput}[value="${maritalStatus}"]`).check({ force: true });
  }

  fillContactInformation(email, phone) {
    cy.get(this.selectors.personalEmailInput).type(email);
    cy.get(this.selectors.mobilePhoneInput).type(phone);
  }

  fillEmergencyContact(phone, relationship) {
    cy.get(this.selectors.emergencyPhoneInput).type(phone);
    cy.get(this.selectors.emergencyRelationshipInput).type(relationship);
  }

  fillAddressInformation(temporaryAddress, permanentAddress) {
    cy.get(this.selectors.temporaryAddressInput).type(temporaryAddress);
    cy.get(this.selectors.permanentAddressInput).type(permanentAddress);
  }

  selectCurrentLocation(location) {
    cy.contains(this.selectors.inputLabel, 'Currently Located at').parent().find(this.selectors.reactSelectInput).type(`${location}{enter}`);
  }

  selectTimeZone(timeZone) {
    cy.contains(this.selectors.inputLabel, 'Time Zone').parent().find(this.selectors.reactSelectInput).type(`${timeZone}{enter}`);
  }

  fillGithubId(githubId) {
    cy.get(this.selectors.githubIdInput).type(githubId);
  }

  clickNext() {
    cy.get(this.selectors.nextButton)
      .contains('Next')
      .should('be.visible')
      .should('be.enabled')
      .click({ force: true });
  }

  clickStepTitle() {
    cy.contains(this.selectors.stepTitle, 'Personal Information').should('be.visible').click();
  }

  attemptNext() {
    cy.get(this.selectors.nextButton).contains('Next').click({ force: true });
  }

  verifyStepCompleted(stepIndex) {
    cy.get(this.selectors.stepperNavigation).eq(stepIndex)
      .find(this.selectors.stepperIcon, { timeout: 10000 })
      .should('have.attr', 'src', this.selectors.completedCheckIcon);
  }

  verifyErrorMessage(fieldLabel, expectedMessage) {
      cy.contains(this.selectors.inputLabel, fieldLabel)
        .parent()
        .find(this.selectors.errorMessage, { timeout: 5000 })
        .should('be.visible')
        .and('contain', expectedMessage);
  }

  verifyFieldError(expectedMessage) {
    cy.get(this.selectors.errorMessage, { timeout: 5000 }).should('contain', expectedMessage);
  }

  // Profile View Verification Methods
  verifyProfileUrl() {
    cy.url().should('include', '/leapfroggers/');
  }

  verifyProfileName(firstName, middleName, lastName) {
    cy.get(this.selectors.profileHeader).should('contain', `${firstName} ${middleName} ${lastName}`);
  }

  verifyProfileDesignation(designation, area) {
    cy.get(this.selectors.profileDesignation).should('contain', `${designation}, ${area}`);
  }

  verifyWorkInfoField(fieldName, expectedValue) {
    cy.get(this.selectors.workInfoCard).first().within(() => {
      cy.contains(this.selectors.fieldLabel, fieldName, { timeout: 5000 })
        .should('be.visible')
        .parent()
        .within(() => {
          cy.get(this.selectors.fieldValue).should('contain', expectedValue);
        });
    });
  }

  verifyPersonalInfoField(fieldName, expectedValue) {
    cy.get(this.selectors.personalInfoCard).eq(1).within(() => {
      cy.contains(this.selectors.fieldLabel, fieldName).parent().within(() => {
        cy.get(this.selectors.fieldValue).should('contain', expectedValue);
      });
    });
  }

  verifyMobilePhone(phoneNumber) {
    cy.get(this.selectors.employeeContact).within(() => {
      cy.get(this.selectors.phoneLink).should('contain', phoneNumber);
    });
  }

  verifyGithubLink() {
    cy.get(this.selectors.employeeContact).within(() => {
      cy.get(this.selectors.githubLink).should('be.visible');
    });
  }

  verifyEmploymentHistory(designation, area) {
    cy.get(this.selectors.employmentHistoryCard).within(() => {
      cy.get(this.selectors.designationTitle).should('contain', `${designation}, ${area}`);
    });
  }
}

module.exports = { ProfilePage };
