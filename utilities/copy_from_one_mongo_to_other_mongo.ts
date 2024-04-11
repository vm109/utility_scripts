import {MongoConnection} from './create_mongo_connections'


export class CopyMongoFromOneToOther{
    private source_mongo_db:MongoConnection
    private destination_mongo_db:MongoConnection 
    
    async initialize(mongo_source_string: string, mongo_destination_string: string, source_is_srv: boolean, destination_is_srv: boolean) {
        this.source_mongo_db = new MongoConnection(mongo_source_string, source_is_srv)
        this.destination_mongo_db = new MongoConnection(mongo_destination_string, destination_is_srv)
    }

    public async copy_single_collection(collection_name: string) {
        try{
        const sourceCollection = (await this.source_mongo_db.getMongoConnectionDb()).collection(collection_name);
        const destinationCollection = (await this.destination_mongo_db.getMongoConnectionDb()).collection(collection_name);
        const documents = await sourceCollection.find().toArray();
        console.log(documents)
        await destinationCollection.insertMany(documents);

        // Copy indexes
        const sourceIndexes = await sourceCollection.indexes();
        for (const index of sourceIndexes) {
            await destinationCollection.createIndex(index.key, index.options);
        }

        this.source_mongo_db.closeDbConnection()
        this.destination_mongo_db.closeDbConnection()

        }catch(e){
            console.log(e)
        }
    }

    public async copy_indexes_of_one_collection_to_other(source_collection_name: string, destination_collection_name:string){
        try {
        const sourceCollection = (await this.source_mongo_db.getMongoConnectionDb()).collection(source_collection_name);
        const destinationCollection = (await this.destination_mongo_db.getMongoConnectionDb()).collection(destination_collection_name);

        // Copy indexes
        const sourceIndexes = await sourceCollection.indexes();
        console.log(sourceIndexes)
        for (const index of sourceIndexes) {
            await destinationCollection.createIndex(index.key, index.options);
        }

        this.source_mongo_db.closeDbConnection()
        this.destination_mongo_db.closeDbConnection()

        }catch(e){
            console.log(e)
            this.source_mongo_db.closeDbConnection()
            this.destination_mongo_db.closeDbConnection()
        }
    }
}