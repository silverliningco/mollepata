import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BasicEstructureRoutingModule } from './basic-estructure/basic-estructure-routing.module';

import {PadreComponent} from './prueba/padre/padre.component';


const routes: Routes = [
 /*  {
    path: '',
    component: PadreComponent
  } */
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BasicEstructureRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
