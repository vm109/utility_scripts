import * as redis from 'redis'

export class CacheUtility {
    private client: redis.RedisClientType
    constructor(url:string){
        this.client = redis.createClient({url: url});
        this.client.on('error', (error) => {
            console.error('Redis connection error:', error);
        });
    }

    public async openConnection(): Promise<void>{
        await this.client.connect()
    }

    public async closeConnection(): Promise<void> {
        try{
        this.client.quit();
        console.log("connection closed")
        }catch(err){
            console.log("error closing connection", err)
        }
    }

    public async getKey(key: any, options?: any): Promise<any> {
       return await this.client.get(key)
    }

    public async setKey(key: any, value: any, options?: any): Promise<void> {
        try{
            await this.client.set(key, value, options)
        }catch(err){
            console.log("some error trying to set key value")
        }
    }
}
