import { Postgres } from '../utilities/postgres/postgres_connection';
import {PostgresCredentials} from '../models/postgres_connection';
import { Pool, QueryResult } from 'pg';

export class PostgresTableService {
    private PostgresConnection: Postgres;
    constructor(credentials:PostgresCredentials){
        this.PostgresConnection =  new Postgres(credentials)
    }

    /**
     * returns all error counts in the s_embedded_circulations_only
     */
    async countAllErrorsInEmbeddedOnlyCirculations():Promise<number>{
        const embedded_circulations = 's_embedded_circulations_only'

        return await this.countByQueryAndTableName(`error is not null`, embedded_circulations)
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