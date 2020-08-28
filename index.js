const express = require('express')
const app = express()
const port = 3050
const useragent = require('express-useragent') // import user-agent

// setup db
const configureStore = require('./config/database')
configureStore()

// enable express to parse json data
app.use(express.json())

// setup user-agent
app.use(useragent.express())

// setup routes
const routes = require('./config/routes')
app.use('/', routes)


app.listen(port, () => {
    console.log('listening on port', port)
})