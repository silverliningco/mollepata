import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// routing 
import { RebateFinderRoutingModule } from './rebate-finder-routing.module' 

// componets
import { Card2Component } from './card2/card2.component';
import { HeatedCooledComponent } from './heated-cooled/heated-cooled.component';
import { NominalSizeComponent } from './nominal-size/nominal-size.component';
import { RebateFinderComponent } from './rebate-finder/rebate-finder.component';
import { ResultsComponent} from './results/results.component';

// angular
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    ResultsComponent,
    HeatedCooledComponent,
    NominalSizeComponent,
    RebateFinderComponent,
    Card2Component
  ],
  imports: [
    CommonModule,
    RebateFinderRoutingModule,
    MatSelectModule
  ]
})
export class RebateFinderModule { }
