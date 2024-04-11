import {MongoConnection} from '../utilities/create_mongo_connections'

export class StoryAPiMongo {
    private mongo_connection: MongoConnection;
    
    constructor(mongo_string: string, is_srv:boolean){
        this.mongo_connection = new MongoConnection(mongo_string, is_srv)
    }

    public async printAllCollectionNames() {
        const collectionsNames = await this.mongo_connection.getAllCollectionNames()
        for (const collecionName of collectionsNames) {
            console.log(collecionName)
        }
    }

    public async ifCollectionHasBranchOtherThanDefault() {
        const aggregateion_query = [{
            $match: {
                $expr: {
                    $gt: [{$size:{$objectToArray: "$branches"}}, 1]
                }
            }
        },
        {
            $limit: 1
        }
    ]

        for (const collection of await this.mongo_connection.getAllCollections()) {
            if(collection.collectionName.includes('_histories')){
                const document = await collection.aggregate(aggregateion_query).next()
                if(document){
                    console.log(collection.collectionName)
                    console.log(document.branches)
                }
            }
        }
    }
}