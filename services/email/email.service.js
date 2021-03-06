const nodemailer = require("nodemailer")
const _ = require("../../modules/utils")
const config = require("../../config")
const env = require("../../config/env")

function sendEmail(sendTo, subject, emailBody) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        secure: false,
        port: 25,
        user: env === "prod" ? process.env.EMAILACCOUNT : config.emailAccount,
        pass: env === "prod" ? process.env.EMAILPASSWORD : config.emailPassword
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    var mailOptions = {
      from: env === "prod" ? process.env.EMAILACCOUNT : config.emailAccount,
      to: sendTo,
      subject: subject,
      ...emailBody
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  })
}

function stopOpen(e) {
  e.preventDefault();
}

function generateActivationLink(user) {
  const userDetails = {
    link: "http://localhost:3002/api/v1/auth/activate?",
    userID: user._id
  }

  return _.encodeJSON(userDetails)
}

function generateResetPasswordLink(user) {
  const userDetails = {
    userID: user._id
  }

  return _.encodeJSON(userDetails)
}

module.exports = {
  sendEmail,
  generateActivationLink,
  generateResetPasswordLink
}