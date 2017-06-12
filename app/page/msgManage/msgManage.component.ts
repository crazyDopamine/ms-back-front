/**
 * Created by dongwei on 2016/11/18.
 */
import {Component} from '@angular/core';
import { Msg } from '../../model/models'
import {MsgApiService} from '../../service/webApi.service';
import {GlobalService} from '../../service/global.service';
import {GlobalObserver} from '../../interface/globalObserver.interface'
import {TableService} from '../../service/table.service'
@Component({
    selector: 'skill-manage',
    templateUrl:'dist/page/msgManage/msgManage.component.html'
})
export class MsgManageComponent implements GlobalObserver{
    table:TableService<Msg>;
    constructor(private global:GlobalService,private api : MsgApiService){
        this.table = new TableService<Msg>('msg',api,global);
    }
    ngOnInit(){
        this.global.register(this);
        this.global.mainNav.setCurrent('msgManage');
        if(this.global.userInfoLoaded){
            this.onLoaded();
        }
    }
    onLoaded(){
        this.table.refresh();
    }
}