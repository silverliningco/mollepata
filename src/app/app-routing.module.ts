import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintComponent } from './equipment-search/print/print.component';

const routes: Routes = [

  {
    path: 'rebate-finder',
    loadChildren: () => import('./basic-estructure/basic-estructure.module').then(m => m.BasicEstructureModule)
  },
  {
    path:'print',
    component: PrintComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
