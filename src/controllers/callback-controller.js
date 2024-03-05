/**
 * Callback controller.
 *
 * @author Fredrik Svensson
 * @version 0.1.0
 */

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
      console.log('Callback from GitLab')
      // Get the authorization code from the query parameters
      const code = req.query.code
      console.log('code', code)
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

      // Fetch the user's profile information
      const userProfile = await this.fetchUserProfile(data.access_token)
      console.log('User profile:', userProfile)

      // Redirect the user to the home page
      res.redirect('/')
    } catch (error) {
      // Handle the error
      console.error(error)
      res.status(500).send('An error occurred while trying to exchange the authorization code for an access token.')
    }
  }

  /**
   * Fetches the user's profile information from GitLab.
   *
   * @param {string} token - The user's access token.
   * @returns {Promise<object>} The user's profile information.
   */
  async fetchUserProfile (token) {
    const response = await fetch('https://gitlab.lnu.se/api/v4/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error(`GitLab user endpoint responded with status ${response.status}`)
    }

    const data = await response.json()
    return data
  }
}
