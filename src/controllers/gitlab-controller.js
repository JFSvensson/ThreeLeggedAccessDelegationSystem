/**
 * Gitlab controller.
 *
 * @author Fredrik Svensson
 * @version 0.1.0
 */
import { GitLabService } from '../services/GitlabService.js'

/**
 * Encapsulates a controller.
 */
export class GitlabController {
  /**
   * Renders a view.
   * profile GET.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async profile (req, res, next) {
    try {
      const token = req.cookies.token
      const service = new GitLabService(token)
      const userProfile = await service.fetchUserProfile()
      res.render('profile', { userProfile, isLoggedIn: true })
    } catch (error) {
      console.error('Error in profile method:', error)
      next(error)
    }
  }
}
