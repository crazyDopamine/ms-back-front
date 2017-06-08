/**
 * Created by dongwei on 2016/11/18.
 */
import { Component,Input,Output,EventEmitter } from '@angular/core';
@Component({
    selector: 'st-pagination',
    templateUrl:'app/page/widget/pagination.component.html'
})
export class PaginationComponent {
    private list:Array<number> = [];
    private _total:number=20;
    @Input()
    set total(total:number){
        this._total = total;
        this.list = [];
        for(let i=1;i<=total;i++){
            this.list.push(i);
        }
    }
    get total():number{
        return this._total;
    }
    @Input()
    private current:number=5;
    @Output()
    private change=new EventEmitter<number>();
    next(page:number){
        if(this.current!=page&&page>0&&page<=this.total){
            this.current = page;
            this.change.emit(page);
        }
    }
}