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
import { LocationComponent } from './location/location.component';
import { DwellingInfoComponent } from './dwelling-info/dwelling-info.component';
import { UtilityProvidersComponent } from './utility-providers/utility-providers.component';
import { HvacSystemDetailComponent } from './hvac-system-load/hvac-system-load.component';
import { ResultsComponent } from './results/results.component';
import { CardComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { HVACSystemSearchComponent } from './hvac-system-search/hvac-system-search.component';

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
import {MatAutocompleteModule} from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    LocationComponent,
    DwellingInfoComponent,
    UtilityProvidersComponent,
    HVACSystemSearchComponent,
    ResultsComponent,
    CardComponent,
    TableComponent,
    HvacSystemDetailComponent,
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
    MatSnackBarModule,
    MatAutocompleteModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }

  ]
})
export class EquipmentSearchModule { }
