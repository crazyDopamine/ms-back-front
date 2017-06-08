/**
 * Created by dongwei on 2016/11/18.
 */
import { Component,ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';
@Component({
    selector: 'confirm',
    templateUrl:'app/page/widget/modals/confirm.component.html'
})
export class ConfirmComponent {
    title:string = '';
    content:string = '';
    @ViewChild('confirmModal')
    public confirmModal:ModalDirective;
    public promise = {};
    public show(title = '',content = ''):Promise<any>{
        this.title = title;
        this.content = content;
        this.confirmModal.show();
        return new Promise<any>((resolve, reject)=>{
            this.confirm=(result:number)=>{
                if(result){
                    resolve();
                }
                this.confirmModal.hide();
            }
        });
    }
    private confirm(result:number){}
}