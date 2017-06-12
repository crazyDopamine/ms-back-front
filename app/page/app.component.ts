/**
 * Created by dongwei on 2016/11/18.
 */
import {Component,ViewChild} from '@angular/core';
import {UserApiService} from '../service/webApi.service';
import {URLSearchParams} from '@angular/http';
import {GlobalService} from '../service/global.service';

import {ConfirmComponent} from './widget/modals/confirm.component'
import {LoginComponent} from './widget/modals/login.component'
import {CookieService} from 'angular2-cookie/core';
import { LocalStorage } from '../service/localStorage.service'
@Component({
    selector: 'main-app',
    templateUrl:'dist/page/app.component.html'
})
export class AppComponent{
    @ViewChild(ConfirmComponent)
    public confirmModal : ConfirmComponent;
    @ViewChild(LoginComponent)
    public loginModal:LoginComponent;
    constructor(private userApi:UserApiService,private global:GlobalService,private cookieService:CookieService,
    private localStorage:LocalStorage){
    }
    ngOnInit(){
        this.global.app = this;
        var token = this.cookieService.get(this.global.globalKey.token);
        if(!token){
            token = this.localStorage.get(this.global.globalKey.token);
        }
        if(!token){
            this.userApi.login({account:'admin',password:'admin'}).subscribe(user => {
                this.global.userInfo=user;
                this.global.userInfoLoaded=true;
                this.localStorage.set(this.global.globalKey.token,this.cookieService.get(this.global.globalKey.token));
                this.global.notify();
                this.global.mainNav.showMenu();
            });
        }else{
            this.userApi.userInfo().subscribe(user => {
                this.global.userInfo=user;
                this.global.userInfoLoaded=true;
                this.global.notify();
                this.global.mainNav.showMenu();
            },err=>{
                console.log(err)
            });
        }
        
    }
}