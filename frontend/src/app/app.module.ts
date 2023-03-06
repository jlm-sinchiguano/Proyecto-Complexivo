import { NgModule } from '@angular/core';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {InputSwitchModule} from 'primeng/inputswitch';

//import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import {DropdownModule} from 'primeng/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateMaterialComponent } from './material/create-material/create-material.component';
import { EditMaterialComponent } from './material/edit-material/edit-material.component';
import { ListMaterialComponent } from './material/list-material/list-material.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CreateQuotationComponent } from './Quotation/create-quotation/create-quotation.component';
import { EditQuotationComponent } from './Quotation/edit-quotation/edit-quotation.component';
import { ListQuotationComponent } from './Quotation/list-quotation/list-quotation.component';
import { ListUnitComponent } from './UnitMeasure/list-unit/list-unit.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HandWorkComponent } from './hand-work/hand-work.component';
import { DetailQuotationComponent } from './detail-quotation/detail-quotation.component';
import { LoginComponent } from './login/login.component';
//import { ModalModule } from 'ngx-bootstrap/modal';




@NgModule({
  declarations: [
    AppComponent,
    CreateMaterialComponent,
    EditMaterialComponent,
    ListMaterialComponent,
    HeaderComponent,
    SideNavComponent,
    DashboardComponent,
    HomeComponent,
    CreateQuotationComponent,
    EditQuotationComponent,
    ListQuotationComponent,
    ListUnitComponent,
    HandWorkComponent,
    DetailQuotationComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    //MessagesModule,
    MessageModule,
    DropdownModule,
    FormsModule,
    MatDialogModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,

    InputSwitchModule,
    ButtonModule,
    InputTextModule,
    //ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
