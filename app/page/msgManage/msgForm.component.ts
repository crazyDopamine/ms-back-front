/**
 * Created by dongwei on 2016/11/18.
 */
import { Component,ViewChild } from '@angular/core';
import { ActivatedRoute,  } from '@angular/router';
import { Location } from '@angular/common';
import { FormComponent } from '../widget/form.component';
import { MsgApiService,DictionaryApiService,FileApiService } from '../../service/webApi.service';
import { Msg,Dictionary } from '../../model/models'
import { GlobalService } from '../../service/global.service';
import { SelectionsService } from '../../service/selections.service';
import { GlobalObserver } from '../../interface/globalObserver.interface'
import { FileUploader } from "ng2-file-upload";
@Component({
    selector: 'msg-form',
    templateUrl:'dist/page/msgManage/msgForm.component.html'
})
export class MsgFormComponent extends FormComponent<Msg> implements GlobalObserver{
    private types : Dictionary[] = new Array<Dictionary>();
    private editorOptions:Object={};
    private content:string = '';
    constructor(private global:GlobalService,protected api : MsgApiService,private route: ActivatedRoute,protected location:Location,
    private dictionaryApi:DictionaryApiService,private selections:SelectionsService){
        super(api,location);
        this.editorOptions = global.mix({},this.global.defaultEditorOptions,this.editorOptions);
    }
    public uploader:FileUploader = new FileUploader({
        url: "http://localhost:3000/file/editorUpload",
        method: "POST",
        itemAlias: "file"
    });
    ngOnInit(){
        this.data = {};
        this.global.register(this);
        this.global.mainNav.setCurrent('msgManage');
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
        this.selections.getSelections('1').then(datas=>{
            this.types = datas;
        });
    };
    submit(){
        super.submit();
    }
    upload(event:Object){
        console.log(event['target'].value);
        var self = this;
        this.uploader.queue[0].onSuccess = function (response, status, headers) {
            // 上传文件成功
            if (status == 200) {
                // 上传文件后获取服务器返回的数据
                let res = JSON.parse(response);
                console.log(res)
                self.data['photo'] = res.link;
            } else {
                // 上传文件后获取服务器返回的数据错误
                alert("");
            }
        };
        this.uploader.queue[0].upload(); // 开始上传
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