import { BrowserModule,DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';


import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatIconRegistry,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatTableModule,
  MatCardModule,
  MatGridListModule,
  MatDividerModule,
  MatListModule,
  MatTreeModule,
  MatDialogModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSortModule,
  MatPaginatorModule,
  MatTooltipModule
} from '@angular/material';

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

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    DetailComponent,
    AppNavComponent,
    UpdateComponent,
    NewComponent,
    DialogConfirmComponent,
    UploadImageComponent
  ],
  entryComponents: [DialogConfirmComponent],
  imports: [
    BrowserModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatTableModule,
    AppRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule,
    LayoutModule,
    ReactiveFormsModule,
    MatTreeModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('/assets/mdi.svg'));
  }

}
