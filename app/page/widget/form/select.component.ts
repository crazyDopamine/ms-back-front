/**
 * Created by dongwei on 2016/11/18.
 */
import { Component,Input,Output,OnChanges, SimpleChange,EventEmitter} from '@angular/core';
// import { TemplateRef, ViewContainerRef } from '@angular/core';
@Component({
    selector: 'STSelect',
    templateUrl:'app/page/widget/form/select.component.html'
})
export class STSelectComponent{
    @Input()
    public textField:string='name';
    @Input()
    public valueField:string='value';
    public _value:string='';
    private text:string='';
    @Input('value')
    set value(value:string){
        if(value&&value!=this._value&&this.valueText[value]){
            this._value = value;
            this.text = this.valueText[value];
        }
    }
    get value():string{
        return this._value;
    }
    @Output('value')
    public valueChange = new EventEmitter<string>();
    public items:Object[]=[];
    public valueText:Object={};
    public textValue:Object={};
    @Input('selections')
    set selections(selections:any){
        this.items = selections;
        for(let i in selections){
            this.valueText[selections[i][this.valueField]]=selections[i][this.textField];
            this.textValue[selections[i][this.textField]]=selections[i][this.valueField];
        }
        if(this.value&&this.valueText[this.value]){
            this.text = this.valueText[this.value];
        }
    }
    private show:boolean=false;

    itemClick(item:Object){
        this.value = item['value'];
        this.text = item['name'];
        this.show=false;
        this.valueChange.emit(this.value);
    }

    clear(){
        this.value = '';
        this.text = '';
        this.show=false;
        this.valueChange.emit(this.value);
    }
    ngOnInit(){

    }
}