const { OfficialInfoPage } = require('../../support/pageObjects/OfficialInfoPage');
const { ProfilePage } = require('../../support/pageObjects/ProfilePage');
const { HistoryPage } = require('../../support/pageObjects/HistoryPage');
const { AppraisersPage } = require('../../support/pageObjects/AppraisersPage');
const { LeapfroggersPage } = require('../../support/pageObjects/LeapfroggersPage');
const { DataGenerator } = require('../../support/helpers/DataGenerator');

describe('Add Leapfrogger', () => {
    // Initialize page objects
    const leapfroggersPage = new LeapfroggersPage();
    const officialInfoPage = new OfficialInfoPage();
    const profilePage = new ProfilePage();
    const historyPage = new HistoryPage();
    const appraisersPage = new AppraisersPage();
    let leapfroggerData;


    before(() => {
        // Authenticate before tests
        cy.loginViaOAuth();
    });
    beforeEach(() => {
        // Generate random leapfrogger data for each test
        leapfroggerData = DataGenerator.generateLeapfroggerData();
    });
    // after(() => {
    //     // Optionally, add cleanup steps if needed
    // });

    it('should add a new leapfrogger via UI', () => {

        // Navigate to leapfroggers page
        cy.visit('/leapfroggers');
        cy.closeReleaseModal();

        // Click add leapfrogger button
        leapfroggersPage.clickAddLeapfrogger();


        // ========== STEP 1: OFFICIAL INFORMATION ==========
        officialInfoPage.fillBasicInformation(
            leapfroggerData.officialInfo.firstName,
            leapfroggerData.officialInfo.middleName,
            leapfroggerData.officialInfo.lastName,
            leapfroggerData.officialInfo.joiningDate,
            DataGenerator.generateRandomUrl(),
            DataGenerator.generateRandomEmail()
        );
        officialInfoPage.selectDepartment(leapfroggerData.officialInfo.department);
        officialInfoPage.selectLeaveIssuer(leapfroggerData.officialInfo.leaveIssuer);
        officialInfoPage.selectTeamManager(leapfroggerData.officialInfo.teamManager);
        officialInfoPage.selectRole(leapfroggerData.officialInfo.role);
        officialInfoPage.fillExperience(leapfroggerData.officialInfo.experienceYears, leapfroggerData.officialInfo.experienceMonths);
        officialInfoPage.selectEmploymentType(leapfroggerData.officialInfo.employmentType);
        officialInfoPage.fillCvUrl(leapfroggerData.officialInfo.cvUrl);
        officialInfoPage.uploadProfilePicture(leapfroggerData.officialInfo.profilePicturePath);

        // Wait for upload to complete
        officialInfoPage.verifyImageUploaded();                    
        officialInfoPage.clickNext();
        officialInfoPage.verifyStepCompleted(0);

        // ========== STEP 2: PERSONAL INFORMATION ==========
        profilePage.selectGender(leapfroggerData.personalInfo.gender);
        profilePage.fillDateOfBirth(leapfroggerData.personalInfo.dateOfBirth);
        profilePage.selectBloodGroup(leapfroggerData.personalInfo.bloodGroup);
        profilePage.selectMaritalStatus(leapfroggerData.personalInfo.maritalStatus);
        profilePage.fillContactInformation(leapfroggerData.personalInfo.personalEmail, leapfroggerData.personalInfo.mobilePhone);
        profilePage.fillEmergencyContact(leapfroggerData.personalInfo.emergencyPhone, leapfroggerData.personalInfo.emergencyContactRelationship);
        profilePage.fillAddressInformation(leapfroggerData.personalInfo.temporaryAddress, leapfroggerData.personalInfo.permanentAddress);
        profilePage.selectCurrentLocation(leapfroggerData.personalInfo.currentLocation);
        profilePage.selectTimeZone(leapfroggerData.personalInfo.timeZone);
        profilePage.fillGithubId(leapfroggerData.personalInfo.githubId);
        profilePage.clickNext();
        profilePage.verifyStepCompleted(1);

        // ========== STEP 3: LEAPFROG HISTORY ==========
        historyPage.addDesignation(leapfroggerData.history.designation, leapfroggerData.history.area);
        historyPage.addEmploymentStatus(leapfroggerData.history.employmentStatus);
        // cy.wait(500); // Wait for any async operations
        historyPage.clickNext();
        historyPage.verifyStepCompleted(2);

        // ========== STEP 4: APPRAISERS ==========
        appraisersPage.selectAppraiser(leapfroggerData.appraisers.appraiser);
        appraisersPage.selectCoAppraiser(leapfroggerData.appraisers.coAppraiser);
        // cy.wait(500); // Wait for any async operations
        appraisersPage.verifyStepCompleted(3);

        // ========== SAVE LEAPFROGGER ==========
        appraisersPage.clickSave();

        // Wait for navigation to profile page
        cy.url().should('include', '/leapfroggers/');

        // ========== VERIFY PROFILE PAGE ==========
        profilePage.verifyProfileUrl();

        profilePage.verifyProfileName(
            leapfroggerData.officialInfo.firstName,
            leapfroggerData.officialInfo.middleName,
            leapfroggerData.officialInfo.lastName
        );

        profilePage.verifyProfileDesignation(
            leapfroggerData.history.designation,
            leapfroggerData.history.area
        );

        // Verify Work Info fields
        profilePage.verifyWorkInfoField('Leave Issuer', leapfroggerData.officialInfo.leaveIssuer);
        profilePage.verifyWorkInfoField('Team Manager', leapfroggerData.officialInfo.teamManager);
        profilePage.verifyWorkInfoField('Department', leapfroggerData.officialInfo.department);
        profilePage.verifyWorkInfoField('Working Type', leapfroggerData.officialInfo.employmentType.toLowerCase());
        const yearLabel = parseInt(leapfroggerData.officialInfo.experienceYears) === 1 ? 'year' : 'years';
        const monthLabel = parseInt(leapfroggerData.officialInfo.experienceMonths) === 1 ? 'month' : 'months';
        profilePage.verifyWorkInfoField('Previous Experience', `${leapfroggerData.officialInfo.experienceYears} ${yearLabel} ${leapfroggerData.officialInfo.experienceMonths} ${monthLabel}`);
        profilePage.verifyWorkInfoField('Roles', leapfroggerData.officialInfo.role);
        
        
        // Verify Personal Info fields
        profilePage.verifyPersonalInfoField('Gender', leapfroggerData.personalInfo.gender);
        profilePage.verifyPersonalInfoField('Blood Group', leapfroggerData.personalInfo.bloodGroup);
        profilePage.verifyPersonalInfoField('Temporary Address', leapfroggerData.personalInfo.temporaryAddress);
        profilePage.verifyPersonalInfoField('Permanent Address', leapfroggerData.personalInfo.permanentAddress);
        profilePage.verifyPersonalInfoField('Country', leapfroggerData.personalInfo.currentLocation);
        profilePage.verifyPersonalInfoField('Time Zone', leapfroggerData.personalInfo.timeZone);

        // Verify contact information
        profilePage.verifyMobilePhone(leapfroggerData.personalInfo.mobilePhone);
        profilePage.verifyGithubLink();

        // Verify Employment History
        profilePage.verifyEmploymentHistory(
            leapfroggerData.history.designation,
            leapfroggerData.history.area,
            leapfroggerData.history.employmentStatus
        );
    });
});