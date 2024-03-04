import server from '../src/server'
import request from 'supertest'

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

describe('GET /', () => {
  it('should render the index view', async () => {
    const response = await request(server.app).get('/')
    expect(response.status).toBe(200)
    expect(response.text).toContain('Welcome')
  })
})

afterAll(() => {
  server.server.close()
})
