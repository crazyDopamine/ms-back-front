import { TableOptions } from './tableOptions'
import { CommonApiInterface } from '../interface/commonApi.interface';
import { GlobalService } from './global.service';

export class TableData<T>{
    dataList:T[];
    count:number;
}

export class TableService<T> {
    public showPagination:boolean = false;
    public loadFlag:number = 0;
    public options:TableOptions;
    public dataList:Array<T>;
    public params:Object={};
    public page:number=1;
    public count:number=0;
    public pages:number=0;
    constructor(public module:string,private api:CommonApiInterface<T>,protected global:GlobalService,options?:TableOptions){
        if(options) {
            this.options = options;
        }else{
            this.options = new TableOptions();
        }
    }
    public refresh(page?:number){
        if(page){
            this.page = page;
        }
        let params = {page:this.page,pageSize:this.options.pageSize,where:JSON.stringify(this.params)};
        this.api.list(params).subscribe(data => {
            this.dataList = data.dataList;
            this.count = data.count;
            this.pages = Math.ceil(this.count / this.options.pageSize);
        });
    }
    public remove(id:number){
        this.api.remove(id).subscribe(data=>{
            this.refresh();
        });
        // this.api.remove(id).subscribe(data=>{
        //     this.refresh();
        // });
    }
}
