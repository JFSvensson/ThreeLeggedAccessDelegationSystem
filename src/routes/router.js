/**
 * @file Defines the main router for the application.
 * @module router
 * @author Fredrik Svensson
 * @since 0.1.0
 */

import express from 'express'
import { router as homeRouter } from './home-router.js'
import { router as v1Router } from './api/v1/router.js'

export const router = express.Router()

// Register routes.
router.use('/', homeRouter)
router.use('/api/v1', v1Router)

// Error route for testing purposes.
router.get('/error', (req, res, next) => {
  const error = new Error('Test error')
  error.status = 500
  next(error)
})
// Default route for testing purposes.
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome, but this is not the API your looking for...' })
  res.render('index')
})

// Catch 404.
router.use('*', (req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
