/**
 * Logout routes.
 *
 * @author Fredrik Svensson
 * @version 0.1.0
 */

import express from 'express'
import { LogoutController } from '../controllers/logout-controller.js'

export const router = express.Router()

const controller = new LogoutController()

router.get('/', (req, res, next) => controller.index(req, res, next))
