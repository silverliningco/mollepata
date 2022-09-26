import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RebateFinderRoutingModule } from "../rebate-finder/rebate-finder-routing.module";

import { HomeComponent } from './home/home.component';
import { RebateFinderComponent } from '../rebate-finder/rebate-finder/rebate-finder.component';


const routes: Routes = [{

      path: 'heated-cooled',
      component: RebateFinderComponent

}]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    RebateFinderRoutingModule
  ],
  exports: [RouterModule]
})
export class BasicEstructureRoutingModule { }
