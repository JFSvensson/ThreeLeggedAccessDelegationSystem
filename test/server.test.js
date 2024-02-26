const server = require('../src/server'); // adjust the path to your server.js file

test('server.js should import express', () => {
  expect(server.express).toBeDefined();
});
