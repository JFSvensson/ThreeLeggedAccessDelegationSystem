/**
 * Home controller.
 *
 * @author Fredrik Svensson
 * @version 0.2.0
 */
import { GitLabService } from '../services/GitlabService.js'

/**
 * Encapsulates a controller.
 */
export class HomeController {
  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * index GET.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    const token = req.cookies.token
    if (!token) {
      const userProfile = { username: 'Anonymous' }
      res.render('home', { userProfile, isLoggedIn: false })
    } else {
      const service = new GitLabService(token)
      const userProfile = await service.fetchUserProfile()
      res.render('home', { userProfile, isLoggedIn: true })
    }
  }
}
