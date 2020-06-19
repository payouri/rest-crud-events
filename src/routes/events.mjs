import Router from 'koa-router'
import { validateData } from '../middlewares/validateData.mjs'
import { eventSchema } from '../schemas/Event.mjs'
import { getById, createOne, getPage, deleteOne } from '../models/events.mjs'
import { isJSON } from '../middlewares/contentType.mjs'

export const eventsRoute = new Router({ prefix: '/events' })

eventsRoute.get('/', async (ctx, next) => {

    const { start, length } = ctx.query;
    ctx.body = await getPage(Number(start), Number(length))

})

// eventsRoute.get('/agenda/:id', async (ctx, next) => {
    
//     const { id } = ctx.params;
//     const event = await getById(id)
//     if(!event) ctx.throw(404)
//     ctx.body = event

// })

eventsRoute.get('/:id', async (ctx, next) => {
    
    const { id } = ctx.params;
    const event = await getById(id)
    if(!event) ctx.throw(404)
    ctx.body = event

})

eventsRoute.post('/', isJSON, validateData(eventSchema), async (ctx, next) => {

    ctx.status = 200
    const { ops } = await createOne(ctx.state.validatedBody)
    ctx.body = ops[0]

})

eventsRoute.put('/:id', isJSON, validateData(eventSchema), async (ctx, next) => {

    ctx.status = 200
    ctx.body = ctx.state.validatedBody

})

export default eventsRoute