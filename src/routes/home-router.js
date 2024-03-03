/**
 * Home routes.
 *
 * @author Fredrik Svensson
 * @version 0.2.0
 */

import express from 'express'
import { HomeController } from '../controllers/home-controller.js'

export const router = express.Router()

const controller = new HomeController()

router.get('/', (req, res, next) => controller.index(req, res, next))
