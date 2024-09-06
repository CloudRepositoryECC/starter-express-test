const Express = require('express')
const App = Express()
const Cors = require('cors')
const Morgan = require('morgan')
const Dotenv = require('dotenv')
const Helmet = require('helmet')
const Session = require('express-session')
const Path = require('path')
const HOST = '0.0.0.0'
const CookieParser = require('cookie-parser')
const HealthCheck = require('express-healthcheck')

App.use(Helmet())
App.use(Cors()) 
App.use(Express.json())
App.use(Express.urlencoded({ extended: false }))
App.use(Express.static('public'))
App.set('view engine', 'ejs')
App.use(Morgan('dev'))
App.use(CookieParser())
App.use(Session({
    secret: process.env.SecretKey || 'secret no rumpi',
    resave: false,
    saveUninitialized: false,
}))

App.get("/", (req, res) => res.send("Express on Vercel"));

App.listen(3000, () => console.log("Server ready on port 3000."));

let startTime = Date.now()
App.use('/v1/health-check', HealthCheck(
    {
        healthy: () => {
            function formatUptime(uptimeInSeconds) {
                const hours = Math.floor(uptimeInSeconds / 3600)
                const minutes = Math.floor((uptimeInSeconds % 3600) / 60)
                const seconds = Math.floor(uptimeInSeconds % 60)
                return `${hours}h ${minutes}m ${seconds}s`
            }

            const healthyStatus = true
            const databaseStatus = true
            const uptimeInSeconds = Math.floor((Date.now() - startTime) / 1000)
            const uptimeFormatted = formatUptime(uptimeInSeconds)

            return {
                healthy: healthyStatus,
                database: databaseStatus,
                uptime: process.uptime(),
                uptimeFormatted: uptimeFormatted,
                version: process.env.APP_VERSION || 'Null'
            }
        },
    }
))

module.exports = App