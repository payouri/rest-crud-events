import { events } from '../_db/collections.mjs'
import MongoDB from 'mongodb'
const { ObjectId } = MongoDB

export const getPage = async (page, length) => {
    const collection = await events()
    const items = await collection.find({  }, { skip: length * page, limit: length }).toArray()
    const total = await collection.estimatedDocumentCount()
    return {
        events: items || [],
        start,
        length,
        currentPage: page,
        total: total || Number(0),
        totalPage: total%length == 0 ? total/length : length == 1 ? total : Math.ceil(total/length)
    }
}

export const getById = async id => {
    const collection = await events()
    return await collection.findOne({ _id: new ObjectId(id) })
}

export const updateById = async (id, data) => {
    const collection = await events()
    return await collection.findOneAndUpdate({ _id: new ObjectId(id) }, data, { returnOriginal: false })
}

export const createOne = async data => {
    const collection = await events()
    return await collection.insertOne(data)
}

export const deleteOne = async id => {
    const collection = await events()
    return await collection.deleteOne({ _id: new ObjectId(id) })
}