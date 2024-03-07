/**
 * Service for fetching data from GitLab API
 */
export class GitLabService {
  /**
   * Creates an instance of the service.
   *
   * @param {string} token - The user's access token.
   */
  constructor (token) {
    this.token = token
    this.baseUrl = 'https://gitlab.lnu.se/api/v4'
  }

  /**
   * Fetches the user's profile from GitLab.
   *
   * @returns {Promise} - The user's profile.
   */
  async fetchUserProfile () {
    console.log('Fetching user profile')
    console.log('Token:', this.token)
    const response = await fetch(`${this.baseUrl}/user`, {
      headers: { Authorization: `Bearer ${this.token}` }
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
   * @returns {Promise} - The user's activities.
   */
  async fetchUserActivities () {
    const response = await fetch(`${this.baseUrl}/events?action=pushed`, {
      headers: { Authorization: `Bearer ${this.token}` }
    })
    return response.json()
  }

  /**
   * Fetches the user's groups from GitLab.
   *
   * @returns {Promise} - The user's groups.
   */
  async fetchUserGroups () {
    const response = await fetch(`${this.baseUrl}/groups`, {
      headers: { Authorization: `Bearer ${this.token}` }
    })
    return response.json()
  }

  /**
   * Fetches the projects for a group from GitLab.
   *
   * @param {*} groupId - The ID of the group.
   * @returns {Promise} - The group's projects.
   */
  async fetchGroupProjects (groupId) {
    const response = await fetch(`${this.baseUrl}/groups/${groupId}/projects`, {
      headers: { Authorization: `Bearer ${this.token}` }
    })
    return response.json()
  }

  /**
   * Fetches the latest commit for a project from GitLab.
   *
   * @param {*} projectId - The ID of the project.
   * @returns {Promise} - The project's latest commit.
   */
  async fetchLatestCommit (projectId) {
    const response = await fetch(`${this.baseUrl}/projects/${projectId}/repository/commits`, {
      headers: { Authorization: `Bearer ${this.token}` }
    })
    return response.json()
  }
}
