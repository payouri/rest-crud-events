import MongoClient from 'mongodb'
const { ObjectID } = MongoClient

export const isParamObjectId = paramsName => async (ctx, next) => {
    if(typeof paramsName == 'string') paramsName = [paramsName]
    if(paramsName.every(param => ObjectID.isValid(ctx.params[param]))) {
        await next()
    } else {
        ctx.throw(404)
    }
}