import { Injectable } from '@angular/core';
import { Http,Response,Headers,URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { CommonApiInterface } from '../interface/commonApi.interface'
import { TableData } from './table.service'
import { User,Msg,Dictionary } from '../model/models';
import {CookieService} from 'angular2-cookie/core';
import {GlobalService} from '../service/global.service';
// import {handleError} from "typings/dist/support/cli";

export class BaseApi{
    protected baseUrl = "http://116.62.23.38:3000/";
    constructor(protected http: Http,protected cookieService:CookieService,protected global:GlobalService) {
    }

    protected extractData<E>(observable:Observable<Response>):Observable<E>{
        let self = this;
        return observable.map(res => res.json().data).catch((res)=>{
            let promise = new Promise<any>((success,error)=>{
                switch (res.status){
                    case 401:
                        self.global.app.loginModal.show().then(function(){
                            success(res);
                        });
                        break;
                    default:
                        error(res);
                }
            });
            return promise;
        });
    }

    protected commonRequestOptions(search? : URLSearchParams){
        let header = new Headers();
        var token = this.cookieService.get(this.global.globalKey.token);
        if(search&&token){
            search.set('token',token);
        }else if(token){
            search = new URLSearchParams();
            search.set('token',token);
        }
        header.append('Content-Type','application/json;charset=utf-8');
        return {
            withCredentials:true,
            search:search,
            header:header
        };
    }

    public tp(search:Object):URLSearchParams{
        let params = new URLSearchParams();
        if(!search)return params;
        for(let key in search){
            if(search[key]!==null&&search[key]!==undefined){
                params.set(key,search[key].toString());
            }
        }
        return params
    }
}

export class CommonApi<T> extends BaseApi{
    constructor(protected module:string,protected http: Http,protected cookieService:CookieService,protected global:GlobalService) {
        super(http,cookieService,global);
    }

    public list(obj:Object):Observable<TableData<T>> {
        let params = this.tp(obj);
        return this.extractData<TableData<T>>(this.http.get(this.baseUrl+this.module+'/list',this.commonRequestOptions(params)));
    }

    public detail(id:number):Observable<T>{
        let params = new URLSearchParams();
        params.set('id',id.toString());
        return this.extractData<T>(this.http.get(this.baseUrl+this.module+'/detail',this.commonRequestOptions(params)));
    }

    public insert(obj:Object):Observable<T>{
        let params = this.tp(obj);
        return this.extractData<T>(this.http.post(this.baseUrl+this.module+'/insert',params,this.commonRequestOptions()));
    }

    public update(obj:Object):Observable<T>{
        let params = this.tp(obj);
        console.log(params);
        return this.extractData<T>(this.http.put(this.baseUrl+this.module+'/update',params,this.commonRequestOptions()));
    }

    public remove(id:number):Observable<T>{
        let params = new URLSearchParams();
        params.set('id',id.toString());
        return this.extractData<T>(this.http.delete(this.baseUrl+this.module+'/delete',this.commonRequestOptions(params)));
    }
}

@Injectable()
export class UserApiService extends CommonApi<User> implements CommonApiInterface<User>{
    constructor(http: Http,cookieService:CookieService,global:GlobalService) {
        super('user',http,cookieService,global);
    }
    login(obj:Object):Observable<User> {
        let params = this.tp(obj);
        return this.extractData<User>(this.http.get(this.baseUrl+this.module+'/login',this.commonRequestOptions(params)));
    }
    userInfo():Observable<User> {
        return this.extractData<User>(this.http.get(this.baseUrl+this.module+'/userInfo',this.commonRequestOptions()));
    }
}

@Injectable()
export class MsgApiService extends CommonApi<Msg> implements CommonApiInterface<Msg>{
    constructor(http: Http,cookieService:CookieService,global:GlobalService) {
        super('msg',http,cookieService,global);
    }
}

@Injectable()
export class DictionaryApiService extends CommonApi<Dictionary> implements CommonApiInterface<Dictionary>{
    constructor(http: Http,cookieService:CookieService,global:GlobalService) {
        super('dictionary',http,cookieService,global);
    }

    public list(obj:Object):Observable<TableData<Dictionary>> {
        let params = this.tp(obj);
        return this.extractData<TableData<Dictionary>>(this.http.get(this.baseUrl+this.module+'/selections',this.commonRequestOptions(params)));
    }
}

// @Injectable()
// export class FileUploadApiService extends BaseApi{
//     constructor(http: Http,cookieService:CookieService,global:GlobalService) {
//         super(http,cookieService,global);
//     }
//
//     public upload(file:Object) {
//     }
// }