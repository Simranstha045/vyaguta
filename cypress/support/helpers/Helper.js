// Helper functions for test data generation
function generateRandomEmail() {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `test.${randomStr}.${timestamp}@leapfrog.com`;
}

function generateRandomUrl() {
  const randomString = Math.random().toString(36).substring(2, 10);
  return `https://example.com/${randomString}`;
}

module.exports = { generateRandomEmail, generateRandomUrl };
