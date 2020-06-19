import dotenv from 'dotenv'
dotenv.config()

import Koa from 'koa'
import { logger } from './middlewares/logger.mjs'
import router from './routes/index.mjs'
import { connect as DBConnect } from './_db/connect.mjs'
import bodyParser from 'koa-bodyparser'

const onError = err => {
    console.warn(err)
}
const tryLoop = () => {
    try {
        await DBConnect()
    } 
    catch(err) {
        console.warn(err)
        setTimeout(tryLoop, 5000)
    }
} 
const main = async () => {

    tryLoop()
    
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