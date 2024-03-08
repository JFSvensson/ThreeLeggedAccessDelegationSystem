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
      this.renderAnonymousHome(res)
    } else {
      this.renderUserHome(token, res, next)
    }
  }

  /**
   * Renders the home view for an anonymous user.
   *
   * @param {object} res - Express response object.
   */
  renderAnonymousHome (res) {
    const userProfile = { username: 'Anonymous' }
    res.render('home', { userProfile, isLoggedIn: false })
  }

  /**
   * Renders the home view for a user.
   *
   * @param {string} token - The user's access token.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Promise} A promise that resolves when the view has been rendered.
   * @throws {Error} An error if the user profile could not be fetched.
   */
  async renderUserHome (token, res, next) {
    try {
      const userProfile = await this.fetchUserProfile(token)
      res.render('home', { userProfile, isLoggedIn: true })
    } catch (error) {
      this.handleUserProfileError(error, res, next)
    }
  }

  /**
   * Fetches the user's profile from the GitLab API.
   *
   * @param {string} token - The user's access token.
   * @returns {Promise} A promise that resolves with the user's profile.
   */
  async fetchUserProfile (token) {
    const service = new GitLabService(token)
    return await service.fetchUserProfile()
  }

  /**
   * Handles an error that occurred while fetching the user's profile.
   *
   * @param {object} error - The error that occurred.
   * @param {object} res - Express response object.
   * @param {object} next - Express next middleware function.
   */
  handleUserProfileError (error, res, next) {
    if (error.message.includes('status 401')) {
      this.handleInvalidToken(res)
    } else {
      next(error)
    }
  }

  /**
   * Handles an invalid token.
   *
   * @param {object} res - Express response object.
   */
  handleInvalidToken (res) {
    res.clearCookie('token')
    this.renderAnonymousHome(res)
  }
}
