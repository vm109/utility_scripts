import fs from 'fs';
import {parser} from 'stream-json'
import {streamArray} from 'stream-json/streamers/streamArray'

export class ReadJsonFile {

    public getJsonEntriesAsArrayPipeline(full_file_path: string): any {
        const pipeline = fs.createReadStream(full_file_path, 'utf-8')
                        .pipe(parser())
                        .pipe(streamArray())
        return pipeline
    }
}
