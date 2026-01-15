const { faker } = require('@faker-js/faker');

class DataGenerator {
  // Valid options from API responses
  static departments = ['Operations', 'Operation - Support', 'Engineering', 'Sales', 'Administration/Accounts', 'Human Resource'];
  static bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  static genders = ['Male', 'Female', 'Other'];
  static maritalStatuses = ['Single', 'Married'];
  static employmentTypes = ['Full Time', 'Part Time'];
  static designations = ['Associate Software Engineer', 'Software Engineer', 'Senior Software Engineer', 'Lead Software Engineer', 'QA Engineer', 'Senior QA Engineer'];
  static areas = ['IT', 'Engineering', 'Operations', 'Data', 'QA'];
  static employmentStatuses = ['Permanent'];
  static timeZones = ['+05:45', '+05:30', '+00:00', '-05:00', '+08:00'];
  static countries = ['Nepal', 'India', 'UK', 'Australia'];
  static roles = ['Spearhead', 'Leadership', 'Management'];

  static generateLeapfroggerData(overrides = {}) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName().replace(/-/g, '');
    const middleName = faker.person.middleName();

    return {
      officialInfo: {
        firstName: overrides.firstName || firstName,
        middleName: overrides.middleName || middleName,
        lastName: overrides.lastName || lastName,
        joiningDate: overrides.joiningDate || this.generateDateString(),
        department: overrides.department || this.getRandomItem(this.departments),
        leaveIssuer: overrides.leaveIssuer || 'Rikesh', // Keep existing users for now
        teamManager: overrides.teamManager || 'Rikesh',
        role: overrides.role || this.getRandomItem(this.roles),
        experienceYears: overrides.experienceYears || faker.number.int({ min: 0, max: 10 }).toString(),
        experienceMonths: overrides.experienceMonths || faker.number.int({ min: 0, max: 11 }).toString(),
        employmentType: overrides.employmentType || this.getRandomItem(this.employmentTypes),
        cvUrl: overrides.cvUrl || faker.internet.url(),
        profilePicturePath: overrides.profilePicturePath || 'C:/Users/user/Downloads/certificates/Profile.jpg'
      },
      personalInfo: {
        gender: overrides.gender || this.getRandomItem(this.genders),
        dateOfBirth: overrides.dateOfBirth || this.generateDateString(1980, 2005),
        bloodGroup: overrides.bloodGroup || this.getRandomItem(this.bloodGroups),
        maritalStatus: overrides.maritalStatus || this.getRandomItem(this.maritalStatuses),
        personalEmail: overrides.personalEmail || faker.internet.email({ firstName, lastName }),
        mobilePhone: overrides.mobilePhone || this.generatePhoneNumber(),
        emergencyPhone: overrides.emergencyPhone || this.generatePhoneNumber(),
        emergencyContactRelationship: overrides.emergencyContactRelationship || this.getRandomItem(['Mother', 'Father', 'Spouse', 'Sibling', 'Friend']),
        temporaryAddress: overrides.temporaryAddress || `${faker.location.street()}, ${faker.location.city()}, Nepal`,
        permanentAddress: overrides.permanentAddress || `${faker.location.street()}, ${faker.location.city()}, Nepal`,
        currentLocation: overrides.currentLocation || this.getRandomItem(this.countries),
        timeZone: overrides.timeZone || this.getRandomItem(this.timeZones),
        githubId: overrides.githubId || `${firstName.toLowerCase()}-${lastName.toLowerCase()}`
      },
      history: {
        designation: overrides.designation || this.getRandomItem(this.designations),
        area: overrides.area || this.getRandomItem(this.areas),
        employmentStatus: overrides.employmentStatus || this.getRandomItem(this.employmentStatuses)
      },
      appraisers: {
        appraiser: overrides.appraiser || 'Rikesh',
        coAppraiser: overrides.coAppraiser || 'Saroj'
      }
    };
  }

  static getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  static generatePhoneNumber() {
    return `98${faker.number.int({ min: 10000000, max: 99999999 })}`;
  }

  static generateDateString(startYear = 2022, endYear = 2026) {
    const date = faker.date.between({ 
      from: new Date(startYear, 0, 1), 
      to: new Date(endYear, 11, 31) 
    });
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  static generateRandomEmail() {
    return faker.internet.email();
  }

  static generateRandomUrl() {
    return faker.internet.url();
  }
}

module.exports = { DataGenerator };
