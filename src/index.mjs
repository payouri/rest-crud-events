// import dotenv from 'dotenv'
// dotenv.config()

console.log(JSON.stringify(process.env))

import Koa from 'koa'
import { logger } from './middlewares/logger.mjs'
import router from './routes/index.mjs'
import { connect as DBConnect } from './_db/connect.mjs'
import bodyParser from 'koa-bodyparser'

const onError = err => {
    console.warn(err)
}

const main = async () => {
    await DBConnect()

    const app = new Koa()
    app.use(bodyParser())
    app.use(logger)
    app.use(router.routes())
    app.use(router.allowedMethods())
    app.on('error', onError)

    app.listen(process.env.PORT)
    console.log(`app listening on port ${process.env.PORT}`)
}
main()