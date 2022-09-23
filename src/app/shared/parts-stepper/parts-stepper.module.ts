import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateComponent } from './state/state.component';
import { UtilityProvidersComponent } from './utility-providers/utility-providers.component';
import { FossilFuelComponent } from './fossil-fuel/fossil-fuel.component';
import { EligibilityQuestionsComponent } from './eligibility-questions/eligibility-questions.component';



@NgModule({
  declarations: [
    StateComponent,
    UtilityProvidersComponent,
    FossilFuelComponent,
    EligibilityQuestionsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PartsStepperModule { }
