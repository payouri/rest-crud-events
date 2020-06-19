// const Joi = require('@hapi/joi');
import Joi from '@hapi/joi'
/**
 * 
 * @param {*} schema 
*/

export const validateData = (schema, opts = {}) => async (ctx, next) => {
    try {
        ctx.state.validatedBody = await Joi.attempt(ctx.request.body, schema, 'invalid request body:', {
            abortEarly: false,
            ...opts
        })
        await next()
    } catch (err) {
        ctx.throw(400, JSON.stringify(err.details))
    }
}