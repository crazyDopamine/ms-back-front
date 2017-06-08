/**
 * Created by dongwei on 2016/11/18.
 */
import { Component,Input,Output,EventEmitter } from '@angular/core';
import { UserApiService } from '../../../service/webApi.service';
import { GlobalService } from '../../../service/global.service';
import { LocalStorage } from '../../../service/localStorage.service';
@Component({
    selector: 'st-login-modal',
    templateUrl:'app/page/widget/modals/login.component.html'
})
export class LoginComponent {
    private isShow:boolean=false;
    private callback:Function;
    constructor(private userApi:UserApiService,private global:GlobalService,private localStorage:LocalStorage){

    }
    private data:Object={
        account:'',
        password:''
    };
    private submit(){
        this.userApi.login(this.data).subscribe(user=>{
            this.localStorage.set(this.global.globalKey.account,this.data['account']);
            this.localStorage.set(this.global.globalKey.password,this.data['password']);
            this.global.userInfo=user;
            this.global.userInfoLoaded=true;
            this.global.notify();
            if(this.callback)this.callback();
            this.isShow = false;
        });
    }
    public show():Promise<any>{
        this.isShow = true;
        this.data = {
            account:this.localStorage.get(this.global.globalKey.account),
            password:this.localStorage.get(this.global.globalKey.password)
        }
        var promise = new Promise<any>((resolve,reject)=>{
            this.callback = resolve;
        });
        return promise;
    }
}