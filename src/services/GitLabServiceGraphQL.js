/**
 * Service for fetching data from GitLab API using GraphQL
 */
export class GitLabServiceGraphQL {
  /**
   * Creates an instance of the service.
   *
   * @param {string} token - The user's access token.
   */
  constructor (token) {
    this.token = token
    this.baseUrl = 'https://gitlab.lnu.se/api/graphql'
  }

  /**
   * Fetches the user's profile from GitLab.
   *
   * @returns {Promise} - The user's profile.
   */
  async fetchUserProfile () {
    const query = `
      query {
        currentUser {
          name
          username
          id
          publicEmail
          lastActivityOn
          avatarUrl
        }
      }
    `
    const response = await this.sendQuery(query)
    return response.data.currentUser
  }

  /**
   * Fetches the user's groups from GitLab.
   *
   * @returns {Promise} - The user's groups.
   */
  async fetchUserGroups () {
    const query = `
      query {
        currentUser {
          groups(first: 5) {
            nodes {
              name
              webUrl
              avatarUrl
              path
            }
          }
        }
      }
    `
    const response = await this.sendQuery(query)
    return response.data.currentUser.groups.nodes
  }

  /**
   * Fetches the projects for a group from GitLab.
   *
   * @param {string} groupId - The ID of the group.
   * @returns {Promise} - The group's projects.
   */
  async fetchGroupProjects (groupId) {
    const query = `
      query {
        group(fullPath: "${groupId}") {
          projects(first: 3) {
            nodes {
              name
              webUrl
              path
              description
            }
          }
        }
      }
    `
    const response = await this.sendQuery(query)
    return response.data.group.projects.nodes
  }

  /**
   * Sends the query to the GitLab API.
   *
   * @param {string} query - The query to send.
   * @returns {Promise} - The response from the API.
   */
  async sendQuery (query) {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`
        },
        body: JSON.stringify({ query })
      })
      if (!response.ok) {
        throw new Error(`GitLab GraphQL API responded with status ${response.status}`)
      }
      return response.json()
    } catch (error) {
      console.error('Error in sendQuery method:', error)
      throw error
    }
  }
}
