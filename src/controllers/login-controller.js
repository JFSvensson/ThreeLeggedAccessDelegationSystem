/**
 * Login controller.
 *
 * @author Fredrik Svensson
 * @version 0.1.0
 */

import crypto from 'crypto'

/**
 * Encapsulates a controller.
 */
export class LoginController {
  /**
   * Redirects the user to the GitLab authorization URL.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  index (req, res) {
    // Generate and store a random state
    const state = this.generateState()
    req.session.oauthState = state

    // Define the scopes for the GitLab API
    const scopes = 'read_api+read_user+read_repository'

    // Create the authorization URL
    const authorizeUrl = this.createAuthorizeUrl(state, scopes)

    // Redirect the user to the authorization URL
    res.redirect(authorizeUrl)
  }

  /**
   * Generates a random state.
   *
   * @returns {string} - The generated state.
   */
  generateState () {
    return crypto.randomBytes(16).toString('hex')
  }

  /**
   * Creates the GitLab authorization URL.
   *
   * @param {string} state - The state.
   * @param {string} scopes - The scopes.
   * @returns {string} - The authorization URL.
   */
  createAuthorizeUrl (state, scopes) {
    const clientId = process.env.CLIENT_ID
    const redirectUri = process.env.REDIRECT_URI
    return `https://gitlab.lnu.se/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&state=${state}&scope=${scopes}`
  }
}
