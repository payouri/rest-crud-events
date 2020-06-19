export const logger = async (ctx, next) => {
    await next()
    console.log(`${ctx.method} ${ctx.url} ${ctx.request.body}`)
}

export default logger