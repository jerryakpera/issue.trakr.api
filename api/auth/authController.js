const bcrypt = require("bcryptjs")
const config = require("../../config")

const User = require("../../db/models/User")

const {
  check
} = require("express-validator")

module.exports = {
  validateNewUser: [
    // firstname must not be empty
    check('firstname', 'Firstname cannot be empty').not().isEmpty(),

    // lastname must not be empty
    check('lastname', 'Lastname cannot be empty').not().isEmpty(),
    
    check("email", "Your email is not valid").isEmail(),
    // password must be at least 5 chars long
    check("password", "Your password must be at least 8 characters").isLength({
      min: 8
    }),
    check('password', 'Your password must be at least 5 characters').not().isEmpty().isLength({min: 5}),
    check("confirmpassword", "Passwords must be the same")
    .exists()
    .custom((value, {
      req
    }) => value === req.body.password)
  ],

  loginValidator: [
    check("email", "Your email is not valid").isEmail(),
  ],

  changePasswordValidator: [
    // password must be at least 5 chars long
    check("currentpassword", "password must be at least 8 characters").isLength({
      min: 8
    }),
    check("newpassword", "password must be at least 8 characters").isLength({
      min: 8
    }),
    check("confirmnewpassword", "passwords must be the same")
    .exists()
    .custom((value, {
      req
    }) => value === req.body.newpassword),
    check("newpassword", "old and new passwords must be different")
    .exists()
    .custom((value, {
      req
    }) => value !== req.body.currentpassword)
  ],
  
  registerUser: (user) => {
    const BCRYPT_SALT_ROUNDS = 12
    return new Promise((resolve, reject) => {
      bcrypt.hash(user.password, BCRYPT_SALT_ROUNDS)
      .then(hash => {
        user.hash = hash
        const newUser = new User(user)
        newUser.flag = 0
        newUser.role = 2
        newUser.save((err, user) => {
          if (err) {
            reject(err)
          }
          resolve(user)
        })
      }).catch(err => {
        reject(err)
      })
    })
  },
  
  registerAdmin: (user) => {
    const BCRYPT_SALT_ROUNDS = 12
    return new Promise((resolve, reject) => {
      bcrypt.hash(user.password, BCRYPT_SALT_ROUNDS)
      .then(hash => {
        user.hash = hash
        const newUser = new User(user)
        newUser.flag = 0
        newUser.role = 1
        newUser.save((err, user) => {
          if (err) {
            reject(err)
          }
          resolve(user)
        })
      }).catch(err => {
        reject(err)
      })
    })
  },
  
  registerSuperAdmin: (user) => {
    const BCRYPT_SALT_ROUNDS = 12
    return new Promise((resolve, reject) => {
      bcrypt.hash(user.password, BCRYPT_SALT_ROUNDS)
      .then(hash => {
        user.hash = hash
        const newUser = new User(user)
        newUser.flag = 0
        newUser.role = 0
        newUser.save((err, user) => {
          if (err) {
            reject(err)
          }
          resolve(user)
        })
      }).catch(err => {
        reject(err)
      })
    })
  },
  
  login: (obj) => {
    return new Promise((resolve, reject) => {
      resolve(bcrypt.compare(obj.user.password, obj.hash))
    })
  },
  
  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      User.findOne({email: email}, (err, doc) => {
        if (err) {
          reject(err)
        }
        resolve(doc)
      })
    })
  },

  deleteUser: (userID) => {
    return new Promise((resolve, reject) => {
      User.deleteOne({_id: userID}, (err, doc) => {
        if (err) {
          reject(err)
        }
        resolve(doc)
      })
    })
  },
  
  findByUserID: (userID) => {
    return new Promise((resolve, reject) => {
      User.findById(userID, (err, doc) => {
        if (err) {
          reject(err)
        }
        resolve(doc)
      })
    })
  },
  
  comparePasswords: (password) => {
    return new Promise((resolve, reject) => {
      resolve(bcrypt.compare(password.one, password.two))
    })
  },
  
  changePassword: (obj) => {
    const query = {_id: obj.userID}
    const BCRYPT_SALT_ROUNDS = 12
    return new Promise((resolve, reject) => {
      bcrypt.hash(obj.newPassword, BCRYPT_SALT_ROUNDS).then(hash => {
        User.findOneAndUpdate(query, {hash}, {new: true, useFindAndModify: false}, (err, docs) => {
          if (err) {
            reject(err)
          }
          resolve(docs)
        })
      })
    })
  },
  
  updateUser: (obj) => {
    const query = {_id: obj._id}
    return new Promise((resolve, reject) => {
      User.findOneAndUpdate(query, obj, {new: true, useFindAndModify: false}, (err, docs) => {
        if (err) {
          reject(err)
        }
        resolve(docs)
      })
    })
  },
}