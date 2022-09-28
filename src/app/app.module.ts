import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { BasicEstructureModule } from './basic-estructure/basic-estructure.module';
import { EquipmentSearchModule } from './equipment-search/equipment-search.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    BasicEstructureModule,
    EquipmentSearchModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
