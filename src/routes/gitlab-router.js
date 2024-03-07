/**
 * Gitlab routes.
 *
 * @author Fredrik Svensson
 * @version 0.1.0
 */

import express from 'express'
import { GitlabController } from '../controllers/gitlab-controller.js'

export const router = express.Router()

const controller = new GitlabController()

router.get('/profile', (req, res, next) => controller.profile(req, res, next))
router.get('/activities', (req, res, next) => controller.activities(req, res, next))
router.get('/groups', (req, res, next) => controller.groups(req, res, next))
