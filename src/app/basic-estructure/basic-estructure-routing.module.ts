import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { RebateFinderRoutingModule } from '../rebate-finder/rebate-finder-routing-.module';

import { HomeComponent } from './home/home.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
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
