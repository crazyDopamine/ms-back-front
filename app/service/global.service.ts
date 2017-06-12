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
        codeMirror:true,
        imageUploadURL:window['baseUrl']+"file/editorUpload",//GLOBAL.INCONFIG.getIP()+接口名称,
        //imageUploadURL:"http://11.177.50.63:9999/emanager/sns/uploadPhoto",//本地路径
        imageUploadParams:{},//接口其他传参,默认为空对象{},
        imageUploadMethod:"POST",//POST/GET,
        fileMaxSize: 20 * 1024 * 1024,
        fileAllowedTypes: ['*']
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
    public mix(...argu:any[]){
        if(argu.length<=0)return {};
        var obj = argu[0];
        if(!obj)obj={};
        var keys,key;
        for(var i=1;i<argu.length;i++){
            if(argu[i]&&typeof argu[i] == 'object'){
                keys = Object.keys(argu[i]);
                for(var j=0;j<keys.length;j++){
                    key = keys[j];
                    if(typeof argu[i][key] == 'object') {
                        obj[key]=this.mix(obj[key],argu[i][key]);
                    }else{
                        obj[key]=argu[i][key];
                    }
                }
            }
        }
        return obj;
    }

}
