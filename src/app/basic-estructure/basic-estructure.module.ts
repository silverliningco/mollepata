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
import { RebateFinderModule } from '../rebate-finder/rebate-finder.module';
import { BasicEstructureComponent } from './basic-estructure.component';



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
    RebateFinderModule,

    MatCardModule,
    MatIconModule
  ], exports: [
  ]
})
export class BasicEstructureModule { }
