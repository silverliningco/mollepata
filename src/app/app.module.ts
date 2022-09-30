import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { BasicEstructureModule } from './basic-estructure/basic-estructure.module';
import { PadreComponent } from './prueba/padre/padre.component';
import { HijoComponent } from './prueba/padre/hijo/hijo.component';


@NgModule({
  declarations: [
    AppComponent,
    PadreComponent,
    HijoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    BasicEstructureModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
