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
      console.log('Access token:', data.access_token)
      res.cookie('token', data.access_token)

      // // Fetch the user's profile information
      // const userProfile = await this.fetchUserProfile(data.access_token)
      // console.log('User profile:', userProfile)

      // Fetch the user's recent activities
      // const userActivities = await this.fetchUserActivities(data.access_token)
      // console.log('User activities:', userActivities)

      // // Fetch the user's groups
      // const userGroups = await this.fetchUserGroups(data.access_token)
      // console.log('User groups:', userGroups)
      // const groupsWithProjects = []

      // // For each group, fetch the projects and their latest commit
      // for (const group of userGroups) {
      //   const projects = await this.fetchGroupProjects(data.access_token, group.id)
      //   console.log(`Projects of group ${group.id}:`, projects)
      //   const projectsWithCommits = []

      //   for (const project of projects) {
      //     const latestCommit = await this.fetchLatestCommit(data.access_token, project.id)
      //     projectsWithCommits.push({ ...project, latestCommit })
      //     console.log(`Latest commit of project ${project.id}:`, latestCommit)
      //   }

      //   groupsWithProjects.push({ ...group, projects: projectsWithCommits })
      // }

      // // Render the groups view
      // res.render('groups', { groups: groupsWithProjects })

      const service = new GitLabService(data.access_token)
      const userProfile = await service.fetchUserProfile()
      res.render('home/index', { userProfile, isLoggedIn: true })
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
   * @returns {Promise<object>} The user's profile.
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
    console.log('Response:', response)
    const data = await response.json()
    return data
  }

  /**
   * Fetches the user's recent activities from GitLab.
   *
   * @param {string} token - The user's access token.
   * @returns {Promise<object[]>} The user's recent activities.
   */
  async fetchUserActivities (token) {
    const response = await fetch('https://gitlab.lnu.se/api/v4/events?per_page=101', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error(`GitLab events endpoint responded with status ${response.status}`)
    }

    const data = await response.json()
    return data
  }

  /**
   * Fetches the user's groups from GitLab.
   *
   * @param {string} token - The user's access token.
   * @returns {Promise<object[]>} The user's groups.
   */
  async fetchUserGroups (token) {
    const response = await fetch('https://gitlab.lnu.se/api/v4/groups?per_page=5', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error(`GitLab groups endpoint responded with status ${response.status}`)
    }

    const data = await response.json()
    return data
  }

  /**
   * Fetches the projects of a group from GitLab.
   *
   * @param {string} token - The user's access token.
   * @param {number} groupId - The ID of the group.
   * @returns {Promise<object[]>} The projects of the group.
   */
  async fetchGroupProjects (token, groupId) {
    const response = await fetch(`https://gitlab.lnu.se/api/v4/groups/${groupId}/projects?per_page=3`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error(`GitLab group projects endpoint responded with status ${response.status}`)
    }

    const data = await response.json()
    return data
  }

  /**
   * Fetches the latest commit of a project from GitLab.
   *
   * @param {string} token - The user's access token.
   * @param {number} projectId - The ID of the project.
   * @returns {Promise<object>} The latest commit of the project.
   */
  async fetchLatestCommit (token, projectId) {
    const response = await fetch(`https://gitlab.lnu.se/api/v4/projects/${projectId}/repository/commits?per_page=1`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error(`GitLab commits endpoint responded with status ${response.status}`)
    }

    const data = await response.json()
    return data[0]
  }
}
