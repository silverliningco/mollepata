import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { TabComponent } from './tab/tab.component';
import { BttContinueComponent } from './btt-continue/btt-continue.component';


import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    SpinnerComponent,
    TabComponent,
    BttContinueComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ], 
  exports:[
    SpinnerComponent,
    BttContinueComponent
  ]
})
export class SharedModule { }
