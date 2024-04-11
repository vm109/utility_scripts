/**
 * Custom class for TGAM histories issue.
 * This class handles the special histories for TGAM, where there are 2 different branches: default and feeds.
 */
import { ReadJsonFile } from "../utilities/get_list_of_records_in_json";
import {StoryApi} from "./story_api_requests"
import equal from 'fast-deep-equal';

export class TgamHistories {
    
    /**
     * Calculates the percentage of the latest revision on the feeds branch.
     * @returns The percentage of the latest revision on the feeds branch.
     */

    private FilePath: string
    private JsonArrayPipeline: any
    constructor(file_path: string){
        this.FilePath = file_path
        this.JsonArrayPipeline = new ReadJsonFile().getJsonEntriesAsArrayPipeline(file_path)
    }
    public async percentageOfLatestRevisionOnFeedsBranch(): Promise<number> {

        let matchMyRequirement = 0
        let actualCount = 0
        for await (const value of this.JsonArrayPipeline) {
            actualCount += 1;
            if (
                value.value.latest &&
                value.value.branches.feed &&
                value.value.branches.feed.versions &&
                value.value.latest.revision.revision_id ===
                    value.value.branches.feed.versions[value.value.branches.feed.versions.length - 1].revision.revision_id
            ) {
                matchMyRequirement += 1;
            }
        }

        console.log('Actual Count:', actualCount);
        console.log('Matched Count:', matchMyRequirement);
        if(actualCount>0){
        return (matchMyRequirement*100)/actualCount
        }
        return 0
    }

    public async writeDiffOfRevisionsFeedToDefault(token:string, host:string){
        let contentElementsCount = 0
        let headlineCount = 0
        let taxonomyCount = 0
        let isWiresCount = 0
        let canonicalUrlCount = 0
        let created_date = 0
        let last_updated_date = 0
        
        const revision = new StoryApi(token, host)
        for await (const value of this.JsonArrayPipeline){
            headlineCount += 1
            const latestDefault = value.value.branches.default.versions[value.value.branches.default.versions.length-1]
            const latestFeed = value.value.branches.feed.versions[value.value.branches.feed.versions.length-1]
            
            // if(value.value.branches.default.versions && value.value.branches.feed.versions && value.value.branches.default.versions.length>0 && value.value.branches.feed.versions.length>0){
            //     const latestDefault = value.value.branches.default.versions[value.value.branches.default.versions.length-1]
            //     const latestFeed = value.value.branches.feed.versions[value.value.branches.feed.versions.length-1]
            //     if(latestDefault.headlines.basic !== latestFeed.headlines.basic){
            //         headlineCount +=1
            //         // console.log(`document_id - ${latestDefault._id}, default - ${latestDefault.revision.revision_id},feed - ${latestFeed.revision.revision_id}`
            //         await new Promise(resolve => setTimeout(resolve, 100));
            //         const defaultRevision = await revision.getRevision(latestDefault._id, latestDefault.revision.revision_id)
            //         await new Promise(resolve => setTimeout(resolve, 100));
            //         const feedRevision = await revision.getRevision(latestFeed._id, latestFeed.revision.revision_id)

            //         if(defaultRevision.content_elements && feedRevision.content_elements && defaultRevision.content_elements.length === feedRevision.content_elements.length){
            //             if (equal(defaultRevision.content_elements, feedRevision.content_elements)){
            //                 contentElementsCount +=1
            //                 console.log(contentElementsCount)
            //                 console.log(defaultRevision._id)
            //             }
            //         }

            //         // find if taxonomies are equal
            //         if(equal(defaultRevision.taxonomy, feedRevision.taxonomy)){
            //             taxonomyCount += 1
            //         }

            //         // find if the revision is not wires
            //         if(defaultRevision.source && feedRevision.source && defaultRevision.source.source_type === 'wires' && feedRevision.source.source_type === 'wires'){
            //             isWiresCount += 1
            //         }

            //         if(defaultRevision.canonical_url && feedRevision.canonical_url && defaultRevision.canonical_url === feedRevision.canonical_url){
            //             canonicalUrlCount += 1
            //         }

            //         if(defaultRevision.created_date && feedRevision.created_date && defaultRevision.created_date === feedRevision.created_date){
            //             created_date += 1
            //         }

            //         if(defaultRevision.last_updated_date && feedRevision.last_updated_date && defaultRevision.last_updated_date === feedRevision.last_updated_date){
            //             last_updated_date += 1
            //         }
            //     }
            // }
            if(headlineCount > 100){
                break
            }
        }
        // console.log(headlineCount)
        // console.log(`contente_elements are equal ${contentElementsCount}`)
        // console.log(`headline counts are equal ${headlineCount}`)
        // console.log(`taxonomy is equal ${taxonomyCount}`)
        // console.log(`is wires for both ${isWiresCount}`)
        // console.log(`canoincal_url count ${canonicalUrlCount}`)
        // console.log(`created_date ${created_date}`)
        // console.log(`last_updated_date ${last_updated_date}`)
    }
}