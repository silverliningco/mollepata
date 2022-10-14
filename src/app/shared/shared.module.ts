import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { TabComponent } from './tab/tab.component';


import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    SpinnerComponent,
    TabComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ], 
  exports:[
    SpinnerComponent,
  ]
})
export class SharedModule { }
