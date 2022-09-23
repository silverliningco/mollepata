import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BasicEstructureRoutingModule } from './basic-estructure/basic-estructure-routing.module';


const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BasicEstructureRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
