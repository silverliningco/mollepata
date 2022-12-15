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

  // order results inside cards
  results: any;
  bestOption: any[] = [];

  // show all the options  
  myEligibilityRequirements: EligybilityRequirement[] = [];
  myEligibilityQuestions: EligibilityQuestions[] = [];

  // all the selections of user
  selectionRequirements: EligybilityRequirement[] = [];
  selectionQuestions: EligibilityQuestions[] = []; 

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
    //https://www.itsolutionstuff.com/post/angular-material-dynamic-checkbox-list-exampleexample.html
    //https://stackoverflow.com/questions/72047103/angular-12-formgroup-dynamically-array-checkboxes-custom-validator-does-not-work
    return this.eligibilityForm.get("eligibilityQuestions") as FormArray;
  }
  get eligibilityRequirementsFormArray() {
    return this.eligibilityForm.get("eligibilityRequirements") as FormArray;
  }
  private addInputs() {

    // when you have data accessible:
    this.myEligibilityQuestions.forEach(value => {
      this.eligibilityQuestionsFormArray.push(this.formBuilder.group({ 
        /*id: value.questionId,
        name: value.questionText,
        options: [value.options]*/
        question : value
      }))
    })

    this.myEligibilityRequirements.forEach(value => {
      this.eligibilityRequirementsFormArray.push(this.formBuilder.group({
        isActive: false,
        id:value.requirementId,
        name: value.requirementText
      }))
    })
console.log(this.eligibilityQuestionsFormArray);

   
  }

  ProcesEligibilityQuestions(questionId: number ){

    let optionQuestion = this.eligibilityForm.controls['eligibilityQuestionsControl'].value;

    let question:EligibilityQuestions = {
      questionId: questionId,
      options: optionQuestion
    }


    if (this.selectionQuestions.length >= 1 ){
      let index: number | null = this.SelectionUser(this.selectionRequirements, questionId);
      if (index == null){
        this.selectionQuestions.push(question);
      } else {
        this.selectionQuestions[index] = question;
      }
    } else {
      this.selectionQuestions.push(question);
    }

    console.log('.............................................');
    console.log(this.selectionQuestions.push);
    console.log('.............................................');
  }

  ProcesEligybilityRequirement(requirementId: number ){

    let optionRequirement = this.eligibilityForm.controls['eligibilityRequirements'].value;

    let Requiremen = {
      'requirementId': requirementId,
      'options': optionRequirement
    }

    if (this.selectionRequirements.length >= 1 ){
      let index: number | null = this.SelectionUser(this.selectionRequirements, requirementId);
      if (index == null){
        this.selectionRequirements.push(Requiremen);
      } else {
        this.selectionRequirements[index] = Requiremen;
      }
    } else {
      this.selectionRequirements.push(Requiremen);
    }    
  }

  SelectionUser(selections: any, currentSelectionID: any){

    let result: number | null = null;

    found: for (let i = 0; i < selections.length; i++) {
      let elementID = selections[i].requirementId;
      if (elementID == currentSelectionID){
        result = i;
        break found;
      }
    }

    return result;
  }



}
