/**
 * This is the entry point of the application.
 * Inspired by 1DV026 B2 and 1DV027 RESTful Tasks example application.
 *
 * @file server.js is the root file that starts the server.
 * @author Fredrik Svensson
 * @version 0.1.0
 * @since 0.1.0
 */

import httpContext from 'express-http-context'

import express from 'express'
import http from 'node:http'
import { router } from './routes/router.js'

const app = express()

// Middleware to be executed before the routes.
app.use((req, res, next) => {
  // Add a request UUID to each request and store information about
  // each request in the request-scoped context.
  // req.requestUuid = randomUUID()
  httpContext.set('request', req)

  next()
})

// Register routes.
app.use('/', router)

// // Error handler.
// app.use((err, req, res, next) => {
//   // logger.error(err.message, { error: err })

//   if (process.env.NODE_ENV === 'production') {
//     // Ensure a valid status code is set for the error.
//     // If the status code is not provided, default to 500 (Internal Server Error).
//     // This prevents leakage of sensitive error details to the client.
//     if (!err.status) {
//       err.status = 500
//       err.message = http.STATUS_CODES[err.status]
//     }

//     // Send only the error message and status code to prevent leakage of
//     // sensitive information.
//     res
//       .status(err.status)
//       .json({
//         error: err.message
//       })

//     return
//   }
//   // ---------------------------------------------------
//   // ⚠️ WARNING: Development Environment Only!
//   //             Detailed error information is provided.
//   // ---------------------------------------------------

//   // Deep copies the error object and returns a new object with
//   // enumerable and non-enumerable properties (cyclical structures are handled).
//   const copy = JSON.decycle(err, { includeNonEnumerableProperties: true })

//   return res
//     .status(err.status || 500)
//     .json(copy)
// })

// Starts the HTTP server listening for connections.
const server = app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`)
  console.log('Press Ctrl-C to terminate...')
})

export default { app, server }
