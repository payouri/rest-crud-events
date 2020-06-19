import { events } from '../_db/collections.mjs'
import MongoDB from 'mongodb'
const { ObjectId } = MongoDB

export const getPage = async (start, length) => {
    if(isNaN(length) || length > 20 || length < 1) length = 20
    if(isNaN(start) || start < 1) start = 0
    const collection = await events()
    const items = await collection.find({  }, { skip: start, limit: length }).toArray()
    const total = await collection.estimatedDocumentCount()
    return {
        events: items || [],
        start,
        length,
        currentPage: start/length,
        total: total || Number(0),
        totalPage: total%length == 0 ? total/length : length == 1 ? total : total/length + 1 
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