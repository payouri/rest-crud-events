import { database } from './database'

export const events = async _ => {
    const db = await database()
    return db.collection('events')
}