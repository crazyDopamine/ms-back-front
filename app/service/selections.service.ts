import {Injectable} from '@angular/core';
import { DictionaryApiService } from './webApi.service';
import { Dictionary } from '../model/models';

@Injectable()
export class SelectionsService{
    private map={};
    constructor(private api:DictionaryApiService){
    }
    public getSelections(code:string):Promise<Dictionary[]>{
        let promise = new Promise<Dictionary[]>((success,error)=>{
            if(this.map[code]){
                success(this.map[code]);
                return;
            }else{
                this.api.list({code:code}).subscribe(data=>{
                    this.map[code]=data.dataList;
                    success(data.dataList);
                });
            }
        });
        return promise;
    }
}
