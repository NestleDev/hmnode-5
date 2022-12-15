const express = require('express')
const router = express.Router()
const auth = require('../servises/auth')

router.get('/', (req, res, next) => {
  if (req.session.auth) {
    return res.redirect('/admin')
  }
  
  res.render('pages/login', { msglogin: req.flash('login')[0] })
})

router.post('/', (req, res, next) => {
  const login = {
    email: req.body.email,
    password: req.body.password
  }

  auth.authorization(login, (err, status) => {
      if (err) {
          req.flash('login', err.message)

          return res.redirect('/login')
      }

      if (status.password && login.email === status.login) {
          req.session.auth = status.password
          res.redirect('/admin')
      } else {
          req.flash('login', 'Авторизация провалена!')

          return res.redirect('/login')
      }
  })
})

module.exports = router
