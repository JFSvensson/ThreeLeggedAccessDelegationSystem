import server from '../src/server'

describe('Server configuration', () => {
  it('should import express', () => {
    expect(server.app).toBeDefined()
  })
})
