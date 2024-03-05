/**
 * Login controller.
 *
 * @author Fredrik Svensson
 * @version 0.1.0
 */

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
    const REDIRECT_URI = 'https://cscloud8-57.lnu.se/auth/gitlab/callback'
    // const STATE = crypto.randomBytes(16).toString('hex')
    const STATE = '1234'

    // Store the state in the session for later validation
    req.session.oauthState = STATE

    const authorizeUrl = `https://gitlab.lnu.se/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&state=${STATE}`
    console.log(authorizeUrl)
    // Redirect the user to the authorization URL
    res.redirect(authorizeUrl)
  }
}
