const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path')
const config = require('../config.json');

const adapter = new FileSync(path.join(__dirname, config.db.file))
const db = low(adapter)

module.exports = db