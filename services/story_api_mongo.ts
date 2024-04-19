import { MongoConnection } from '../utilities/mongo/create_mongo_connections'
import { Work } from '../models/work';
import { AsyncWorkers } from '../utilities/workers/async_worker';
export class StoryAPiMongo {
    private mongo_connection: MongoConnection;

    constructor(mongo_string: string, is_srv: boolean) {
        this.mongo_connection = new MongoConnection(mongo_string, is_srv)
    }

    public async printAllCollectionNames() {
        const collectionsNames = await this.mongo_connection.getAllCollectionNames()
        for (const collecionName of collectionsNames) {
            console.log(collecionName)
        }
    }

    public async ifCollectionHasBranchOtherThanDefault() {
        const collections = await this.mongo_connection.getAllCollections()

        const total_collections_per_thread = 1
        let total_threads = Math.ceil(collections.length / total_collections_per_thread)

        console.log(collections.length)
        console.log(total_threads)
        let allWorkers: Promise<void>[] = []
        for (let i = 0; i < total_threads; i++) {
            const start = i * total_collections_per_thread
            const end = start + total_collections_per_thread
            const collectionsSlice = collections.slice(start, end)
            const storywork = new StoryApiCollectoinWorker(collectionsSlice, `${start}_${end}`)
            allWorkers.push(storywork.logic())
        }

        await Promise.all(allWorkers)
        await this.mongo_connection.closeDbConnection()
    }

    public async doRevisionsCollectionsHaveAStory(story_ids:string[], collection_name:string): Promise<boolean>{
        try{
        const collection = await this.mongo_connection.getACollectionByName(collection_name) 
        for await (let story_id of story_ids){
            const story_in_revision = await collection.findOne({
                "story._id": `${story_id}`
            })
            if(story_in_revision){
                console.log(story_in_revision)
                return true
            }
        }
        const testing = await collection.findOne({"story._id":"ITDHIJ3JZZAG3OXXKTIYN7DTDU"})
        return false
        }finally{
            await this.mongo_connection.closeDbConnection()
        }
    }
}



class StoryApiCollectoinWorker extends Work {
    private collections: any[]
    private id: string
    constructor(collections: any, id: string) {
        super()
        this.collections = collections
        this.id = id
    }
    async logic(): Promise<void> {
        try {
            let i = 0
            for (const collection of this.collections) {
                if (collection.collectionName.includes('_histories')) {
                    const aggregateion_query = [
                        {
                            $match: {
                                $expr: {
                                    $gt: [{ $size: { $objectToArray: "$branches" } }, 1]
                                }
                            }
                        },
                        {
                            $limit: 1
                        }
                    ];
                    const document = await collection.aggregate(aggregateion_query).next()
                    if (document) {
                        console.log(collection.collectionName)
                        console.log(document.branches)
                        console.log(await collection.countDocuments({}))
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
}