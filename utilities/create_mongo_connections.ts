import { Db, MongoClient, Collection } from 'mongodb';

export class MongoConnection {
    private mongo_string: string;
    private mongo_client: MongoClient
    private mongo_db: Db | null = null;

    constructor(mongo_string: string, is_srv: boolean) {
        if(is_srv){
        this.mongo_string = `mongodb+srv://${mongo_string}`
        }else{
            this.mongo_string = `mongodb://${mongo_string}`
        }
    }

    public async createMongoClient() {
        if(!this.mongo_client){
            this.mongo_client = await MongoClient.connect(this.mongo_string)
        }
        return this.mongo_client
    }

    public async getMongoConnectionDb(): Promise<Db> {
        if (!this.mongo_db) {
            const client = await this.createMongoClient()
            this.mongo_db = client.db();
        }
        return this.mongo_db;
    }

    public async closeDbConnection() {
        if(this.mongo_client){
            await this.mongo_client.close()
        }
    }

    public async getAllCollectionNames(): Promise<string[]> {
        let collection_names = [];
        (await (await this.getMongoConnectionDb()).collections()).map((collection) => {
            collection_names.push(collection.collectionName);
        });
        return collection_names;
    }

    public async getAllCollections(): Promise<Collection[]> {
        return await (await this.getMongoConnectionDb()).collections()
    }
}
