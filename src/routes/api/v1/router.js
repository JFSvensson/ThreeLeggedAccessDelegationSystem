/**
 * @file API version 1 router.
 * @module router
 * @author Mats Loock
 */

// User-land modules.
import express from 'express'

// Application modules.
// import { router as tasksRouter } from './taskRouter.js'

export const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hooray! Welcome to version 1 of this very simple RESTful API!' })
})
// router.use('/tasks', tasksRouter)
