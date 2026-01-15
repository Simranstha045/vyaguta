const { OfficialInfoPage } = require('../../support/pageObjects/OfficialInfoPage');
const { ProfilePage } = require('../../support/pageObjects/ProfilePage');
const { HistoryPage } = require('../../support/pageObjects/HistoryPage');
const { AppraisersPage } = require('../../support/pageObjects/AppraisersPage');
const { LeapfroggersPage } = require('../../support/pageObjects/LeapfroggersPage');
const { generateRandomEmail, generateRandomUrl } = require('../../support/helpers/Helper');

describe('Add Leapfrogger - Negative Testing', () => {
    let validationErrors;

    before(() => {
        cy.fixture('validationErrors').then((data) => {
            validationErrors = data;
        });
    });

    beforeEach(function() {
        // Authenticate and navigate to add leapfrogger form
        cy.loginViaOAuth();
        cy.visit('/leapfroggers');
        cy.closeReleaseModal();
        
        const leapfroggersPage = new LeapfroggersPage();
        leapfroggersPage.clickAddLeapfrogger();
    });

    it('should validate Official Information step without filling any fields', () => {
        const officialInfoPage = new OfficialInfoPage();

        officialInfoPage.clickStepTitle();
        officialInfoPage.attemptNext();

        // Verify all required field errors
        officialInfoPage.verifyErrorMessage('First Name', validationErrors.officialInfo.firstName);
        officialInfoPage.verifyErrorMessage('Last Name', validationErrors.officialInfo.lastName);
        cy.get('[name="username"]').parents('.input-wrapper').find('.input-wrapper__error', { timeout: 5000 })
          .should('contain', validationErrors.officialInfo.email);
        officialInfoPage.verifyErrorMessage('Department', validationErrors.officialInfo.department);
        officialInfoPage.verifyErrorMessage('Leave Issuer', validationErrors.officialInfo.leaveIssuer);
        officialInfoPage.verifyErrorMessage('Team Manager', validationErrors.officialInfo.teamManager);
        officialInfoPage.verifyFieldError(validationErrors.officialInfo.workingType);
        officialInfoPage.verifyFieldError(validationErrors.officialInfo.profilePicture);
    });

    it('should validate Personal Information step without filling any fields', () => {
        const profilePage = new ProfilePage();

        profilePage.clickStepTitle();
        profilePage.attemptNext();

        // Verify all required field errors
        cy.contains('.input-wrapper__label', 'Gender').parent().find('.input-wrapper__error', { timeout: 5000 })
          .should('contain', validationErrors.personalInfo.gender);
        profilePage.verifyErrorMessage('Date of Birth', validationErrors.personalInfo.dob);
        profilePage.verifyErrorMessage('Blood Group', validationErrors.personalInfo.bloodGroup);
        cy.contains('.input-wrapper__label', 'Marital Status').parent().find('.input-wrapper__error', { timeout: 5000 })
          .should('contain', validationErrors.personalInfo.maritalStatus);
        profilePage.verifyErrorMessage('Personal Email', validationErrors.personalInfo.personalEmail);
        profilePage.verifyErrorMessage('Mobile Number', validationErrors.personalInfo.mobile);
        profilePage.verifyErrorMessage('Emergency Contact', validationErrors.personalInfo.emergencyContact);
        profilePage.verifyErrorMessage('Relationship with emergency contact', validationErrors.personalInfo.emergencyRelation);
        profilePage.verifyErrorMessage('Temporary Address', validationErrors.personalInfo.temporaryAddress);
        profilePage.verifyErrorMessage('Permanent Address', validationErrors.personalInfo.permanentAddress);
        profilePage.verifyErrorMessage('Currently Located at', validationErrors.personalInfo.country);
        profilePage.verifyErrorMessage('Time Zone', validationErrors.personalInfo.timezone);
    });

    it('should validate Leapfrog History step without adding designation and employment status', () => {
        const historyPage = new HistoryPage();

        historyPage.clickStepTitle();
        historyPage.attemptNext();

        // Verify history requirement error
        cy.get('p.label', { timeout: 5000 })
          .should('contain', validationErrors.history.historyRequirement);
    });

    it('should validate Appraisers step without selecting appraisers', () => {
        const appraisersPage = new AppraisersPage();

        appraisersPage.clickStepTitle();
        appraisersPage.attemptSave();

        // Verify appraiser error
        appraisersPage.verifyFieldError('appraiser');
    });
});
