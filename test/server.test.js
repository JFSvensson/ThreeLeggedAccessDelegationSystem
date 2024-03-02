import server from '../src/server'
import request from 'supertest'

describe('Server configuration', () => {
  it('should import express', () => {
    expect(server.app).toBeDefined()
  })

  it('should start an HTTP server', async () => {
    const response = await request(server.app).get('/')
    expect(response.status).toBe(200)
  })
})

// Add a test for a route defined in your router
it('should respond to a GET request at /api/v1', async () => {
  const response = await request(server.app).get('/api/v1')
  expect(response.status).toBe(200)
})

afterAll(() => {
  server.server.close()
})
