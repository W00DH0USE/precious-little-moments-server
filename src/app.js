require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV, API_KEY } = require('./config')
const postsRouter = require('./posts/posts-router')
const usersRouter = require('./user/user-router')
const authRouter = require('./auth/auth-router')

const app = express()

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'

app.use(morgan(morganSetting))
app.use(cors())
app.use(helmet())

app.use(`/${API_KEY}/posts`, postsRouter)
app.use(`/${API_KEY}/users`, usersRouter)
app.use(`/${API_KEY}/auth`, authRouter)

app.get('/', (req, res) => {
  res.send('Hello, PLM-Database')
})

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: {message: 'server error'} }
  }
  else {
    console.error(error)
    response = { message: error.message, error}
  }
  res.status(500).json(response)
})

module.exports = app