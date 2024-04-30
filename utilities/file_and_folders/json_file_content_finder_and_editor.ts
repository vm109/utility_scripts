import fs from 'node:fs';
import { JsonObject } from '../../models/JsonObject';
import {JsonKeyFinderAndEditor} from '../json_operations/json_keys_finder_and_editor'

export class JsonFileContentFinderAndEditor {

    public async jsonKeyValueIKeyExistsInFile(file_path:string, key:string):Promise<JsonObject>{
        const fileContent = fs.readFileSync(file_path, 'utf-8');
        const jsonData: JSON = JSON.parse(fileContent);
        return await JsonKeyFinderAndEditor.getAKeyFromJsonRecursively(key, jsonData)   
    }

    public async editAJsonFileKeyWithNewValue(file_path: string, key: string, value: any): Promise<void> {
        const fileContent = fs.readFileSync(file_path, 'utf-8');
        const jsonData: JSON = JSON.parse(fileContent);
        console.log(key)
        const new_json_data = await JsonKeyFinderAndEditor.writeAKeyValueAfterFindingRecursively(key, jsonData, value)
        const updatedContent = JSON.stringify(new_json_data, null, 2);
        fs.writeFileSync(file_path, updatedContent, 'utf-8');
    }
}