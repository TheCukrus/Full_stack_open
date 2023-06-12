const logger = require("./logger")
const jwt = require("jsonwebtoken")
const modelUser = require("../models/modelUser")

const requestLogger = (request, response, next) =>
{
  logger.info(`Method: ${request.method}`)
  logger.info(`Path: ${request.path}`)
  logger.info(`Body: ${JSON.stringify(request.body)}`)
  logger.info(`---`)
  next()
}

const unknownEndpoint = (request, response) =>
{
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) =>
{
  logger.error(error.message)

  if (error.name === 'CastError')
  {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError')
  {
    return response.status(400).json({ error: error.message })
  }
  else if (error.name === "JsonWebTokenError")
  {
    return response.status(401).json({ error: "invalid token" })
  }
  else if (error.name === "TokenExpiredError")
  {
    return response.status(401).json({
      error: "token expired"
    })
  }

  next(error)
}

const tokenExtractor = (request, response, next) =>
{
  let authorization = request.get("authorization")
  if (authorization && authorization.startsWith("Bearer "))
  {
    authorization = authorization.replace("Bearer ", "")
    const decodedToken = jwt.verify(authorization, process.env.JWT_SECRET)
    request.token = decodedToken
  }
  else
  {
    authorization = null
  }
  next()
}

const userExtractor = async (request, response, next) =>
{
  try
  {
    const user = await modelUser.findById(request.token.id)
    request.user = user
  }
  catch (err)
  {
    logger.error(err)
  }
  finally
  {
    next()
  }
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}