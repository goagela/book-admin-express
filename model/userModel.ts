const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  nickName: {
    type: String,
  }
})

module.exports = userSchema