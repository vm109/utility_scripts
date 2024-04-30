import fs from 'node:fs';
import {PassThrough} from 'node:stream'

export class ScrollThroughFilesInFolder {
    private folder_path: string
    private stream: PassThrough
    constructor(folder_path:string){
        this.folder_path = folder_path;
        this.stream = new PassThrough()
    }

    
    public async listAllFilesOfAPatternInFolder(file_name_pattern?:string, file_type?: string): Promise<PassThrough> {
        let files: string[] = [];
        const allFiles:string[] = fs.readdirSync(this.folder_path, {
            recursive: true,
            encoding: 'utf-8'
        });
        let filePattern: RegExp;
        if (file_name_pattern && file_type) {
            filePattern = new RegExp(`^.*${file_name_pattern}.*\\.${file_type}$`, 'i');
        } else if (file_name_pattern) {
            filePattern = new RegExp(`^.*${file_name_pattern}.*$`, 'i');
        } else {
            filePattern = new RegExp(`^.*\\.${file_type}$`, 'i');
        }
        for (const file of allFiles) {
            if (filePattern && filePattern.test(file)) {
                this.stream.write(file)
            }
        }
        this.stream.end()
        return this.stream;
    }
}
