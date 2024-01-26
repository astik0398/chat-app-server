const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
id: String,
name: String,
avatar: String,
email: String,
password: String,
created_at: String
})

const userModal = mongoose.model('chatAppUser', userSchema)

module.exports = {
    userModal
}