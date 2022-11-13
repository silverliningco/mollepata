import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    SpinnerComponent,
    SearchComponent
  ],
  imports: [
    CommonModule
  ], 
  exports:[
    SpinnerComponent,
  ]
})
export class SharedModule { }
