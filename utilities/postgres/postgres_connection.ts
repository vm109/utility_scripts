import {Pool, Client, QueryResult} from 'pg';
import {PostgresCredentials} from '../../models/postgres_connection';
import fs from 'fs'

export class Postgres {
    private pool:Pool
    private client: Client

    constructor(credentials: PostgresCredentials){
        const connection_string = `postgres://${credentials.user}:${credentials.password}@${credentials.host}:${credentials.port}/${credentials.database_name}?sslrootcert=${credentials.cert_path}`
        console.log(connection_string)
        this.pool = new Pool({
            connectionString: connection_string
        })

        this.client =  new Client({
            user: credentials.user,
            host: credentials.host,
            database: credentials.database_name,
            password: credentials.password,
            port: credentials.port
        })
    }
    
    public getPool(): Pool{
        return this.pool
    }

    public closePool() {
        this.pool.end()
    }
}