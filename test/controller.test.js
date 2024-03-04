import { HomeController } from '../src/controllers/home-controller.js'

describe('HomeController', () => {
  let req, res, next

  beforeEach(() => {
    req = {}
    res = { render: jest.fn() }
    next = jest.fn()
  })

  it('should render the home/index view', () => {
    const controller = new HomeController()
    controller.index(req, res, next)
    expect(res.render).toHaveBeenCalledWith('home/index')
  })
})
