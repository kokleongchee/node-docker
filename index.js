const express = require('express')
const mongoose = require('mongoose')
const {MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET} = require('./config/config')
const app = express()
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
const postRouter = require("./routes/postRoutes")
const userRouter = require("./routes/userRoutes")
const redis = require("redis")
const cors = require("cors")
const session = require('express-session')
let RedisStore = require("connect-redis")(session)
let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT,
})

mongoose
    .connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log("Successfully connected to mongo db"))
    .catch((e) => console.log(e));

app.enable("trust proxy")
app.use(cors({}))

app.use(
    session({
        store: new RedisStore({client: redisClient}),
        secret: SESSION_SECRET,
        cookie: {
            secure: false,
            resave: false,
            saveUninitialized: false,
            httpOnly: true,
            maxAge: 60000
        }
    })
)
app.use(express.json())

app.get('/api/v1/' , (req , res)=>{

    res.send('<H2>Hi there dasd</H2>')
    console.log("Yeah, it ran")

})

app.get('/api/v1/hello' , (req , res)=>{

   res.send('hello from simple server :)')

})

app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", userRouter)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port}`))