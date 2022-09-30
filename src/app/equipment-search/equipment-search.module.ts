import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentSearchRoutingModule } from './equipment-search-routing.module';
import { AhriMatchupsComponent } from './ahri-matchups/ahri-matchups.component';
import { RebateFinderComponent } from './rebate-finder/rebate-finder.component';
import { HvacSystemDetailComponent } from './hvac-system-detail/hvac-system-detail.component';
import { LocationComponent } from './hvac-inputs/location/location.component';
import { DwellingInfoComponent } from './hvac-inputs/dwelling-info/dwelling-info.component';
import { HeatedCooledComponent } from './hvac-inputs/heated-cooled/heated-cooled.component';
import { RebateEligibilityComponent } from './hvac-inputs/rebate-eligibility/rebate-eligibility.component';
import { NominalSizeComponent } from './hvac-inputs/nominal-size/nominal-size.component';
import { FiltersComponent } from './hvac-inputs/filters/filters.component';
import { AvailableRebatesComponent } from './hvac-inputs/available-rebates/available-rebates.component';
import { ProductLinesComponent } from './hvac-inputs/product-lines/product-lines.component';
import { StockStatusComponent } from './hvac-inputs/stock-status/stock-status.component';
import { CardComponent } from './hvac-results/card/card.component';
import { TableComponent } from './hvac-results/table/table.component';


@NgModule({
  declarations: [
    AhriMatchupsComponent,
    RebateFinderComponent,
    HvacSystemDetailComponent,
    LocationComponent,
    DwellingInfoComponent,
    HeatedCooledComponent,
    RebateEligibilityComponent,
    NominalSizeComponent,
    FiltersComponent,
    AvailableRebatesComponent,
    ProductLinesComponent,
    StockStatusComponent,
    CardComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    EquipmentSearchRoutingModule
  ]
})
export class EquipmentSearchModule { }
