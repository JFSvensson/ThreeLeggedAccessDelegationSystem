/**
 * Callback routes.
 *
 * @author Fredrik Svensson
 * @version 0.1.0
 */

import express from 'express'
import { CallbackController } from '../controllers/callback-controller.js'

export const router = express.Router()

const controller = new CallbackController()

router.get('/', (req, res, next) => controller.index(req, res, next))
