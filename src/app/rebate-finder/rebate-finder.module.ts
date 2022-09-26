import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RebateFinderComponent } from './rebate-finder/rebate-finder.component';
import { HeatingAndCoolingComponent } from './heating-and-cooling/heating-and-cooling.component';
import { ResultsRfComponent } from './results-rf/results.component';
import { RebateFinderRoutingModule } from './rebate-finder-routing.module';



@NgModule({
  declarations: [
    RebateFinderComponent,
    HeatingAndCoolingComponent,
    ResultsComponent
  ],
  imports: [
    CommonModule,
    RebateFinderRoutingModule
  ]
})
export class RebateFinderModule { }
