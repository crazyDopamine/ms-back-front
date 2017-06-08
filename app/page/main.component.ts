/**
 * Created by dongwei on 2016/11/18.
 */
import {Component} from '@angular/core';
import {User} from '../model/models'
import {GlobalService} from '../service/global.service';
import {GlobalObserver} from '../interface/globalObserver.interface'
import {TableService} from '../service/table.service'
@Component({
    selector: 'main-area',
    templateUrl:'app/page/main.component.html'
})
export class MainComponent implements GlobalObserver{
    table:TableService<User>;
    constructor(private global:GlobalService){
    }
    ngOnInit(){
        this.global.register(this);
    }
    onLoaded(){
    }
}