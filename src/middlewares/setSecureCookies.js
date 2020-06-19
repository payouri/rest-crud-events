export const setCookie = (cookies, opts = {}) => (ctx, next) => {
    await.next()
    for(const key in cookies) {
        ctx.cookies.set(key, cookies[key], {...opts, secure: true})
    }
}

export default setCookie