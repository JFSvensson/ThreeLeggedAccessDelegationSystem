import server from '../src/server';

test('server.js should import express', () => {
  expect(server.app).toBeDefined();
});
