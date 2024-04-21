import { Postgres } from '../utilities/postgres/postgres_connection';
import {PostgresCredentials} from '../models/postgres_connection';
import { Pool, QueryResult } from 'pg';

export class PostgresTableService {
    private PostgresConnection: Postgres;
    private embedded_circulations_table:string = 's_embedded_circulations_only'
    private circulations_table:string = 'circulations'
    constructor(credentials:PostgresCredentials){
        this.PostgresConnection =  new Postgres(credentials)
    }

    /**
     * returns all error counts in the s_embedded_circulations_only
     */
    async countAllErrorsInEmbeddedOnlyCirculations():Promise<number>{

        return await this.countByQueryAndTableName(`error is not null`, this.embedded_circulations_table)
    }

    async getAllDocumentIdsWhichHaveErrorsInEmbeddedOnlyCirculations(): Promise<any> {
        try {
            const rows = await this.queryByWhereClause(['document_id'], 'error is not null group by document_id', this.embedded_circulations_table);
            const document_websites: any = {};
            const documentWebsitesPromises = rows.map(async (document_result: any) => {
                const document_id = document_result.document_id;
                const circulations_websites_of_document = await this.queryByWhereClause(['document_id', 'website_id'], `document_id='${String(document_result.document_id)}'`, this.circulations_table);
                circulations_websites_of_document.forEach((circulation_website: any) => {
                    const website_id = String(circulation_website.website_id);
                    if (document_websites[website_id]) {
                        document_websites[website_id].push(document_id);
                    } else {
                        document_websites[website_id] = [document_id];
                    }
                });
            });
            await Promise.all(documentWebsitesPromises);
            return document_websites;
        } finally {
            this.PostgresConnection.closePool();
        }
    }
    

    private async queryByWhereClause(fields:string[], where_clasuse:string, table_name:string):Promise<any[]>{
        let fields_query_str =''
        try{
        const pool = this.PostgresConnection.getPool()
        for (let i = 0; i < fields.length; i++) {
            fields_query_str += fields[i];
            if (i !== fields.length - 1) {
            fields_query_str += ',';
            }
        }

        const result: QueryResult = await pool.query(`SELECT ${fields_query_str} FROM ${table_name} WHERE ${where_clasuse}`)
        return result.rows
        }catch(e){
            console.log("---error in queryByWhereClause----")
            console.log(e)
            return []
        }
    }

    private async countByQueryAndTableName(query:string, table_name:string):Promise<number>{
        try{
        const pool = this.PostgresConnection.getPool()
        const result: QueryResult = await pool.query(`SELECT COUNT(*) FROM ${table_name} WHERE ${query}`);
        return Number(result.rows[0].count);
        }catch(e){
            console.log("---error in countByQueryAndTableName----")
            console.log(e)
        }finally{
            this.PostgresConnection.closePool()
        }
        return NaN
    }
}