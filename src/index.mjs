import dotenv from 'dotenv'
dotenv.config()

import Koa from 'koa'
import http from 'http'
import { logger } from './middlewares/logger.mjs'
import router from './routes/index.mjs'
import { connect as DBConnect } from './_db/connect.mjs'
import bodyParser from 'koa-bodyparser'

const onError = err => {
    console.warn(err)
}

const main = async () => {
    http.get('http://bot.whatismyipaddress.com', (res) => {
  const { statusCode } = res;
  const contentType = res.headers['content-type'];

  let error;
  if (statusCode !== 200) {
    error = new Error('Request Failed.\n' +
                      `Status Code: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error('Invalid content-type.\n' +
                      `Expected application/json but received ${contentType}`);
  }
  if (error) {
    console.error(error.message);
    // Consume response data to free up memory
    res.resume();
    return;
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
        console.log(rawData)
    //   const parsedData = JSON.parse(rawData);
    //   console.log(parsedData);
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});
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