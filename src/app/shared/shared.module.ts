// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// components
import { SpinnerComponent } from './spinner/spinner.component';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

// angular material
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'; 


@NgModule({
  declarations: [
    SpinnerComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatInputModule,
    MatFormFieldModule
  ], 
  exports:[
    SpinnerComponent,
    SearchComponent
  ]
})
export class SharedModule { }
