/**
 * Created by dongwei on 2016/11/18.
 */
import { Component,ViewChild } from '@angular/core';
import { ActivatedRoute,  } from '@angular/router';
import { Location } from '@angular/common';
import { FormComponent } from '../widget/form.component';
import { UserApiService,DictionaryApiService } from '../../service/webApi.service';
import { User,Dictionary } from '../../model/models'
import { GlobalService } from '../../service/global.service';
import { SelectionsService } from '../../service/selections.service';
import { GlobalObserver } from '../../interface/globalObserver.interface'
@Component({
    selector: 'user-form',
    templateUrl:'dist/page/userManage/userForm.component.html'
})
export class UserFormComponent extends FormComponent<User> implements GlobalObserver{
    private types : Dictionary[] = new Array<Dictionary>();
    private editorOptions:Object={};
    private content:string = '';
    constructor(private global:GlobalService,protected api : UserApiService,private route: ActivatedRoute,protected location:Location,
    private dictionaryApi:DictionaryApiService,private selections:SelectionsService){
        super(api,location);
        this.editorOptions = global.mix({},this.global.defaultEditorOptions,this.editorOptions);
    }
    ngOnInit(){
        this.data = {};
        this.global.register(this);
        this.global.mainNav.setCurrent('userManage');
        this.route.params.subscribe(data=>{
            if(data.id){
                this.data['id']=data.id;
            }
        });
        if(this.global.userInfoLoaded){
            this.onLoaded();
        }
    }
    onLoaded(){
        this.route.params.subscribe(params=>{
            if(params.id){
                this.api.detail(params.id).subscribe(data => {
                    this.setValues(data);
                });
            }
        });
    };
    submit(){
        super.submit();
    }
    // private showSkillPartModal(part:Object){
    //     if(!part){
    //         part = {
    //             skill:this.data['id']
    //         }
    //     }
    //     this.skillPartModal.show(part).then(()=>{
    //         this.onLoaded();
    //     });
    // }
    // private removePart(id:number){
    //     this.skillPartModal.api.remove(id).subscribe(()=>{
    //         this.onLoaded();
    //     })
    // }
}