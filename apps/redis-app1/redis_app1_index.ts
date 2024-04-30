import {CacheUtility} from '../../utilities/cache/cache_connection'
import dotenv from 'dotenv'
dotenv.config()

const app = async () => {
    const REDIS_CONFIG = process.env.REDIS_CONFIG ?? ''
    const cacheUtility = new CacheUtility(REDIS_CONFIG)
    await cacheUtility.openConnection()
    //await cacheUtility.setKey("key", "value")
    console.log((await cacheUtility.getKey("key")))
    await cacheUtility.closeConnection()
}   

app()