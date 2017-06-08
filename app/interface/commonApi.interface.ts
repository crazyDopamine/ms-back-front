import { URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { TableData } from '../service/table.service'

export interface CommonApiInterface<T> {
    list(params:Object):Observable<TableData<T>>;
    detail(id:number):Observable<T>;
    insert(params:Object):Observable<T>;
    update(params:Object):Observable<T>;
    remove(id:number):Observable<T>;
    tp(search:Object):URLSearchParams
}
