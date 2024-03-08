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
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      },
      body: JSON.stringify({ query })
    })
    const { data } = await response.json()
    return data.currentUser
  }
}
