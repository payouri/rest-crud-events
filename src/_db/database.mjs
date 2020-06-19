import { connect } from './connect.mjs'

let db = null

export const database = async () => {
    if(!db) {
        const client = await connect()
        db = await client.db(process.env.MAIN_DB)
    }
    return db
}

export default database