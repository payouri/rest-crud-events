export const contentType = expected => async (ctx, next) => {
    if (!ctx.is(expected)) {
        ctx.set('Accept', expected)
        ctx.throw(400, 'Accept: ' + expected)
    }
    await next()
}

export const contentTypes = expected => async (ctx, next) => {
    for (let i = 0, n = expected.length; i < n; i++) {
        const type = expected[i]
        if(ctx.is(type)) {
            await next()
            return
        }
    }
    ctx.set('Accept', expected.join(','))
    ctx.throw(400, 'Accept: ' + expected.join(','))
}

export const isJSON = contentType('application/json')

// xml is not enabled by default on koa-body-parser
export const JSONOrXML = contentTypes(['application/json', 'application/xml'])