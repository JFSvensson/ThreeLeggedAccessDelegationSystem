/**
 * @file Defines the main router for the application.
 * @module router
 * @author Fredrik Svensson
 * @since 0.1.0
 */

import express from 'express'
import { router as v1Router } from './api/v1/router.js'

export const router = express.Router()

router.use('/api/v1', v1Router)

// Below is the default route for the application, added for testing purposes.
// TODO Remove this route when the application is ready for production.
router.get('/', (req, res) => {
  res.status(200).json({ message: 'This is not the API your looking for...' })
})

// Catch 404.
router.use('*', (req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
