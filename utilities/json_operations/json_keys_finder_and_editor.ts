import {JsonObject} from '../../models/JsonObject'
export class JsonKeyFinderAndEditor {
    
    public static async getAKeyFromJsonRecursively(key:string, json_object: JsonObject): Promise<any>{
        if(json_object && json_object !== null && key in json_object){
            return json_object[key]
        }

        for(const prop in json_object){
            if(typeof json_object[prop] === 'object'){
                const result = await JsonKeyFinderAndEditor.getAKeyFromJsonRecursively(key, json_object[prop] as JsonObject);
                if(result && result !== null){
                    return result
                }
            }
        }

        return undefined
    }

    public static async writeAKeyValueAfterFindingRecursively(key:string, json_object:JsonObject, value: any):Promise<JsonObject>{
        console.log(json_object)
        if(json_object && json_object !== null && json_object[key]){
            console.log(json_object)
            json_object[key] = value
            return json_object
        }

        for(const prop in json_object){
            console.log(prop)
            if(typeof json_object[prop] === 'object' && json_object[prop] !== null && !Array.isArray(json_object[prop])){
                const new_json_object = await JsonKeyFinderAndEditor.writeAKeyValueAfterFindingRecursively(key, json_object[prop] as JsonObject, value)
                if(new_json_object && new_json_object !== null && new_json_object !== json_object[prop]){
                    json_object[prop] = new_json_object
                    return json_object
                }
            }
        }

        return json_object
    }
}