import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentSearchRoutingModule } from "../equipment-search/equipment-search-routing.module";

import { HomeComponent } from './home/home.component';
import { RebateFinderComponent } from '../equipment-search/rebate-finder/rebate-finder.component';


const routes: Routes = [{

      path: 'heated-cooled',
      component: RebateFinderComponent

}]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    EquipmentSearchRoutingModule
  ],
  exports: [RouterModule]
})
export class BasicEstructureRoutingModule { }
