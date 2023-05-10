import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicEstructureRoutingModule } from './basic-estructure-routing.module';
import { EquipmentSearchModule } from './../equipment-search/equipment-search.module';

import { BasicEstructureComponent } from './basic-estructure.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ReleasesComponent } from './releases/releases.component';
 
/* angular material */
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ReleasesComponent,
    BasicEstructureComponent
  ],
  imports: [
    CommonModule,
    BasicEstructureRoutingModule,
    EquipmentSearchModule,

    MatCardModule,
    MatIconModule,
    FlexLayoutModule,
  ], exports: [
  ]
})
export class BasicEstructureModule { }
