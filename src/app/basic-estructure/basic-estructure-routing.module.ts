import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RebateFinderRoutingModule } from "../rebate-finder/rebate-finder-routing.module";

import { HomeComponent } from './home/home.component';
import { BasicEstructureComponent } from './basic-estructure.component';
import { ReleasesComponent } from './releases/releases.component';
import { RebateFinderComponent } from '../rebate-finder/rebate-finder/rebate-finder.component';


const routes: Routes = [

  {
    path: '',
    component: BasicEstructureComponent,
    children: [
      {
        path: '',
        component: HomeComponent,

      },
      {
        path: 'releases',
        component: ReleasesComponent
      },
      {
        path: 'rebate-finder',
        component: RebateFinderComponent
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  }

]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BasicEstructureRoutingModule { }
