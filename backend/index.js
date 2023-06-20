const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { connectDB } = require('./db')
const { winstonLogger } = require('./winston/logger')
const { logError } = require('./middleware/error/logError')
const routesUser = require('./routes/user')
const routesProduct = require('./routes/product')
const routesAuth = require('./routes/auth')
const { resetData } = require('./resetData/seed')
dotenv.config({ path: './config.env' })
const port = process.env.PORT || 8000

/************************************************************* */
// Configure application

const app = express()
app.use(express.json())
app.use(cors())
connectDB()

/************************************************************* */
// routes
app.use('/assets', express.static(__dirname + '/assets'));
app.get('/api/v1/reset', async (_, res) => {
    await resetData();
    res.json({ success: true })
});
app.use('/api/v1', routesAuth)
app.use('/api/v1', routesUser)
app.use('/api/v1/product', routesProduct)

/************************************************************* */
// error handling
app.use(logError);

app.listen(port, function () {
    winstonLogger.info(`App started at port ${port}`);

})

module.exports = app;
