import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { bridgeService } from '../../services/bridge.service';

import { EligibilityQuestions, EligybilityRequirement } from '../../models/hvac-inputs';

@Component({
  selector: 'app-questions-requirement',
  templateUrl: './questions-requirement.component.html',
  styleUrls: ['./questions-requirement.component.css']
})
export class QuestionsRequirementComponent implements OnInit {

  eligibilityForm !: FormGroup;

  myEligibilityRequirements: EligybilityRequirement[] = [];
  myEligibilityQuestions: EligibilityQuestions[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public _bridge: bridgeService
  ) { }

  ngOnInit(): void {
    this._bridge.paramsQuestionsRequirements
    .subscribe((payload: any) =>{
      this.myEligibilityRequirements = payload.data['eligibilityRequirements'];
      this.myEligibilityQuestions =payload.data['eligibilityQuestions'];
      this.addInputs();
    })

    this.eligibilityForm = this.formBuilder.group({
      eligibilityQuestions: new FormArray([]),
      eligibilityRequirements: new FormArray([])
    });

    // Subscribe to ValueChanges by the top-level form
    this.eligibilityForm.valueChanges.subscribe(selectedValue => {
      // if user has changed the value of the form in the UI or when eligibility requirements completes to render.
      if (this.eligibilityForm.dirty || this.eligibilityRequirementsFormArray.length ==this.myEligibilityRequirements.length) {
        // Extract selected values from eligibility requirements checkbox.
        let myeligibilityRequirementsParam: Array<String> = [];
        selectedValue.eligibilityRequirements.forEach((element:any) => {
          if(element.requirement){
            myeligibilityRequirementsParam.push(element.id);
          }
        });
        
        /* sent the info to results-rebate */
        this._bridge.HVACInputs.emit({
          data: [{ eligibilityQuestions:selectedValue.eligibilityQuestions, eligibilityRequirements: myeligibilityRequirementsParam }, 'eligibilityCriteria']
        });

      }
    })
  }

  get eligibilityQuestionsFormArray() {
    return this.eligibilityForm.get("eligibilityQuestions") as FormArray;
  }

  get eligibilityRequirementsFormArray() {
    return this.eligibilityForm.get("eligibilityRequirements") as FormArray;
  }

  private addInputs() {

    // when you have data accessible:
    this.myEligibilityQuestions.forEach(value => {
      this.eligibilityQuestionsFormArray.push(this.formBuilder.group({ 
        questionId: value.questionId,
        selectedValue : new FormControl(value.defaultValue, [Validators.required]),
      }))
    })

    this.myEligibilityRequirements.forEach(value => {
      this.eligibilityRequirementsFormArray.push(this.formBuilder.group({
        id: value.requirementId,
        requirement : new FormControl(false, [Validators.required]),
      }))
    })
  }

}
