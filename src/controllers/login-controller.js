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
    const CLIENT_ID = process.env.CLIENT_ID
    const REDIRECT_URI = process.env.REDIRECT_URI
    const STATE = crypto.randomBytes(16).toString('hex')

    // Store the state in the session for later validation
    req.session.oauthState = STATE

    const SCOPES = 'read_api+read_user+read_repository'

    const authorizeUrl = `https://gitlab.lnu.se/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&state=${STATE}&scope=${SCOPES}`

    // Redirect the user to the authorization URL
    res.redirect(authorizeUrl)
  }
}
