export class PostgresCredentials {
    user: string;
    host: string;
    database_name: string;
    password: string;
    port: number;
    cert_path: string;

    constructor({ user, host, database_name, password, port, cert_path }: {
        user: string;
        host: string;
        database_name: string;
        password: string;
        port: number;
        cert_path: string;
    }) {
        this.user = user;
        this.host = host;
        this.database_name = database_name;
        this.password = password;
        this.port = port;
        this.cert_path = cert_path;
    }
}