import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'rebate-finder',
    loadChildren: () => import('./basic-estructure/basic-estructure.module').then(m => m.BasicEstructureModule)
  },
  {
    path: '**',
    redirectTo: 'rebate-finder'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
