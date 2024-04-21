import { Filter } from 'mongodb';
import { MongoConnection } from '../../utilities/mongo/create_mongo_connections';

export class MongoUrlService {
    private connection: MongoConnection

    constructor(connection_string: string, is_srv: boolean) {
        this.connection = new MongoConnection(connection_string, is_srv)
    }


    public async getAUrlInCanonicalUrlMongoDb(org_id:string, site_id:string, document_id:string): Promise<any>{
        try{
        const collection_name = `${org_id}_${site_id}_url`
        return await this.connection.getDocumentByQuery(collection_name, {content_id: document_id})
        }catch(e){
            console.log("----error in getAUrlInCanonicalUrlMongoDb---")
            console.log(e)
        }
    }

    public async closeDbConnection(){
        await this.connection.closeDbConnection()
    }
}