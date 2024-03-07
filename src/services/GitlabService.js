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
    const response1 = await fetch(`${this.baseUrl}/events?per_page=100&page=1`, {
      headers: { Authorization: `Bearer ${this.token}` }
    })
    if (!response1.ok) {
      throw new Error(`GitLab events endpoint responded with status ${response1.status}`)
    }

    const response2 = await fetch(`${this.baseUrl}/events?per_page=100&page=2`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
    if (!response2.ok) {
      throw new Error(`GitLab events endpoint responded with status ${response2.status}`)
    }

    const data1 = await response1.json()
    const data2 = await response2.json()

    const response = [...data1, ...data2] // TODO fix over-fetching and DRY

    return response.slice(0, 101)
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
