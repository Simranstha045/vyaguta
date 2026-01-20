// Official Information Page Object
class OfficialInfoPage {
  selectors = {
    firstNameInput: '[name="firstName"]',
    middleNameInput: '[name="middleName"]',
    lastNameInput: '[name="lastName"]',
    dateInput: '#date',
    recruiteeUrlInput: '[name="recruiteeUrl"]',
    usernameInput: '[name="username"]',
    departmentInput: '#react-select-2-input',
    leaveIssuerInput: '#react-select-3-input',
    teamManagerInput: '#react-select-4-input',
    rolesInput: '#react-select-5-input',
    dropdownMenu: '[class$="-menu"]',
    dropdownOption: '[class*="option"]',
    pastExperienceYearsInput: '[name="pastExperienceYears"]',
    pastExperienceMonthsInput: '[name="pastExperienceMonths"]',
    cvUrlInput: 'input[name="cvUrl"]',
    fileInput: 'input[type="file"]',
    nextButton: 'button[type="submit"]',
    errorMessage: '.error-message, .input-wrapper__error, .form__error',
    stepTitle: 'p.title',
    stepperNavigation: '.stepper__content .steppernavigation',
    stepperIcon: '.steppernavigation__icon img',
    completedCheckIcon: '/static/media/circle-check.a69dd430e054d6c72b82c3939f7e4e07.svg',
    imagecontainer: '.image-selected__image-container',
    wrapperLabel: '.input-wrapper__label',
    radioButton: '.radio-label__content'
  };

  fillBasicInformation(firstName, middleName, lastName, date, recruiteeUrl, username) {
    if (firstName) cy.get(this.selectors.firstNameInput).should('be.visible').type(firstName);
    if (middleName) cy.get(this.selectors.middleNameInput).should('be.visible').type(middleName);
    if (lastName) cy.get(this.selectors.lastNameInput).should('be.visible').type(lastName);
    if (date) cy.get(this.selectors.dateInput).should('be.visible').type(date);
    if (recruiteeUrl) cy.get(this.selectors.recruiteeUrlInput).should('be.visible').type(recruiteeUrl);
    if (username) cy.get(this.selectors.usernameInput).should('be.visible').type(username);
  }

  selectDepartment(department) {
    cy.get(this.selectors.departmentInput).should('be.visible').type(`${department}{enter}`);
  }

  selectLeaveIssuer(name) {
    cy.get(this.selectors.leaveIssuerInput).should('be.visible').type(name);
    cy.get(this.selectors.dropdownMenu).should('be.visible').contains(name).click();
  }

  selectTeamManager(name) {
    cy.get(this.selectors.teamManagerInput).should('be.visible').type(name);
    cy.get(this.selectors.dropdownMenu).should('be.visible').contains(name).click();
  }

  selectRole(role) {
    cy.get(this.selectors.rolesInput).should('be.visible').click().type(role);
    cy.get(this.selectors.dropdownOption).should('be.visible').first().click({ force: true });
  }

  fillExperience(years, months) {
    cy.get(this.selectors.pastExperienceYearsInput).should('be.visible').type(years);
    cy.get(this.selectors.pastExperienceMonthsInput).should('be.visible').type(months);
  }

  selectEmploymentType(type) {
    cy.contains(this.selectors.radioButton, type).should('be.visible').click();
  }

  fillCvUrl(url) {
    cy.get(this.selectors.cvUrlInput).should('be.visible').type(url);
  }

  uploadProfilePicture(filePath) {
    cy.get(this.selectors.fileInput).selectFile(filePath, { force: true });
  }

  clickNext() {
    cy.get(this.selectors.nextButton).should('be.visible').should('be.enabled').contains('Next').click({ force: true });
  }

  clickStepTitle() {
    cy.contains(this.selectors.stepTitle, 'Official Information').should('be.visible').click();
  }

  attemptNext() {
    cy.get(this.selectors.nextButton).should('be.visible').contains('Next').click({ force: true });
  }

  verifyStepCompleted(stepIndex) {
    cy.get(this.selectors.stepperNavigation).should('exist').should('be.visible').eq(stepIndex)
      .find(this.selectors.stepperIcon, { timeout: 10000 })
      .should('have.attr', 'src', this.selectors.completedCheckIcon);
  }

    verifyImageUploaded() {
    cy.get(this.selectors.imagecontainer)
      .should('exist')
      .and('be.visible');
  }


  verifyErrorMessage(fieldLabel, expectedMessage) {
    cy.contains(this.selectors.wrapperLabel, fieldLabel)
      .parent()
      .find(this.selectors.errorMessage, { timeout: 5000 })
      .should('contain', expectedMessage);
  }

  verifyFieldError(expectedMessage) {
    cy.get(this.selectors.errorMessage, { timeout: 5000 }).should('contain', expectedMessage);
  }
}

module.exports = { OfficialInfoPage };
