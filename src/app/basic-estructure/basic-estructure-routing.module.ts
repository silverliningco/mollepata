import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BasicEstructureComponent } from './basic-estructure.component';
import { ReleasesComponent } from './releases/releases.component';
import { HVACSystemSearchComponent} from './../equipment-search/hvac-system-search/hvac-system-search.component';


const routes: Routes = [

  {
    path: '',
    component: BasicEstructureComponent,
    children: [
      {
        path: '',
        component: HVACSystemSearchComponent,

      },
      {
        path: 'releases',
        component: ReleasesComponent
      },
      {
        path: 'rebate-finder',
        component: HVACSystemSearchComponent
      },
      {
        path: '**',
        redirectTo: 'rebate-finder'
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
