const path = require('path');
const express = require('express');
const xss = require('xss');
const UsersService = require('./user-service');
const { requireAuth } = require('../middleware/auth');

const usersRouter = express.Router()
const jsonParser = express.json()

const serializeUser = user => ({
    id: user.id,
    first_name: xss(user.first_name),
    last_name: xss(user.last_name),
    email: xss(user.email),
    password: user.password,
    start_date: user.start_date,
})

usersRouter
    .route('/')
    .post(jsonParser, (req, res, next) => {
        const { first_name, last_name, email, password } = req.body

        for (const field of ['first_name', 'last_name', 'email', 'password'])
            if (!req.body[field])
                return res.status(400).json({
                    error: { message: `Missing '${field} in body request`}
                });
        
        const passwordError = UsersService.validatePassword(password)

        if (passwordError)
                return res.status(400).json({ error: passwordError})
        
        UsersService.hasUserWithEmail(
            req.app.get('db'),
            email
        )
          .then(hasUserWithEmail => {
            if (hasUserWithEmail)
                return res.status(400).json({ error: `Email in use`})

            return UsersService.hashPassword(password)
              .then(hashedPassword => {
                const newUser = {
                  first_name,
                  last_name,
                  email,
                  password: hashedPassword,
                }
                return UsersService.insertUser(req.app.get('db'), newUser)
                  .then(user => {
                    res 
                      .status(201)
                      .location(path.posix.join(req.originalUrl, `/${user.id}`))
                      .json(serializeUser(user))
                  })
              })
          })
          .catch(next) 
    })



usersRouter
    .route('/user')
    .all(requireAuth, (req, res, next) => {
        UsersService.getById(
            req.app.get('db'),
            req.user.id
        )
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        error: { message: `User does not exist` }
                    })
                }
                res.user = user
                next()
            })
            .catch(next)
    })
    .get(requireAuth, (req, res, next) => {
        UsersService.getById(
            req.app.get('db'),
            req.user.id
        )
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        error: { message: `User does not exist` }
                    })
                }
                res.json(user)
                next()
            })
            .catch(next)
    })
    .delete(requireAuth, (req, res, next) => {
        UsersService.deleteUser(
            req.app.get('db'),
            req.user.id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
    })


    module.exports = usersRouter