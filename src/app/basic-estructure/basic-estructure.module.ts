import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicEstructureRoutingModule } from './basic-estructure-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ReleasesComponent } from './releases/releases.component';
 
/* angular material */
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ReleasesComponent
  ],
  imports: [
    CommonModule,
    BasicEstructureRoutingModule,

    MatCardModule,
    MatIconModule
  ], exports: [
    // RebateFinderModule
  ]
})
export class BasicEstructureModule { }
