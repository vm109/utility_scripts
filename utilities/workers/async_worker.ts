import {Work} from '../../models/work'

export class AsyncWorkers {
    private number_of_workers: number;
    constructor(number_of_workers:number){
        this.number_of_workers = number_of_workers
    }

    start(){
        // Code to start the synchronous worker
    }

    run(work: Work){
        for(let i=0; i<this.number_of_workers; i++){
            work.logic
        }
    }

    stop(){
        
    }
}
