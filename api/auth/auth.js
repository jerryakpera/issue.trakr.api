const passport = require("passport")
// const authPassport = require("./auth.passport")

const express = require("express")
const router = express.Router()

const AUTH = require("./authController")
const TOKEN = require("../../modules/token/token")

const {
  validationResult
} = require('express-validator')

router.get("/facebook", passport.authenticate("facebook"));

router.post("/test-admin", TOKEN.verifyAdmin, (req, res) => {
  const tokenData = TOKEN.getTokenData(req.header("access-token"))
  res.json({
    tokenData
  })
})

// Routes
/** 
 * @swagger
 * definitions:
 *  User:
 *    properties:
 *      firstname: string
 *      lastname: string
 *      email: string
 *      password: string
 *      confirmpassword: string
 *  Login:
 *    properties:
 *      email: string
 *      password: string
 *  ChangePassword:
 *    properties:
 *      currentpassword: string
 *      newpassword: string
 *      confirmnewpassword: string
 *  RefreshToken:
 *    properties:
 *      refresh-token: string
 * /api/v1/auth/register-user:
 *  post:
 *    tags: ["Authentication"]
 *    description: Endpoint to register a new regular user
 *    produces:
 *      - application/json
 *    parameters: [{
 *      name: register-user,
 *      in: body,
 *      description: User object,
 *      required: true,
 *      schema: {
 *        $ref: '#/definitions/User'
 *      }
 *    }]
 *    responses:
 *      '200' :
 *        description: Success
 * 
 * 
 */
// User registration route
router.post("/register-user", AUTH.validateNewUser, (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      status: 400,
      message: "Request is incorrect",
      errors: errors.array(),
      data: {}
    })
  }

  AUTH.registerUser(req.body)
  .then(user => {
    const token = TOKEN.createToken(user)
    const expiresIn = TOKEN.getExpiresIn(token)

    TOKEN.createRefreshToken(user._id)
    .then(refreshToken => {
      res.header("access-token", token).json({
        status: 200,
        message: "User created",
        data: {
          "access-token": token,
          "refresh-token": refreshToken.token,
          expiresIn
        }
      })
    })
    .catch(err => {
      return res.json({
        status: 500,
        message: err._message,
        error: err.message
      })
    })
  })
  .catch(err => {
    return res.json({
      status: 400,
      message: err._message,
      error: err.message
    })
  })
})

/** 
 * @swagger
 * /api/v1/auth/register-admin:
 *  post:
 *    tags: ["Authentication"]
 *    description: Endpoint to register a new admin user
 *    produces:
 *      - application/json
 *    parameters: [{
 *      name: register-admin,
 *      in: body,
 *      description: User object,
 *      required: true,
 *      schema: {
 *        $ref: '#/definitions/User'
 *      }
 *    }]
 *    responses:
 *      '200' :
 *        description: Success
 */
// Admin registration route
router.post("/register-admin", AUTH.validateNewUser, (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      status: 400,
      message: "Request is incorrect",
      errors: errors.array(),
      data: {}
    })
  }

  AUTH.registerAdmin(req.body)
  .then(user => {
    const token = TOKEN.createToken(user)
    const expiresIn = TOKEN.getExpiresIn(token)

    TOKEN.createRefreshToken(user._id)
    .then(refreshToken => {
      res.header("access-token", token).json({
        status: 200,
        message: "User created",
        data: {
          "access-token": token,
          "refresh-token": refreshToken.token,
          expiresIn
        }
      })
    })
    .catch(err => {
      return res.json({
        status: 500,
        message: err._message,
        error: err.message
      })
    })
  })
  .catch(err => {
    return res.json({
      status: 400,
      message: err._message,
      error: err.message
    })
  })
})

/** 
 * @swagger
 * /api/v1/auth/register-superadmin:
 *  post:
 *    tags: ["Authentication"]
 *    description: Endpoint to register a new super admin
 *    produces:
 *      - application/json
 *    parameters: [{
 *      name: register-user,
 *      in: body,
 *      description: User object,
 *      required: true,
 *      schema: {
 *        $ref: '#/definitions/User'
 *      }
 *    }]
 *    responses:
 *      '200' :
 *        description: Success
 */

// User registration route
router.post("/register-superadmin", AUTH.validateNewUser, (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      status: 400,
      message: "Request is incorrect",
      errors: errors.array(),
      data: {}
    })
  }

  AUTH.registerSuperAdmin(req.body)
  .then(user => {
    const token = TOKEN.createToken(user)
    const expiresIn = TOKEN.getExpiresIn(token)

    TOKEN.createRefreshToken(user._id)
    .then(refreshToken => {
      res.header("access-token", token).json({
        status: 200,
        message: "User created",
        data: {
          "access-token": token,
          "refresh-token": refreshToken.token,
          expiresIn
        }
      })
    })
    .catch(err => {
      return res.json({
        status: 500,
        message: err._message,
        error: err.message
      })
    })
  })
  .catch(err => {
    return res.json({
      status: 400,
      message: err._message,
      error: err.message
    })
  })
})

/** 
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *    tags: ["Authentication"]
 *    description: Endpoint to log a user in and generate access and refresh token
 *    produces:
 *      - application/json
 *    parameters: [{
 *      name: login-user,
 *      in: body,
 *      description: Login object,
 *      required: true,
 *      schema: {
 *        $ref: '#/definitions/Login'
 *      }
 *    }]
 *    responses:
 *      '200' :
 *        description: Success
 */

router.post("/login", AUTH.loginValidator, (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      status: 400,
      message: "Request is incorrect",
      errors: errors.array(),
      data: {}
    })
  }

  AUTH.findByEmail(req.body.email).then(user => {
    // If no user with that email is found
    if (!user) {
      return res.json({
        status: 400,
        message: "User does not exist",
        data: {}
      })
    }

    AUTH.login({
      user: req.body,
      hash: user.hash
    }).then(status => {
      if (!status) {
        return res.json({
          status: 400,
          message: "Wrong details",
          data: {}
        })
      }

      const token = TOKEN.createToken(user)
      const expiresIn = TOKEN.getExpiresIn(token)
      TOKEN.createRefreshToken(user._id).then(refreshToken => {
        res.header("access-token", token).json({
          status: 200,
          message: "User logged in",
          data: {
            "access-token": token,
            "refresh-token": refreshToken.token,
            expiresIn
          }
        })
      }).catch(err => {
        return res.json({
          status: 500,
          message: err._message,
          error: err.message
        })
      })
    })
  }).catch(err => {
    return res.json({
      status: 500,
      message: err._message,
      error: err.message
    })
  })
})

/** 
 * @swagger
 * /api/v1/auth/changepassword:
 *  post:
 *    tags: ["Authentication"]
 *    description: Endpoint to log a user in and generate access and refresh token
 *    produces:
 *      - application/json
 *    parameters: [
 *      {
 *        name: login-user,
 *        in: body,
 *        description: Login object,
 *        required: true,
 *        schema: {
 *          $ref: '#/definitions/ChangePassword'
 *        }
 *      },
 *      {
 *        name: access-token,
 *        in: header,
 *        description: Access token,
 *        required: true
 *      },
 *    ]
 *    responses:
 *      '200' :
 *        description: Success
 */
router.post("/changepassword", TOKEN.verify, AUTH.changePasswordValidator, (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      status: 400,
      message: "Request is incorrect",
      errors: errors.array(),
      data: {}
    })
  }

  const userDetails = TOKEN.getTokenData(req.header("access-token"))
  
  AUTH.findByUserID(userDetails.userID).then(user => {
    if (!user) {
      return res.json({
        status: 400,
        message: "Wrong details",
        data: {}
      })
    }

    AUTH.comparePasswords({
      one: req.body.currentpassword,
      two: user.hash
    }).then(password => {
      if (!password) {
        return res.json({
          status: 400,
          message: "Wrong details",
          data: {}
        })
      }
      const newPassword = {
        newPassword: req.body.newpassword,
        userID: user._id
      }
      AUTH.changePassword(newPassword).then(() => {
        return res.json({
          status: 200,
          message: "Password changed",
          data: {
            userID: user._id
          }
        })
      })
      .catch(err => {
        return res.json({
          status: 500,
          message: err.message,
          data: {}
        })
      })
    })
  })
})

/** 
 * @swagger
 * /api/v1/auth/refreshtoken:
 *  post:
 *    tags: ["Authentication"]
 *    description: Endpoint to refresh token
 *    produces:
 *      - application/json
 *    parameters: [
 *      {
 *        name: refresh-token,
 *        in: body,
 *        description: Refresh token obj,
 *        required: true,
 *        schema: {
 *          $ref: '#/definitions/RefreshToken'
 *        }
 *      },
 *      {
 *        name: access-token,
 *        in: header,
 *        description: Access token,
 *        required: true
 *      },
 *    ]
 *    responses:
 *      '200' :
 *        description: Success
 */
router.post("/refreshtoken", TOKEN.verify, (req, res) => {
  const userDetails = TOKEN.getTokenData(req.header("access-token"))
  AUTH.findByUserID(userDetails.userID).then(user => {
    const refreshtoken = req.body.refreshToken

    TOKEN.findRefreshToken({
      userID: user._id,
      refreshtoken
    }).then(found => {
      if (!found) {
        return res.json({
          status: 400,
          message: "Incorrect token",
          data: {}
        })
      }
      if (refreshtoken !== found.token) {
        return res.json({
          status: 400,
          message: "Invalid refresh token",
          data: {}
        })
      }

      const token = TOKEN.createToken(user)
      const expiresIn = TOKEN.getExpiresIn(token)

      TOKEN.createRefreshToken(user._id).then(refreshToken => {
        res.header("access-token", token).json({
          status: 200,
          message: "Token refreshed",
          data: {
            "access-token": token,
            "refresh-token": refreshToken.token,
            expiresIn
          }
        })
      }).catch(err => {
        return res.json({
          status: 500,
          message: "Internal server error. Try again.",
          error: err.message,
          data: {}
        })
      })
    })
  })
  .catch(err => {
    return res.json({
      status: 500,
      message: err.message,
      data: {}
    })
  })
})

/** 
 * @swagger
 * /api/v1/auth/edit:
 *  post:
 *    tags: ["Authentication"]
 *    description: Endpoint to edit user details
 *    produces:
 *      - application/json
 *    parameters: [
 *      {
 *        name: refresh-token,
 *        in: body,
 *        description: user obj,
 *        required: true,
 *        schema: {
 *          $ref: '#/definitions/User'
 *        }
 *      },
 *      {
 *        name: access-token,
 *        in: header,
 *        description: Access token,
 *        required: true
 *      },
 *    ]
 *    responses:
 *      '200' :
 *        description: Success
 */
router.post("/edit", TOKEN.verify, (req, res) => {
  const userDetails = TOKEN.getTokenData(req.header("access-token"))
  AUTH.findByUserID(userDetails.userID)
  .then(user => {
    for (let [key, value] of Object.entries(req.body)) {
      user[key] = req.body[key]
    }

    AUTH.updateUser(user)
    .then(savedUser => {
      return res.json({
        status: 200,
        message: "User updated",
        data: {}
      })
    })
    .catch(err => {
      return res.json({
        status: 500,
        message: err.message,
        data: {}
      })
    })
  })
  .catch(err => {
    return res.json({
      status: 500,
      message: err.message,
      data: {}
    })
  })
})

/** 
 * @swagger
 * /api/v1/auth/deactivate:
 *  post:
 *    tags: ["Authentication"]
 *    description: Endpoint to deactivate user
 *    produces:
 *      - application/json
 *    parameters: [
 *      {
 *        name: access-token,
 *        in: header,
 *        description: Access token,
 *        required: true
 *      },
 *    ]
 *    responses:
 *      '200' :
 *        description: Success
 */
router.post("/deactivate", TOKEN.verify, (req, res) => {
  const userDetails = TOKEN.getTokenData(req.header("access-token"))
  AUTH.findByUserID(userDetails.userID)
  .then(user => {
    user.flag = 2

    AUTH.updateUser(user)
    .then(savedUser => {
      return res.json({
        status: 200,
        message: "User deactivated",
        data: {}
      })
    })
    .catch(err => {
      return res.json({
        status: 500,
        message: err.message,
        data: {}
      })
    })
  })
  .catch(err => {
    return res.json({
      status: 500,
      message: err.message,
      data: {}
    })
  })
})

/** 
 * @swagger
 * /api/v1/auth/remove:
 *  post:
 *    tags: ["Authentication"]
 *    description: Endpoint to remove a user
 *    produces:
 *      - application/json
 *    parameters: [
 *      {
 *        name: access-token,
 *        in: header,
 *        description: Access token,
 *        required: true
 *      },
 *    ]
 *    responses:
 *      '200' :
 *        description: Success
 */
router.post("/remove", TOKEN.verify, (req, res) => {
  const userDetails = TOKEN.getTokenData(req.header("access-token"))
  TOKEN.delete({user: userDetails.userID})
  .then(() => {
    AUTH.deleteUser(userDetails.userID)
    .then(() => {
      return res.json({
        status: 200,
        message: "User removed",
        data: {}
      })
    })
    .catch(err => {
      return res.json({
        status: 500,
        message: err.message,
        data: {}
      })
    })
  })
  .catch(err => {
    return res.json({
      status: 500,
      message: err.message,
      data: {}
    })
  })
})

/** 
 * @swagger
 * /api/v1/auth/details:
 *  post:
 *    tags: ["Authentication"]
 *    description: Endpoint to get user details
 *    produces:
 *      - application/json
 *    parameters: [
 *      {
 *        name: email,
 *        in: body,
 *        description: user email,
 *        required: true
 *      },
 *      {
 *        name: access-token,
 *        in: header,
 *        description: Access token,
 *        required: true
 *      },
 *    ]
 *    responses:
 *      '200' :
 *        description: Success
 */
router.post("/details", TOKEN.verify, (req, res) => {
  AUTH.findByEmail(req.body.email)
  .then(user => {
    if (!user) {
      return res.json({
        status: 400,
        message: "User doesnt exist",
        data: {}
      })
    }
    return res.json({
      status: 200,
      message: "User details",
      data: {
        firstname: user.firstname,
        last: user.lastname,
        email: user.email,
        createdOn: user.createdAt,
        updatedOn: user.updatedAt,
        flag: user.flag,
        role: user.role,
        userID: user._id
      }
    })
  })
  .catch(err => {
    return res.json({
      status: 500,
      message: err.message,
      data: {}
    })
  })
})

module.exports = router