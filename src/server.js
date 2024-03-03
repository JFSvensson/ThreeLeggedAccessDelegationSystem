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
import helmet from 'helmet'
import { router } from './routes/router.js'

const app = express()

app.use(helmet())
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'gitlab.lnu.se'],
      styleSrc: ["'self'", "'unsafe-inline'", 'gitlab.lnu.se'],
      imgSrc: ["'self'", 'data:', 'gitlab.lnu.se'],
      connectSrc: ["'self'", 'gitlab.lnu.se'],
      frameSrc: ["'self'", 'gitlab.lnu.se'],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: []
    }
  })
)

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

// Error handler.
app.use(function (err, req, res, next) {
  // 404 Not Found.
  if (err.status === 404) {
    return res
      .status(404)
      // .sendFile(join(directoryName, 'views', 'errors', '404.html'))
      .end()
  }

  // 500 Internal Server Error (in production, all other errors send this response).
  if (req.app.get('env') !== 'development') {
    return res
      .status(500)
      // .sendFile(join(directoryName, 'views', 'errors', '500.html'))
      .end()
  }

  // Development only!
  // Only providing detailed error in development.

  // Render the error page.
  res
    .status(err.status || 500)
    // .render('errors/error', { error: err })
})

// Starts the HTTP server listening for connections.
const server = app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`)
  console.log('Press Ctrl-C to terminate...')
})

export default { app, server }
