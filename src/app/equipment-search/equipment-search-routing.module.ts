import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// componets
import { RebateFinderComponent } from './rebate-finder/rebate-finder.component';

const routes: Routes = [{
  path: '',
  component: RebateFinderComponent
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentSearchRoutingModule { }
