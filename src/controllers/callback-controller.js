/**
 * Callback controller.
 *
 * @author Fredrik Svensson
 * @version 0.1.0
 */
import { GitLabService } from '../services/GitlabService.js'

/**
 * Encapsulates a controller.
 */
export class CallbackController {
  /**
   * Handles the callback from GitLab.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  async index (req, res) {
    try {
      // Get the authorization code from the query parameters
      const code = req.query.code
      // Send a POST request to the GitLab token endpoint
      const response = await fetch('https://gitlab.lnu.se/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          code,
          grant_type: 'authorization_code',
          redirect_uri: process.env.REDIRECT_URI
        })
      })
      if (!response.ok) {
        throw new Error(`GitLab token endpoint responded with status ${response.status}`)
      }
      const data = await response.json()
      // Store the access token in a cookie
      res.cookie('token', data.access_token)

      const service = new GitLabService(data.access_token)
      const userProfile = await service.fetchUserProfile()
      res.render('home', { userProfile, isLoggedIn: true })
    } catch (error) {
      // Handle the error
      console.error(error)
      res.status(500).send('An error occurred while trying to exchange the authorization code for an access token.')
    }
  }
}
