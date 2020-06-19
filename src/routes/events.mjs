import Router from 'koa-router'
import { validateData } from '../middlewares/validateData.mjs'
import { eventSchema } from '../schemas/Event.mjs'
import { getById, createOne, getPage, deleteOne } from '../models/events.mjs'
import { isJSON } from '../middlewares/contentType.mjs'
import { isParamObjectId } from '../middlewares/isObjectId.mjs'

export const eventsRoute = new Router({ prefix: '/events' })

eventsRoute.get('/', async (ctx, next) => {

    const { page, length } = ctx.query;
    try {
        ctx.body = await getPage(Number(page), Number(length))
        ctx.body.next = `${ctx.hostname}/events?start=0&length=0`
    } catch(err) {
        ctx.throw(500)
    }

})

// eventsRoute.get('/agenda/:id', async (ctx, next) => {
    
//     const { id } = ctx.params;
//     const event = await getById(id)
//     if(!event) ctx.throw(404)
//     ctx.body = event

// })

eventsRoute.delete('/:id', isParamObjectId('id'), async ctx => {

    const { id } = ctx.params
    try {
        await deleteOne(id)
        ctx.status = 200
    } catch(err) {
        ctx.throw(500)
    }

})

eventsRoute.get('/:id', isParamObjectId('id'), async (ctx, next) => {
    
    const { id } = ctx.params;
    try {
        const event = await getById(id)
        if(!event) ctx.throw(404)
        ctx.body = event
    } catch(err) {
        ctx.throw(500)
    }

})

eventsRoute.post('/', isJSON, validateData(eventSchema), async (ctx, next) => {

    try {
        const { ops } = await createOne(ctx.state.validatedBody)
        ctx.status = 200
        ctx.body = ops[0]
    } catch(err) {
        ctx.throw(500)
    }
})

eventsRoute.put('/:id', isParamObjectId('id'), isJSON, validateData(eventSchema), async (ctx, next) => {

    ctx.status = 200
    ctx.body = ctx.state.validatedBody

})

export default eventsRoute