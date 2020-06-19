import MongoClient from 'mongodb'

export let dbConnection = null

export const connect = async () => {
    if(!dbConnection) {
        dbConnection = await MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true })
    }
    return dbConnection
}

export const disconnect = async () => {
    if(dbConnection && dbConnection.isConnected()) {
        dbConnection = await dbConnection.close()
    }
    return dbConnection
}