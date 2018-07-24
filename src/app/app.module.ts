import { BrowserModule,DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { MatIconRegistry } from '@angular/material';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component'
import { DataService } from './services/data.service';
import { DetailComponent } from './employees/detail/detail.component';
import { AppRoutingModule } from './app-routing.module';
import { AppNavComponent } from './app-nav/app-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { UpdateComponent } from './employees/update/update.component'
import { ReactiveFormsModule } from '@angular/forms';
import { NewComponent } from './employees/new/new.component';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { FormsModule }   from '@angular/forms';
import { LoginComponent } from './login/login/login.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth/auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    DetailComponent,
    AppNavComponent,
    UpdateComponent,
    NewComponent,
    DialogConfirmComponent,
    UploadImageComponent,
    LoginComponent,
    
  ],
  entryComponents: [DialogConfirmComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    DataService, 
    AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
