import server from '../src/server'
import request from 'supertest'
import logger from 'morgan'

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
  let response
  beforeEach(async () => {
    response = await request(server.app).get('/api/v1')
  })

  it('should set the Content-Security-Policy header', async () => {
    expect(response.headers['content-security-policy']).toBeDefined()
  })
  it('should set the X-DNS-Prefetch-Control header', async () => {
    expect(response.headers['x-dns-prefetch-control']).toBeDefined()
  })
  it('should set the X-Frame-Options header', async () => {
    expect(response.headers['x-frame-options']).toBeDefined()
  })
  it('should set the X-Download-Options header', async () => {
    expect(response.headers['x-download-options']).toBeDefined()
  })
  it('should set the X-Content-Type-Options header', async () => {
    expect(response.headers['x-content-type-options']).toBeDefined()
  })
  it('should set the Referrer-Policy header', async () => {
    expect(response.headers['referrer-policy']).toBeDefined()
  })
  it('should set the X-Permitted-Cross-Domain-Policies header', async () => {
    expect(response.headers['x-permitted-cross-domain-policies']).toBeDefined()
  })
  it('should set the Strict-Transport-Security header', async () => {
    expect(response.headers['strict-transport-security']).toBeDefined()
  })
  it('should set the X-Powered-By header', async () => {
    expect(response.headers['x-powered-by']).toBeUndefined()
  })
  it('should set the Server header', async () => {
    expect(response.headers['server']).toBeUndefined()
  })
})

jest.mock('morgan', () => jest.fn(() => (req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
}))

describe('Logger', () => {
  it('should use morgan middleware', () => {
    expect(logger).toHaveBeenCalledWith('dev')
  })

  it('should log the HTTP request', async () => {
    const consoleSpy = jest.spyOn(console, 'log')
    await request(server.app).get('/')
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })
})

afterAll(() => {
  server.server.close()
})
