import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RebateFinderHomeComponent } from './rebate-finder-home/rebate-finder-home.component';
import { CoolingOnlyRfComponent } from './cooling-only-rf/cooling-only-rf.component';
import { HeatingAndCoolingRfComponent } from './heating-and-cooling-rf/heating-and-cooling-rf.component';
import { ResultsRfComponent } from './results-rf/results-rf.component';
import { RebateFinderRoutingModule } from './rebate-finder-routing-.module';



@NgModule({
  declarations: [
    RebateFinderHomeComponent,
    CoolingOnlyRfComponent,
    HeatingAndCoolingRfComponent,
    ResultsRfComponent
  ],
  imports: [
    CommonModule,
    RebateFinderRoutingModule
  ]
})
export class RebateFinderModule { }
