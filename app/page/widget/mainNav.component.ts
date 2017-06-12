/**
 * Created by dongwei on 2016/11/18.
 */
import { Component } from '@angular/core';
import { GlobalService } from '../../service/global.service'
@Component({
    selector: 'main-nav',
    templateUrl:'dist/page/widget/mainNav.component.html'
})
export class MainNavComponent{
    constructor(private global:GlobalService){
        global.mainNav=this;
    }
    private menu:Array<any>;
    current:string='';
    showMenu(){
        this.menu=[];
        if(this.global.userInfo.type==1){
            this.menu.push({
                name:'用户管理',
                expanded:false,
                children:[
                    {
                        name:'用户管理',
                        url:'/userManage',
                        index:'userManage'
                    }
                ]
            });
            this.menu.push({
                name:'公告管理',
                expanded:false,
                children:[
                    {
                        name:'公告管理',
                        url:'/msgManage',
                        index:'msgManage'
                    }
                ]
            });
        }else{
            this.menu.push({
                name:'公告管理',
                expanded:false,
                children:[
                    {
                        name:'公告管理',
                        url:'/msgManage',
                        index:'msgManage'
                    }
                ]
            });
        }

    }
    setCurrent(current:string){
        this.current = current;
        for(let i in this.menu){
            let item = this.menu[i];
            if(this.menu[i].children){
                for(let j in item.children){
                    if(item.children[j].index==current){
                        item.expanded=true;
                    }
                }
            }

        }
    }
}