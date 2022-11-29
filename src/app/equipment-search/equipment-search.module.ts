// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// for credentials
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// services and modules
import { EquipmentSearchRoutingModule } from './equipment-search-routing.module';
import { SharedModule } from '../shared/shared.module';
import {HttpInterceptorService } from './services/http-interceptor.service'; 

// components
import { AhriMatchupsComponent } from './ahri-matchups/ahri-matchups.component';
import { RebateFinderComponent } from './rebate-finder/rebate-finder.component';
import { HvacSystemDetailComponent } from './hvac-system-detail/hvac-system-detail.component';
import { LocationComponent } from './hvac-inputs/location/location.component';
import { DwellingInfoComponent } from './hvac-inputs/dwelling-info/dwelling-info.component';
import { HeatedCooledComponent } from './hvac-inputs/heated-cooled/heated-cooled.component';
import { NominalSizeComponent } from './hvac-inputs/nominal-size/nominal-size.component';
import { FiltersComponent } from './hvac-inputs/filters/filters.component';
import { QuestionsRequirementComponent } from './hvac-inputs/questions-requirement/questions-requirement.component';
import { ProductLinesComponent } from './hvac-inputs/product-lines/product-lines.component';
import { StockStatusComponent } from './hvac-inputs/stock-status/stock-status.component';
import { SystemDesingComponent } from './hvac-inputs/system-desing/system-desing.component';
import { CardComponent } from './hvac-results/card/card.component';
import { TableComponent } from './hvac-results/table/table.component';
import { AppliedFiltersComponent } from './hvac-inputs/filters/applied-filters/applied-filters.component';

/* angular material */
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule } from '@angular/material/input';
import {FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SearchPipe } from './hvac-inputs/location/search.pipe';


@NgModule({
  declarations: [
    AhriMatchupsComponent,
    RebateFinderComponent,
    HvacSystemDetailComponent,
    LocationComponent,
    DwellingInfoComponent,
    HeatedCooledComponent,
    NominalSizeComponent,
    FiltersComponent,
    QuestionsRequirementComponent,
    ProductLinesComponent,
    StockStatusComponent,
    CardComponent,
    TableComponent,
    SystemDesingComponent,
    AppliedFiltersComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    EquipmentSearchRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,

    MatCardModule,
    MatIconModule,
    MatStepperModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatListModule,
    MatChipsModule,
    MatExpansionModule,
    MatDialogModule,
    MatTabsModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }

  ]
})
export class EquipmentSearchModule { }
