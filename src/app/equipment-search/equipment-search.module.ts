import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// routes
import { EquipmentSearchRoutingModule } from './equipment-search-routing.module';

// componets
import { CardComponent } from './card/card.component';
import { HeatedCooledComponent } from './shared/heated-cooled/heated-cooled.component';
import { NominalSizeComponent } from './shared/nominal-size/nominal-size.component';
import { RebateFinderComponent } from './rebate-finder/rebate-finder.component';
import { RFResultsComponent} from './rf-results/rf-results.component';
import { DwellingInfoComponent } from './shared/dwelling-info/dwelling-info.component';
import { RebateEligibilityComponent } from './shared/rebate-eligibility/rebate-eligibility.component';

// angular
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import { LocationComponent } from './shared/location/location.component';

@NgModule({
  declarations: [
    RFResultsComponent,
    HeatedCooledComponent,
    NominalSizeComponent,
    RebateFinderComponent,
    CardComponent,
    DwellingInfoComponent,
    RebateEligibilityComponent,
    LocationComponent
  ],
  imports: [
    CommonModule,
    EquipmentSearchRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    HttpClientModule,
    // angular material
    MatSelectModule,
    MatStepperModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule
  ]
})
export class EquipmentSearchModule { }
