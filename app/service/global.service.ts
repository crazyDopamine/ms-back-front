import { User } from '../model/models';
import { Injectable } from '@angular/core';
import { GlobalObserver } from '../interface/globalObserver.interface';
import { MainNavComponent } from '../page/widget/mainNav.component';
import { AppComponent } from '../page/app.component';

@Injectable()
export class GlobalService {
    public userInfo:User;
    public userInfoLoaded:boolean=false;
    public observers:GlobalObserver[]=[];
    public mainNav:MainNavComponent;
    public pageParams:Object;
    public app:AppComponent;
    public defaultEditorOptions:Object={
        language:'zh_cn',
        codeMirror:true
    }
    public globalKey={
        token:'SKILLTREE_TOKEN',
        account:'SKILLTREE_ACCOUNT',
        password:'SKILLTREE_PASSWORD'
    };
    public notify(){
        for(var i in this.observers){
            this.observers[i].onLoaded();
        }
    }
    public register(observer:GlobalObserver){
        if(!this.observers){
            this.observers=[];
        }
        this.observers.push(observer);
    }
    public cancel(observer:GlobalObserver){
        for(var i in this.observers){
            if(this.observers[i]==observer){
                // this.observers.slice(i,1);
            }
        }
        console.log(this.observers)
    }
    public tp(params:Object){
        return '?'+decodeURI(JSON.stringify(params));
    }
}
