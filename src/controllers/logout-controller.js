/**
 * Logout controller.
 *
 * @author Fredrik Svensson
 * @version 0.1.0
 */

/**
 * Encapsulates a controller.
 */
export class LogoutController {
  /**
   * Logout the user.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  index (req, res) {
    req.session.destroy()
    res.clearCookie('token')
    res.redirect('/')
  }
}
