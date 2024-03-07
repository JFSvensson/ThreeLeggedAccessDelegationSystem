/**
 * Gitlab controller.
 *
 * @author Fredrik Svensson
 * @version 0.1.0
 */
import { GitLabService } from '../services/GitlabService.js'

/**
 * Encapsulates a controller.
 */
export class GitlabController {
  /**
   * Renders a view.
   * profile GET.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async profile (req, res, next) {
    try {
      const token = req.cookies.token
      const service = new GitLabService(token)
      const userProfile = await service.fetchUserProfile()
      res.render('profile', { userProfile, isLoggedIn: true })
    } catch (error) {
      console.error('Error in profile method:', error)
      next(error)
    }
  }

  /**
   * Renders a view.
   * groups GET.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async activities (req, res, next) {
    try {
      const token = req.cookies.token
      const service = new GitLabService(token)
      const activities = await service.fetchUserActivities()
      res.render('activities', { activities, isLoggedIn: true })
    } catch (error) {
      console.error('Error in activities method:', error)
      next(error)
    }
  }

  /**
   * Renders a view.
   * groups GET.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async groups (req, res, next) {
    try {
      const token = req.cookies.token
      const service = new GitLabService(token)
      const groups = await service.fetchUserGroups()
      const groupsWithProjects = []
      for (const group of groups.slice(0, 5)) {
        const projects = await service.fetchGroupProjects(group.id)
        const projectsWithCommits = []
        for (const project of projects.slice(0, 3)) {
          const latestCommit = await service.fetchLatestCommit(project.id)
          projectsWithCommits.push({ ...project, latestCommit })
        }
        groupsWithProjects.push({ ...group, projects: projectsWithCommits })
      }
      res.render('groups', { groups: groupsWithProjects, isLoggedIn: true })
    } catch (error) {
      console.error('Error in groups method:', error)
      next(error)
    }
  }
}
