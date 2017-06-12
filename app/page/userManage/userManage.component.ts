/**
 * Created by dongwei on 2016/11/18.
 */
import {Component} from '@angular/core';
import { User } from '../../model/models'
import {UserApiService} from '../../service/webApi.service';
import {GlobalService} from '../../service/global.service';
import {GlobalObserver} from '../../interface/globalObserver.interface'
import {TableService} from '../../service/table.service'
import { TableOptions } from '../../service/tableOptions'
@Component({
    selector: 'user-manage',
    templateUrl:'dist/page/userManage/userManage.component.html'
})
export class UserManageComponent implements GlobalObserver{
    table:TableService<User>;
    constructor(private global:GlobalService,private api : UserApiService){
        this.table = new TableService<User>('user',api,global);
    }
    ngOnInit(){
        this.global.register(this);
        this.global.mainNav.setCurrent('userManage');
        if(this.global.userInfoLoaded){
            this.onLoaded();
        }
    }
    onLoaded(){
        this.table.refresh();
    }
}