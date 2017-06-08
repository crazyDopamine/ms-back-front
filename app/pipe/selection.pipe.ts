import { Pipe, PipeTransform } from '@angular/core';
import { SelectionsService } from '../service/selections.service'

@Pipe({name: 'selection',pure: false})
export class SelectionPipe implements PipeTransform {
    constructor(private selectionsService:SelectionsService){
    }
    private map={};
    transform(value: string, code: string): string {
        if(!this.map[code]){
            this.map[code] = {};
            this.selectionsService.getSelections(code).then(datas=>{
                for(var i in datas){
                    this.map[code][datas[i].value] = datas[i].name;
                }
            });
        }

        return this.map[code][value];
    }
}