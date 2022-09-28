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
import { LocationComponent } from './location/location.component';
import { DwellingInfoComponent } from './dwelling-info/dwelling-info.component';
import { RebateEligibilityComponent } from './rebate-eligibility/rebate-eligibility.component';

// angular
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    ResultsComponent,
    HeatedCooledComponent,
    NominalSizeComponent,
    RebateFinderComponent,
    Card2Component,
    LocationComponent,
    DwellingInfoComponent,
    RebateEligibilityComponent
  ],
  imports: [
    CommonModule,
    RebateFinderRoutingModule,
    // angular material
    MatSelectModule,
    MatStepperModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule
  ]
})
export class RebateFinderModule { }
