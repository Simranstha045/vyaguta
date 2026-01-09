/// <reference types="cypress" />

describe('Authentication Tests', () => {

  // Authenticate before each test - session will be cached
  beforeEach(() => {
    cy.loginViaOAuth();
  });

  it('should have valid access token cookie', () => {
    // Verify cookies were set
    cy.getCookie('accessToken').should('exist');
    cy.getCookie('accessToken').then((cookie) => {
      expect(cookie?.value).to.have.length.greaterThan(0);
    });
  });

  it('should authenticate and access leapfroggers page', () => {
    // Navigate to the app (baseUrl is already set in config)
    cy.visit('/leapfroggers');

    // Close release modal if it appears
    cy.closeReleaseModal();
    cy.url().should('match', /.*leapfroggers/);

    // Verify page loaded successfully
    cy.get('body').should('be.visible');
  });

  it('should authenticate and access home page', () => {
    // Navigate to home
    cy.visit('/');

    // Close release modal if it appears
    cy.closeReleaseModal();

    // Verify authentication was successful (not redirected to login)
    cy.url().should('not.include', '/login');
    cy.url().should('not.include', '/auth');
    
    // Verify page content is visible
    cy.get('body').should('be.visible');
  });
});
