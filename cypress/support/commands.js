// Login with bearer token using cy.session for caching (Playwright pattern implementation)
Cypress.Commands.add('loginViaOAuth', () => {
  const clientId = Cypress.env('auth_client_id');
  const token = Cypress.env('auth_token');

  // Use cy.session to cache authentication across tests
  cy.session(
    ['vyaguta-auth', clientId, token], // Unique session ID based on credentials
    () => {
      const authUrl = Cypress.env('auth_url');
      const baseUrl = Cypress.config('baseUrl') || '';

      // Fetch access token from API
      cy.request({
        method: 'GET',
        url: `${authUrl}?clientId=${clientId}&token=${token}`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);

        if (response.body && response.body.data) {
          const accessToken = response.body.data.accessToken;
          const refreshToken = response.body.data.refreshToken;

          // Set tokens as cookies (Playwright pattern)
          cy.setCookie('accessToken', accessToken, {
            domain: new URL(baseUrl).hostname,
            path: '/',
            httpOnly: false,
            secure: true,
            sameSite: 'lax'
          });

          if (refreshToken) {
            cy.setCookie('refreshToken', refreshToken, {
              domain: new URL(baseUrl).hostname,
              path: '/',
              httpOnly: false,
              secure: true,
              sameSite: 'lax'
            });
          }

          cy.log('Authentication successful - tokens set as cookies');
        } else {
          throw new Error('Response does not contain expected token data');
        }
      });
    },
    {
      validate() {
        // Validate that session is still valid by checking cookie exists
        cy.getCookie('accessToken').should('exist');
      }
    }
  );
});

// Close release modal if it appears
Cypress.Commands.add('closeReleaseModal', () => {
  const modalSelector = '.releaseNote_module_releaseNoteModal__header_Close__d63012a8';

  // cy.get('body').then(($body) => {
  //   if ($body.find(modalSelector).length > 0) {
  //     cy.get(modalSelector).click({ force: true });
  //     cy.wait(500); // Brief wait for modal to close
  //     cy.log('Release modal closed');
  //   } else {
  //     cy.log('No release modal found - continuing');
  //   }
  // });
  cy.get(modalSelector).its('length').then(len => {
    if (len > 0) {
      cy.get(modalSelector).click({ force: true });
    }
  })
});

