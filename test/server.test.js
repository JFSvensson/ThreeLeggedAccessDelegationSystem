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

describe('Routes', () => {
  it('should respond to a GET request at /api/v1', async () => {
    const response = await request(server.app).get('/api/v1')
    expect(response.status).toBe(200)
  })

  it('should respond with a 404 error', async () => {
    const response = await request(server.app).get('/api/v1/missing')
    expect(response.status).toBe(404)
  })

  it('should handle errors', async () => {
    const response = await request(server.app).get('/error')
    expect(response.status).toBe(500)
  })
})

describe('Helmet', () => {
  it('should set the Content-Security-Policy header', async () => {
    const response = await request(server.app).get('/api/v1')
    expect(response.headers['content-security-policy']).toBeDefined()
  })
})

afterAll(() => {
  server.server.close()
})
