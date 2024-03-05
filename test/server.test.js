import server from '../src/server'
import request from 'supertest'
import logger from 'morgan'
// import nock from 'nock'

describe('Server configuration', () => {
  it('should import express', () => {
    expect(server.app).toBeDefined()
  })

  it('should start an HTTP server', async () => {
    const response = await request(server.app).get('/')
    expect(response.status).toBe(200)
  })
})

describe('Helmet', () => {
  let response
  beforeEach(async () => {
    response = await request(server.app).get('/')
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
    expect(response.headers.server).toBeUndefined()
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

describe('GET /login', () => {
  it('should redirect to GitLab\'s authorization page', async () => {
    const response = await request(server.app)
      .get('/login')
      .expect(302) // expect an ok response

    // Check that the Location header starts with GitLab's authorization URL
    expect(response.headers.location).toMatch(/^https:\/\/gitlab.lnu.se\/oauth\/authorize/)

    // Check that the Location header includes the necessary query parameters
    expect(response.headers.location).toMatch(/client_id=/)
    expect(response.headers.location).toMatch(/redirect_uri=/)
    expect(response.headers.location).toMatch(/response_type=code/)
    expect(response.headers.location).toMatch(/state=/)
  })
})

// describe('GET /auth/gitlab/callback', () => {
//   it('should exchange the authorization code for an access token', async () => {
//     // Mock the authorization code that GitLab would send
//     const mockCode = 'mockAuthorizationCode'

//     // Mock the access token that your application would receive from GitLab
//     const mockAccessToken = 'mockAccessToken'

//     // Mock the request to the GitLab token endpoint
//     nock('https://gitlab.lnu.se/oauth/token')
//       .post({
//         client_id: process.env.CLIENT_ID,
//         client_secret: process.env.CLIENT_SECRET,
//         code: mockCode,
//         grant_type: 'authorization_code',
//         redirect_uri: '/auth/gitlab/callback'
//       })
//       .reply(200, {
//         access_token: mockAccessToken,
//         token_type: 'bearer',
//         expires_in: 7200
//       })

//     // Send a request to the callback route with the mock authorization code
//     const response = await request(server.app)
//       .get(`/auth/gitlab/callback?code=${mockCode}`)
//       .expect(200)

//     // Check that the access token was correctly stored in the session
//     expect(response.headers['set-cookie']).toContain(`token=${mockAccessToken}`)
//   })
// })

afterAll(() => {
  server.server.close()
})
