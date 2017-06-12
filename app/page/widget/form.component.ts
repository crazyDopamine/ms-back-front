import { CommonApiInterface } from '../../interface/commonApi.interface'
import { Location } from '@angular/common';

export class FormComponent<T> {
    public data={};
    public dataBackup={};
    constructor(protected api:CommonApiInterface<T>,protected  location:Location){
    }
    public submit(){
        // var params = this.api.tp(this.data);
        if(this.data['id']){
            this.api.update(this.data).subscribe(data=>{
                // this.setValues(data);
                this.location.back();
            });
        }else{
            this.api.insert(this.data).subscribe(data=>{
                // this.setValues(data);
                this.location.back();
            });
        }
    }
    public setValues(values:Object){
        this.data = values;
        // if(Object.assign)this.dataBackup = Object.assign({},values);
    }
    public getValues():Object{
        return this.data;
    }
    public reset(){
        if(this.dataBackup){
            this.data = this.dataBackup;
        }else {
            this.data = {};
        }
    }
}