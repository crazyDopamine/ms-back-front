import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
// import { NoopAnimationPlayer } from '@angular/animations';
import { MaterialModule } from '@angular/material';
import { FileUploadModule } from 'ng2-file-upload';

//component
import { AppComponent }  from './page/app.component';
import { HeaderComponent }  from './page/widget/header.component';
import { MainComponent }  from './page/main.component';
import { MainNavComponent }  from './page/widget/mainNav.component';
import { STSelectComponent }  from './page/widget/form/select.component';
import { PaginationComponent }  from './page/widget/pagination.component';
//modal
import { ConfirmComponent }  from './page/widget/modals/confirm.component';
import { LoginComponent } from './page/widget/modals/login.component';
// import { SkillPartComponent } from './page/widget/modals/skillPart.component';
//userManage
import { UserManageComponent }  from './page/userManage/userManage.component';
import { UserFormComponent }  from './page/userManage/userForm.component';
//msg
import { MsgManageComponent }  from './page/msgManage/msgManage.component';
import { MsgFormComponent }  from './page/msgManage/msgForm.component';

import { RouterModule, Routes } from '@angular/router';
import { Location } from '@angular/common';
//webapi
import { UserApiService,MsgApiService,DictionaryApiService,FileApiService} from './service/webApi.service';
//local service
import { GlobalService } from './service/global.service';
//service
import { HttpModule } from '@angular/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { LocalStorage } from './service/localStorage.service'
import { SelectionsService } from './service/selections.service'
//pipe
import {SelectionPipe} from './pipe/selection.pipe'

const appRoutes : Routes = [
    {path:'msgManage',component:MsgManageComponent},
    {path:'msgForm/:id',component:MsgFormComponent},
    {path:'msgForm',component:MsgFormComponent},
    {path:'userForm/:id',component:UserFormComponent},
    {path:'userForm',component:UserFormComponent},
    {path:'userManage',component:UserManageComponent},
    {path:'main',component:MsgManageComponent},
    {path:'',component:MsgManageComponent},
    {path:'**',component:MsgManageComponent}
];

@NgModule({
    imports:[BrowserModule,RouterModule.forRoot(appRoutes),HttpModule,FormsModule,FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
        MaterialModule,FileUploadModule],
    declarations:[AppComponent,HeaderComponent,MainComponent,MainNavComponent,MsgManageComponent,MsgFormComponent,UserFormComponent,
        UserManageComponent,ConfirmComponent,STSelectComponent,PaginationComponent,LoginComponent,SelectionPipe],
    providers:[GlobalService,UserApiService,MsgApiService,DictionaryApiService,Location,CookieService,LocalStorage,SelectionsService],
    bootstrap:[AppComponent]
})

export class AppModule {

}