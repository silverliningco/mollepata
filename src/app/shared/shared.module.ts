import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { CardsComponent } from './cards/cards.component';
import { CardComponent } from './cards/card/card.component';
import { ViewTableComponent } from './view-table/view-table.component';
import { SearchComponent } from './search/search.component';
import { ProductLinesComponent } from './product-lines/product-lines.component';
import { RebatesComponent } from './rebates/rebates.component';
import { FiltersComponent } from './filters/filters.component';
import { TabComponent } from './tab/tab.component';

import { PartsStepperModule } from './parts-stepper/parts-stepper.module';

@NgModule({
  declarations: [
    SpinnerComponent,
    CardsComponent,
    CardComponent,
    ViewTableComponent,
    SearchComponent,
    ProductLinesComponent,
    RebatesComponent,
    FiltersComponent,
    TabComponent
  ],
  imports: [
    CommonModule,
    PartsStepperModule
  ]
})
export class SharedModule { }
