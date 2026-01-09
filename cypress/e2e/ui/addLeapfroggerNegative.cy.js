const { OfficialInfoPage } = require('../../support/pageObjects/OfficialInfoPage');
const { ProfilePage } = require('../../support/pageObjects/ProfilePage');
const { HistoryPage } = require('../../support/pageObjects/HistoryPage');
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
        // Ensure fixture is loaded before each test
        if (!validationErrors) {
            cy.fixture('validationErrors').then((data) => {
                validationErrors = data;
            });
        }

        // Authenticate and navigate to add leapfrogger form
        cy.loginViaOAuth();
        cy.visit('/leapfroggers');
        cy.closeReleaseModal();
        
        const leapfroggersPage = new LeapfroggersPage();
        leapfroggersPage.clickAddLeapfrogger();
    });

    describe('Step 1: Official Information - Validation', () => {
        it('should display validation errors when submitting empty required fields in Step 1', () => {
            const officialInfoPage = new OfficialInfoPage();

            // Try to click Next without filling any required fields
            cy.get('button[type="submit"]').contains('Next').click({ force: true });

            // Verify error messages appear for required fields
            officialInfoPage.verifyErrorMessage('First Name', validationErrors.officialInfo.firstName);
            officialInfoPage.verifyErrorMessage('Last Name', validationErrors.officialInfo.lastName);
            cy.get('[name="username"]').parents('.input-wrapper').find('.input-wrapper__error', { timeout: 5000 }).should('contain', validationErrors.officialInfo.email);
            officialInfoPage.verifyErrorMessage('Department', validationErrors.officialInfo.department);
            officialInfoPage.verifyErrorMessage('Leave Issuer', validationErrors.officialInfo.leaveIssuer);
            officialInfoPage.verifyErrorMessage('Team Manager', validationErrors.officialInfo.teamManager);
            officialInfoPage.verifyFieldError(validationErrors.officialInfo.workingType);
            officialInfoPage.verifyFieldError(validationErrors.officialInfo.profilePicture);
        });

        it('should display error for firstName when left empty', () => {
            const officialInfoPage = new OfficialInfoPage();

            // Fill all fields except firstName
            officialInfoPage.fillBasicInformation('', 'Middle', 'Last', 'January 6, 2026', 'https://test.com', 'test@test.com');

            // Try to submit
            cy.get('button[type="submit"]').contains('Next').click({ force: true });

            // Verify firstName error appears
            officialInfoPage.verifyErrorMessage('First Name', validationErrors.officialInfo.firstName);
        });

        it('should display error for lastName when left empty', () => {
            const officialInfoPage = new OfficialInfoPage();

            // Fill firstName but leave lastName empty
            cy.get('[name="firstName"]').type('Test');
            cy.get('[name="middleName"]').type('Middle');

            // Try to submit
            cy.get('button[type="submit"]').contains('Next').click({ force: true });

            // Verify lastName error appears
            officialInfoPage.verifyErrorMessage('Last Name', validationErrors.officialInfo.lastName);
        });

        it('should display error for email when left empty', () => {
            const officialInfoPage = new OfficialInfoPage();

            // Fill name fields but leave email empty
            cy.get('[name="firstName"]').type('Test');
            cy.get('[name="lastName"]').type('User');

            // Try to submit
            cy.get('button[type="submit"]').contains('Next').click({ force: true });

            // Verify email error appears
            cy.get('[name="username"]').parents('.input-wrapper').find('.input-wrapper__error', { timeout: 5000 }).should('contain', validationErrors.officialInfo.email);
        });

        it('should display error for department when not selected', () => {
            const officialInfoPage = new OfficialInfoPage();

            // Fill basic fields but don't select department
            cy.get('[name="firstName"]').type('Test');
            cy.get('[name="lastName"]').type('User');
            cy.get('[name="username"]').type('test@test.com');

            // Try to submit
            cy.get('button[type="submit"]').contains('Next').click({ force: true });

            // Verify department error appears
            officialInfoPage.verifyErrorMessage('Department', validationErrors.officialInfo.department);
        });

        it('should display error for leave issuer when not selected', () => {
            const officialInfoPage = new OfficialInfoPage();

            // Fill fields including department but not leave issuer
            cy.get('[name="firstName"]').type('Test');
            cy.get('[name="lastName"]').type('User');
            cy.get('[name="username"]').type('test@test.com');
            officialInfoPage.selectDepartment('Operations');

            // Try to submit
            cy.get('button[type="submit"]').contains('Next').click({ force: true });

            // Verify leave issuer error appears
            officialInfoPage.verifyErrorMessage('Leave Issuer', validationErrors.officialInfo.leaveIssuer);
        });

        it('should display error for team manager when not selected', () => {
            const officialInfoPage = new OfficialInfoPage();

            // Fill fields including leave issuer but not team manager
            cy.get('[name="firstName"]').type('Test');
            cy.get('[name="lastName"]').type('User');
            cy.get('[name="username"]').type('test@test.com');
            officialInfoPage.selectDepartment('Operations');
            officialInfoPage.selectLeaveIssuer('Rikesh');

            // Try to submit
            cy.get('button[type="submit"]').contains('Next').click({ force: true });

            // Verify team manager error appears
            officialInfoPage.verifyErrorMessage('Team Manager', validationErrors.officialInfo.teamManager);
        });

        it('should display error for working type when not selected', () => {
            const officialInfoPage = new OfficialInfoPage();

            // Fill all fields except working type
            cy.get('[name="firstName"]').type('Test');
            cy.get('[name="lastName"]').type('User');
            cy.get('[name="username"]').type('test@test.com');
            officialInfoPage.selectDepartment('Operations');
            officialInfoPage.selectLeaveIssuer('Rikesh');
            officialInfoPage.selectTeamManager('Rikesh');

            // Try to submit
            cy.get('button[type="submit"]').contains('Next').click({ force: true });

            // Verify working type error appears
            officialInfoPage.verifyFieldError(validationErrors.officialInfo.workingType);
        });

        it('should display error for profile picture when not uploaded', () => {
            const officialInfoPage = new OfficialInfoPage();

            // Fill all fields except profile picture
            cy.get('[name="firstName"]').type('Test');
            cy.get('[name="lastName"]').type('User');
            cy.get('[name="username"]').type('test@test.com');
            officialInfoPage.selectDepartment('Operations');
            officialInfoPage.selectLeaveIssuer('Rikesh');
            officialInfoPage.selectTeamManager('Rikesh');
            officialInfoPage.selectEmploymentType('Full Time');

            // Try to submit
            cy.get('button[type="submit"]').contains('Next').click({ force: true });

            // Verify profile picture error appears
            officialInfoPage.verifyFieldError(validationErrors.officialInfo.profilePicture);
        });
    });

    describe('Step 2: Personal Information - Validation', () => {
        beforeEach(function() {
            // Complete Step 1 to reach Step 2
            const officialInfoPage = new OfficialInfoPage();
            officialInfoPage.fillBasicInformation('Test', 'User', 'Test', 'January 6, 2026', generateRandomUrl(), generateRandomEmail());
            officialInfoPage.selectDepartment('Operations');
            officialInfoPage.selectLeaveIssuer('Rikesh');
            officialInfoPage.selectTeamManager('Rikesh');
            officialInfoPage.selectRole('Admin');
            officialInfoPage.selectEmploymentType('Full Time');
            officialInfoPage.uploadProfilePicture('C:/Users/user/Downloads/certificates/Profile.jpg');
            officialInfoPage.clickNext();
        });

        it('should display validation errors when submitting empty required fields in Step 2', () => {
            const profilePage = new ProfilePage();

            // First click to attempt navigation
            cy.get('button[type="submit"]').contains('Next').click({ force: true });
            cy.wait(500);
            
            // Second click to trigger error messages
            cy.get('button[type="submit"]').contains('Next').click({ force: true });
            cy.wait(1000);

            // Verify error messages appear for required fields
            cy.get('.input-wrapper__error', { timeout: 5000 }).should('exist');
            cy.get('.error-message, .input-wrapper__error, .form__error').should('have.length.greaterThan', 0);
        });

        it('should display error for gender when not selected', () => {
            // Try to submit without selecting gender
            cy.wait(1000);
            cy.get('button[type="submit"]').contains('Next').should('be.visible').click({ force: true });
            cy.wait(1000);

            // Verify gender error appears
            cy.get('.input-wrapper__error').should('exist').and('contain', 'gender');
        });

        it('should display error for date of birth when left empty', () => {
            const profilePage = new ProfilePage();

            profilePage.selectGender('Male');
            cy.wait(1000);
            // Try to submit
            cy.get('button[type="submit"]').contains('Next').click({ force: true });

            // Verify DOB error appears
            profilePage.verifyErrorMessage('Date of Birth', validationErrors.personalInfo.dob);
        });

        it('should display error for blood group when not selected', () => {
            const profilePage = new ProfilePage();

            profilePage.selectGender('Male');
            profilePage.fillDateOfBirth('January 22, 2005');
             cy.wait(1000);
            // Try to submit
            cy.get('button[type="submit"]').contains('Next').click({ force: true });

            // Verify blood group error appears
            profilePage.verifyErrorMessage('Blood Group', validationErrors.personalInfo.bloodGroup);
        });

        it('should display error for marital status when not selected', () => {
            const profilePage = new ProfilePage();

            profilePage.selectGender('Male');
            profilePage.fillDateOfBirth('January 22, 2005');
            profilePage.selectBloodGroup('A+');
            cy.wait(1000);
            // Try to submit
            cy.get('button[type="submit"]').contains('Next').click({ force: true });

            // Verify marital status error appears
            cy.contains('.input-wrapper__label', 'Marital Status').parent().find('.input-wrapper__error', { timeout: 5000 }).should('contain', validationErrors.personalInfo.maritalStatus);
        });
    });

    describe('Step 3: Leapfrog History - Validation', () => {
        beforeEach(function() {
            // Complete Step 1 and Step 2 to reach Step 3
            const officialInfoPage = new OfficialInfoPage();
            const profilePage = new ProfilePage();

            // Step 1
            officialInfoPage.fillBasicInformation('Test', 'User', 'Test', 'January 6, 2026', generateRandomUrl(), generateRandomEmail());
            officialInfoPage.selectDepartment('Operations');
            officialInfoPage.selectLeaveIssuer('Rikesh');
            officialInfoPage.selectTeamManager('Rikesh');
            officialInfoPage.selectRole('Admin');
            officialInfoPage.selectEmploymentType('Full Time');
            officialInfoPage.uploadProfilePicture('C:/Users/user/Downloads/certificates/Profile.jpg');
            officialInfoPage.clickNext();

            // Step 2
            profilePage.selectGender('Male');
            profilePage.fillDateOfBirth('January 22, 2005');
            profilePage.selectBloodGroup('A+');
            profilePage.selectMaritalStatus('Single');
            profilePage.fillContactInformation('test@test.com', '9876543210');
            profilePage.fillEmergencyContact('9846543210', 'Mother');
            profilePage.fillAddressInformation('Kathmandu', 'Kathmandu');
            profilePage.selectCurrentLocation('Nepal');
            profilePage.selectTimeZone('+05:45');
            profilePage.clickNext();
        });

        it('should display error when trying to proceed without adding designation and employment status', () => {
            // First click to attempt navigation
            cy.get('button[type="submit"]').contains('Next').click({ force: true });
            cy.wait(500);
            
            // Second click to trigger error messages
            cy.get('button[type="submit"]').contains('Next').click({ force: true });
            cy.wait(1000);

            // Verify error message appears in p.label element
            cy.get('p.label', { timeout: 5000 })
              .should('contain', validationErrors.history.historyRequirement);
        });
    });
});
