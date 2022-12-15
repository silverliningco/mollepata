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
      console.log('form value changed')
      console.log(selectedValue)
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
        id: value.questionId,
        answer : new FormControl(value.defaultValue, [Validators.required]),
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
