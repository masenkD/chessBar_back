const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path');


const app = express()
const port = process.env.PORT || 5000
require("./db/sequelizeSetup")

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};

app
    .use(cors(corsOptions))
    .use(express.json())
    .use(cookieParser())

if (process.env.NODE_ENV === "development") {
    const morgan = require('morgan')
    app.use(morgan('dev'))
}

const barRouter = require('./routes/barRoutes')
const userRouter = require('./routes/userRoutes')
const cityRouter = require('./routes/cityRoutes')
const tournamentRouter = require('./routes/tournamentRoutes')
const participationRouter = require('./routes/participationRoutes')
const rankingRouter = require('./routes/rankingRoutes')

app.get('/', (req, res) => {
    res.json({ message: 'Homepage' })
})

app.use('/api/bars', barRouter)
app.use('/api/users', userRouter)
app.use('/api/cities', cityRouter)
app.use('/api/tournaments', tournamentRouter)
app.use('/api/participations', participationRouter)
app.use('/api/rankings', rankingRouter)

app.get('*', (req, res) => {
    res.status(404).json({ message: "Page not found" })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})