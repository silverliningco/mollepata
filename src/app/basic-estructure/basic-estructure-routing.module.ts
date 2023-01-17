import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
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
        component: HomeComponent,

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
