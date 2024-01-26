const mongoose = require('mongoose')

const bugSchema = mongoose.Schema({
id: String,
title: String,
description: String,
source: String,
severity: Array,
raised_by: String,
created_at: String,
upadated_at: String
})

const bugModel = mongoose.model('bug', bugSchema)

module.exports = {
    bugModel
}
